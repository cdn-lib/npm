// subdoscanner.js
// Usage (from HTML):
// <script src=".../subdoscanner.js"></script>
// SubdomainScanner('example.com', 'optionalKeyword', msg => console.log(msg))
//   .then(res => console.log(res))

(function(global){
  const DEFAULT_PROXIES = [
    'https://api.allorigins.win/raw?url=',
    'https://thingproxy.freeboard.io/fetch/',
    'https://r.jina.ai/http://',
    'https://api.allorigins.cf/raw?url='
  ];

  // If you set global.SubdomainScannerProxies = [...], those will override defaults
  const PROXIES = Array.isArray(global.SubdomainScannerProxies) && global.SubdomainScannerProxies.length
    ? global.SubdomainScannerProxies.slice()
    : DEFAULT_PROXIES.slice();

  function now(){ return new Date().toLocaleTimeString(); }
  function safeLog(logFn, ...args){ if(typeof logFn === 'function') logFn(`[${now()}] ${args.join(' ')}`); }

  function delay(ms){ return new Promise(r=>setTimeout(r, ms)); }

  async function timeoutFetch(url, opts={}, ms=10000){
    const controller = new AbortController();
    const id = setTimeout(()=>controller.abort(), ms);
    try {
      const res = await fetch(url, {...opts, signal: controller.signal, redirect:'follow'});
      return res;
    } finally {
      clearTimeout(id);
    }
  }

  function extractHostsFromText(text, domain){
    const safeDomain = domain.replace(/\./g,'\\.');
    const re = new RegExp(`[\\w-]+(\\.[\\w-]+)*\\.${safeDomain}`, 'gi');
    const m = text.match(re) || [];
    return [...new Set(m.map(x=>x.toLowerCase()))];
  }

  // Try multiple public sources to get subdomains (bufferover, omnisint, crt.sh direct+proxy)
  async function getSubdomains(domain, logFn){
    const out = new Set();

    // 1) bufferover TLS
    try {
      const url = `https://tls.bufferover.run/dns?q=${encodeURIComponent(domain)}`;
      safeLog(logFn, 'try bufferover ->', url);
      const r = await timeoutFetch(url, {}, 7000).catch(e=>{ throw e; });
      if (r && r.ok) {
        const j = await r.json().catch(()=>null);
        if (j && j.FDNS_A) {
          j.FDNS_A.forEach(it => {
            const parts = it.split(',');
            const host = (parts[1] || parts[0] || '').trim();
            if (host && host.includes('.' + domain)) out.add(host.toLowerCase());
          });
        } else if (j && j.Results) {
          j.Results.forEach(h => { if(h && h.includes('.' + domain)) out.add(h.toLowerCase()); });
        }
      } else {
        safeLog(logFn, 'bufferover status', r ? r.status : 'no-resp');
      }
    } catch(e){
      safeLog(logFn, 'bufferover failed', e.message || e);
    }

    // 2) omnisint / sonar
    try {
      const url = `https://sonar.omnisint.io/subdomains/${encodeURIComponent(domain)}`;
      safeLog(logFn, 'try omnisint ->', url);
      const r = await timeoutFetch(url, {}, 6000);
      if (r && r.ok) {
        const j = await r.json().catch(()=>null);
        if (Array.isArray(j)) j.forEach(h => out.add(h.toLowerCase()));
      } else safeLog(logFn, 'omnisint status', r ? r.status : 'no-resp');
    } catch(e){
      safeLog(logFn, 'omnisint failed', e.message || e);
    }

    // 3) crt.sh direct (try parse JSON or extract from HTML)
    try {
      const crtUrl = `https://crt.sh/?q=%25.${encodeURIComponent(domain)}&output=json`;
      safeLog(logFn, 'try crt.sh direct ->', crtUrl);
      const r = await timeoutFetch(crtUrl, {}, 9000);
      if (r && r.ok) {
        const txt = await r.text().catch(()=>'');
        try {
          const j = JSON.parse(txt);
          if (Array.isArray(j)) {
            j.forEach(item => {
              if (item && item.name_value) {
                item.name_value.split('\n').forEach(h => {
                  if (h && !h.startsWith('*') && h.includes('.' + domain)) out.add(h.toLowerCase());
                });
              }
            });
          }
        } catch(_) {
          extractHostsFromText(txt, domain).forEach(h => out.add(h));
        }
      } else safeLog(logFn, 'crt.sh direct status', r ? r.status : 'no-resp');
    } catch(e){
      safeLog(logFn, 'crt.sh direct failed', e.message || e);
    }

    // 4) fallback: try proxies for crt.sh if still empty
    if (out.size === 0) {
      for (const proxy of PROXIES) {
        try {
          safeLog(logFn, 'try crt.sh via proxy ->', proxy);
          const useRaw = proxy.includes('jina.ai') || proxy.includes('r.jina.ai');
          const full = useRaw ? (proxy + `https://crt.sh/?q=%25.${domain}&output=json`) : (proxy + encodeURIComponent(`https://crt.sh/?q=%25.${domain}&output=json`));
          const r = await timeoutFetch(full, {}, 10000);
          if (!r || !r.ok) { safeLog(logFn, 'proxy crt.sh status', proxy, r ? r.status : 'no-resp'); continue; }
          const txt = await r.text().catch(()=>'');
          try {
            const j = JSON.parse(txt);
            if (Array.isArray(j)) {
              j.forEach(it => it.name_value && it.name_value.split('\n').forEach(h => { if(h && !h.startsWith('*') && h.includes('.' + domain)) out.add(h.toLowerCase()); }));
            }
          } catch(_) {
            extractHostsFromText(txt, domain).forEach(h => out.add(h));
          }
          if (out.size) break;
        } catch(e){
          safeLog(logFn, 'proxy crt.sh error', proxy, e.message || e);
        }
      }
    }

    // normalize & return
    const arr = Array.from(out).filter(s => s.includes('.' + domain)).sort();
    return arr;
  }

  // fetch content of a subdomain robustly (variants + proxies + retries), with simple false-positive guards
  async function fetchSubdomainForKeyword(subdomain, keyword, logFn, proxies, maxRetries=2){
    const variants = [
      `https://${subdomain}`,
      `http://${subdomain}`,
      `https://www.${subdomain.replace(/^www\./,'')}`
    ];

    const proxyNamesForGuard = proxies.join(' ').toLowerCase();

    for (const variant of variants){
      // try direct first
      try {
        safeLog(logFn, 'try direct fetch', variant);
        const r = await timeoutFetch(variant, {}, 7000).catch(()=>null);
        if (r && r.ok) {
          const txt = await r.text().catch(()=>'');
          if (txt && txt.toLowerCase().includes(keyword.toLowerCase())) {
            // guard: ensure page text doesn't look like a proxy error page
            if (!txt.toLowerCase().includes(proxyNamesForGuard.replace(/\./g,''))) {
              return { matched:true, url:variant, method:'direct', status:r.status, len: txt.length };
            }
          }
        }
      } catch(e){
        safeLog(logFn, 'direct fetch error', e.message || e);
      }

      // then proxies
      for (const proxy of proxies){
        try {
          const useRaw = proxy.includes('jina.ai') || proxy.includes('r.jina.ai');
          const full = useRaw ? (proxy + variant) : (proxy + encodeURIComponent(variant));
          safeLog(logFn, 'try proxy fetch', full);
          const r = await timeoutFetch(full, {}, 9000).catch(()=>null);
          if (r && r.ok) {
            const txt = await r.text().catch(()=>'');
            const len = txt ? txt.length : 0;
            safeLog(logFn, 'proxy resp', proxy, 'status', r.status, 'len', len);
            if (txt && txt.toLowerCase().includes(keyword.toLowerCase())) {
              const appearsProxy = proxyNamesForGuard.split(' ').some(pn => pn && txt.toLowerCase().includes(pn.replace(/\./g,'')));
              if (!appearsProxy && len > 160) {
                return { matched:true, url:variant, method:'proxy', proxy, status:r.status, len };
              }
            }
          }
        } catch(e){
          safeLog(logFn, 'proxy fetch error', proxy, e.message || e);
        }
      }
    }

    return { matched:false };
  }

  // Main function exported
  async function SubdomainScanner(domain, keyword, logFn){
    if (!domain || typeof domain !== 'string') throw new Error('Domain harus berupa string (contoh: example.com)');
    keyword = (keyword || '').toString();
    logFn = typeof logFn === 'function' ? logFn : (m => console.log(m));

    safeLog(logFn, `Mulai: ambil subdomain untuk ${domain} (keyword: ${keyword ? 'YES' : 'NO'})`);
    const subs = await getSubdomains(domain, logFn);
    safeLog(logFn, `Ditemukan ${subs.length} subdomain.`);

    const results = [];
    if (!keyword) {
      // return only subs
      safeLog(logFn, 'Selesai (mode finder).');
      return { subs, results };
    }

    // If keyword provided -> check contents with concurrency
    const concurrency = global.SubdomainScannerConcurrency || 6;
    let idx = 0;
    let checked = 0;
    let found = 0;

    async function worker(){
      while (idx < subs.length) {
        const i = idx++;
        const sub = subs[i];
        safeLog(logFn, `Cek: ${sub} (${i+1}/${subs.length})`);
        checked++;
        try {
          const r = await fetchSubdomainForKeyword(sub, keyword, logFn, PROXIES, 2);
          if (r.matched) {
            found++;
            safeLog(logFn, `MATCH: ${sub} (via ${r.method}${r.proxy? ' proxy='+r.proxy : ''} status:${r.status} len:${r.len})`);
          } else {
            safeLog(logFn, `NO MATCH: ${sub}`);
          }
          results.push(Object.assign({ sub }, r));
        } catch(e){
          safeLog(logFn, `ERROR checking ${sub}: ${e.message || e}`);
          results.push({ sub, matched:false, error: e.message || e });
        }
      }
    }

    const workers = Array.from({length: Math.max(1, concurrency)}, ()=>worker());
    await Promise.all(workers);

    safeLog(logFn, `Selesai. Diperiksa:${checked} Cocok:${found}`);
    return { subs, results };
  }

  // expose to global
  global.SubdomainScanner = SubdomainScanner;
  // expose helpers to override proxies / concurrency if desired
  global.SubdomainScannerSetProxies = function(arr){
    if (!Array.isArray(arr)) throw new Error('Proxies must be array');
    PROXIES.length = 0; PROXIES.push(...arr);
  };
  global.SubdomainScannerSetConcurrency = function(n){
    if (!Number.isInteger(n) || n < 1) throw new Error('concurrency must be integer >=1');
    global.SubdomainScannerConcurrency = n;
  };

})(window);
