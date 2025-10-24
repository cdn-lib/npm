async function startScan() {
      const domainInput = document.getElementById('domain');
      const domain = domainInput.value.trim();
      const log = document.getElementById('result');
      const scanButton = document.getElementById('scanButton');
      const btnText = document.getElementById('btn-text');
      const btnSpinner = document.getElementById('btn-spinner');

      log.textContent = '';
      if (!domain) {
        log.textContent = 'Masukkan domain dulu.';
        return;
      }

      scanButton.disabled = true;
      domainInput.disabled = true;
      btnText.textContent = 'Scanning...';
      btnSpinner.classList.remove('d-none');
      log.textContent = 'Mencari subdomain untuk: ' + domain + '\n\n';

      const sources = [
        `https://rapiddns.io/subdomain/${domain}?full=1`,
        `https://crt.sh/?q=%25.${domain}`,
        `https://jldc.me/anubis/subdomains/${domain}`,
        `https://api.hackertarget.com/hostsearch/?q=${domain}`,
        `https://otx.alienvault.com/api/v1/indicators/domain/${domain}/passive_dns`
      ];

      let allSubs = new Set();
      const domainRegex = new RegExp(`[a-zA-Z0-9.-]+\\.${domain.replace(/\./g, '\\.')}`, 'g');

      for (const url of sources) {
        try {
          const res = await fetch(url);
          if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
          const text = await res.text();
          const found = text.matchAll(domainRegex);
          for (const m of found) allSubs.add(m[0]);
        } catch (err) {
          //log.textContent += `Gagal mengambil data dari ${url}\n`;
        }
      }

      const list = Array.from(allSubs).sort();
      log.textContent += `Selesai! Total subdomain unik: ${list.length}\n\n`;
      log.textContent += list.join('\n');

      scanButton.disabled = false;
      domainInput.disabled = false;
      btnText.textContent = 'Mulai Scan';
      btnSpinner.classList.add('d-none');
}
