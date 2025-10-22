(function() { const script = document.currentScript; const attrTheme = script.getAttribute("data"); let theme = (attrTheme && attrTheme.trim().toLowerCase()) || "auto"; function detectTheme() { const html = document.documentElement.innerHTML; const isBootstrap = /class\s*=\s*["'][^"']*(btn|container|row|col|navbar|alert)[^"']*["']/.test(html); const isTailwind = /class\s*=\s*["'][^"']*(flex|grid|bg-|text-|rounded|p-|m-)[^"']*["']/.test(html); if (isBootstrap && !isTailwind) return "b"; if (isTailwind && !isBootstrap) return "t"; if (isBootstrap && isTailwind) return "b"; return "t"; } if (theme === "auto") theme = detectTheme(); const cssMap = { t: "https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css", b: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" }; const jsMap = { t: "", b: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" }; const link = document.createElement("link"); link.rel = "stylesheet"; link.href = cssMap[theme]; document.head.appendChild(link); if (jsMap[theme]) { const js = document.createElement("script"); js.src = jsMap[theme]; document.head.appendChild(js); } const customCSS = ` body { font-family: Poppins, sans-serif; transition: all 0.3s ease; } `; const style = document.createElement("style"); style.innerHTML = customCSS; document.head.appendChild(style); })();






// <footer class="footer"></footer> (TEMPEL CODE INI UNTUK MENAMPILKAN IKAN)
// dan 
// <script src="......." data="" defer></script> Jangan lupa kasih "defer" biar gak berat -_<
