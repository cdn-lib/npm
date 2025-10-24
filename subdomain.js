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
        `https://api.allorigins.win/raw?url=https://rapiddns.io/subdomain/${domain}?full=1`,
        `https://api.allorigins.win/raw?url=https://crt.sh/?q=%25.${domain}`,
        `https://api.allorigins.win/raw?url=https://jldc.me/anubis/subdomains/${domain}`,
        `https://api.allorigins.win/raw?url=https://api.hackertarget.com/hostsearch/?q=${domain}`,
        `https://api.allorigins.win/raw?url=https://otx.alienvault.com/api/v1/indicators/domain/${domain}/passive_dns`
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
// === Loading Yumeiro ===
(function () {
  const style = document.createElement("style");
  style.textContent = `
  body {
      background-color: var(--bs-dark-bg-subtle);
    }
    #log {
      max-height: 400px;
      overflow-y: auto;
      background-color: var(--bs-tertiary-bg);
      border-radius: var(--bs-border-radius);
      padding: 1rem;
      white-space: pre-wrap;
      word-wrap: break-word;
    }
  .loading-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #131313;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    transition: transform 0.8s ease, opacity 0.8s ease;
  }

  .loading-screen.hide {
    transform: translateX(100%);
    opacity: 1;
  }

  .flipping {
    height: 22.4px;
    display: grid;
    grid-template-columns: repeat(5, 22.4px);
    grid-gap: 5.6px;
  }

  .flipping div {
    animation: flipping-owie1ymd 1.25s calc(var(--delay) * 1s) infinite ease;
    background-color: #474bff;
  }

  .flipping div:nth-of-type(1) { --delay: 0.25; }
  .flipping div:nth-of-type(2) { --delay: 0.5; }
  .flipping div:nth-of-type(3) { --delay: 0.75; }
  .flipping div:nth-of-type(4) { --delay: 1; }
  .flipping div:nth-of-type(5) { --delay: 1.25; }

  @keyframes flipping-owie1ymd {
    0% { transform: perspective(44.8px) rotateY(-180deg); }
    50% { transform: perspective(44.8px) rotateY(0deg); }
    100% { transform: perspective(44.8px) rotateY(180deg); }
  }`;

  const html = `
  <div class="loading-screen">
    <div class="flipping">
      <div></div><div></div><div></div><div></div><div></div>
    </div>
  </div>`;

  document.head.appendChild(style);
  document.body.insertAdjacentHTML("afterbegin", html);

  window.addEventListener("load", () => {
    setTimeout(() => {
      const loader = document.querySelector(".loading-screen");
      if (loader) {
        loader.classList.add("hide");
        setTimeout(() => loader.remove(), 800);
      }
    }, 3000);
  });
})();

