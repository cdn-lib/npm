// scanner.js
(async () => {
  const PROXIES = [
    'https://api.allorigins.win/raw?url=',
    'https://thingproxy.freeboard.io/fetch/',
    'https://r.jina.ai/http://'
  ];

  async function timeoutFetch(url, opts={}, ms=10000) {
    const controller = new AbortController();
    const id = setTimeout(()=>controller.abort(), ms);
    return fetch(url, {...opts, signal: controller.signal})
      .finally(()=>clearTimeout(id));
  }

  function extractHosts(text, domain) {
    const re = new RegExp(`[\\w.-]+\\.${domain.replace(/\./g,'\\.')}`, 'gi');
    return [...new Set((text.match(re)||[]).map(s=>s.toLowerCase()))];
  }

  async function getSubdomains(domain) {
    for (const proxy of PROXIES) {
      try {
        const url = `https://crt.sh/?q=%25.${domain}&output=json`;
        const full = proxy.includes('jina') ? proxy + url : proxy + encodeURIComponent(url);
        const res = await timeoutFetch(full, {}, 10000);
        const txt = await res.text();
        try {
          const j = JSON.parse(txt);
          return [...new Set(j.map(r => r.name_value).join('\n').split('\n').filter(s => s && !s.startsWith('*')))];
        } catch {
          return extractHosts(txt, domain);
        }
      } catch (e) {}
    }
    return [];
  }

  window.SubdomainScanner = async function(domain, keyword, logFn = console.log) {
    logFn(`Mengambil subdomain untuk ${domain}...`);
    const subs = await getSubdomains(domain);
    logFn(`Ditemukan ${subs.length} subdomain.`);
    let found = 0;
    for (const sub of subs) {
      logFn(`Cek: ${sub}`);
      for (const proxy of PROXIES) {
        try {
          const res = await timeoutFetch(proxy + encodeURIComponent(`https://${sub}`), {}, 8000);
          const text = await res.text();
          if (text.toLowerCase().includes(keyword.toLowerCase())) {
            logFn(`MATCH ${sub}`);
            found++;
          }
          break;
        } catch {}
      }
    }
    logFn(`Selesai. Ditemukan ${found} cocok.`);
  };
})();
