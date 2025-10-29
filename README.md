<style>
  @import url('https://fonts.googleapis.com/css2?family=Kalam:wght@400;700&display=swap');

:root {
  --la-bg: #fefefe;
  --la-line: #222;
  --la-muted: #6c6c6c;
  --la-radius: 8px;
  --la-thick: 2px;
  --la-transition: all 0.2s ease-in-out;
  --la-font: 'Kalam', cursive;
}

body {
  background: var(--la-bg) !important;
  color: var(--la-line) !important;
  box-shadow: none !important;
  font-family: var(--la-font);
}

* {
  box-shadow: none !important;
}
hr {
  border-top: var(--la-thick) solid var(--la-line) !important;
}

h1, h2, h3, h4, h5, h6, .navbar-brand, .btn {
  font-weight: 700;
}

.btn, .form-control, .form-select, .navbar-brand, .nav-link, 
.card-title, .modal-title, .alert, .badge, .dropdown-item,
.accordion-button, .page-link {
   font-family: var(--la-font);
}

.navbar {
  background: var(--la-bg) !important;
  border-bottom: var(--la-thick) solid var(--la-line) !important;
}
.nav-link {
  color: var(--la-line) !important;
  border-radius: var(--la-radius);
  transition: var(--la-transition);
}
.nav-link:hover,
.nav-link:focus {
  background: rgba(0,0,0,.05);
}

.navbar-toggler {
  border: var(--la-thick) solid var(--la-line) !important;
  border-radius: var(--la-radius) 6px var(--la-radius) 8px !important;
}

.btn:active {
  transform: translateY(1px);
}
.btn:focus {
  box-shadow: 0 0 0 4px rgba(0,0,0,.15) !important;
}

.card-header,
.card-footer {
  border-bottom: var(--la-thick) solid var(--la-line) !important;
  background: var(--la-bg) !important;
}

.form-control:focus,
.form-select:focus {
  box-shadow: 0 0 0 4px rgba(0,0,0,.15) !important;
  outline: none !important;
}

.input-group-text {
  border: var(--la-thick) solid var(--la-line) !important;
  background: var(--la-bg) !important;
  border-radius: var(--la-radius) 6px var(--la-radius) 8px !important;
}

.table th,
.table td {
  border-bottom: var(--la-thick) solid var(--la-line) !important;
}
.table thead th {
  background: rgba(0,0,0,.05) !important;
}

.modal-header {
  border-bottom: var(--la-thick) solid var(--la-line) !important;
}

.dropdown-menu {
  border: var(--la-thick) solid var(--la-line) !important;
  background: var(--la-bg) !important;
  border-radius: var(--la-radius) 6px var(--la-radius) 8px !important;
}
.dropdown-item {
  color: var(--la-line) !important;
  border-radius: var(--la-radius) !important;
  transition: var(--la-transition);
}
.dropdown-item:hover {
  background: rgba(0,0,0,.05) !important;
}

.accordion-button {
  border-bottom: var(--la-thick) solid var(--la-line) !important;
  background: var(--la-bg) !important;
  color: var(--la-line) !important;
  transition: var(--la-transition);
}
.accordion-button:not(.collapsed) {
  background: rgba(0,0,0,.05) !important;
}
.accordion-button:focus {
  box-shadow: 0 0 0 4px rgba(0,0,0,.15) !important;
}

.badge {
  border: var(--la-thick) solid var(--la-line) !important;
  background: var(--la-bg) !important;
  color: var(--la-line) !important;
  border-radius: 999px !important;
}

.progress {
  border: var(--la-thick) solid var(--la-line) !important;
  border-radius: var(--la-radius) 6px var(--la-radius) 8px !important;
}
.progress-bar {
  background: var(--la-line) !important;
}

.page-link {
  border: var(--la-thick) solid var(--la-line) !important;
  color: var(--la-line) !important;
  transition: var(--la-transition);
}
.page-link:hover {
  background: rgba(0,0,0,.05);
}

.nav-pills .nav-link,
.nav-tabs .nav-link {
  border: var(--la-thick) solid var(--la-line) !important;
  background: var(--la-bg) !important;
  border-radius: var(--la-radius) 6px var(--la-radius) 8px !important;
}
.nav-pills .nav-link.active,
.nav-tabs .nav-link.active {
  background: rgba(0,0,0,.1) !important;
  border-width: var(--la-thick) !important;
}

.offcanvas {
  border-left: var(--la-thick) solid var(--la-line) !important;
  background: var(--la-bg) !important;
}

.form-check-input {
  border: var(--la-thick) solid var(--la-line) !important;
  background: var(--la-bg) !important;
}
.form-check-input:checked {
  background: var(--la-line) !important;
}

.card, .modal-content, .alert, .toast, .btn, .form-control, .form-select, 
.navbar-brand, .table, .list-group-item, .accordion-item {
  border: var(--la-thick) solid var(--la-line) !important;
  background: var(--la-bg) !important;
  color: var(--la-line) !important;
  position: relative;
  border-radius: var(--la-radius) 6px var(--la-radius) 8px !important;
  overflow: hidden;
}

.card::after, .modal-content::after, .alert::after, .toast::after, .btn::after, 
.form-control::after, .form-select::after, .navbar-brand::after, 
.table::after, .list-group-item::after, .accordion-item::after {
  content: '';
  position: absolute;
  display: block;
  width: 15px;
  height: var(--la-thick);
  background: var(--la-line);
  bottom: 5px;
  right: 5px;
  transform: rotate(-10deg);
}

.card::before, .modal-content::before, .alert::before, .toast::before, 
.btn::before, .navbar-brand::before, .table::before, .list-group-item::before,
.accordion-item::before {
  content: '';
  position: absolute;
  display: block;
  width: 10px;
  height: 1px;
  background: var(--la-muted);
  bottom: 8px;
  right: 10px;
  transform: rotate(-10deg);
}

.swal2-popup {
  font-family: var(--la-font);
  background: var(--la-bg) !important;
  border: var(--la-thick) solid var(--la-line) !important;
  border-radius: var(--la-radius) 6px var(--la-radius) 8px !important;
  color: var(--la-line) !important;
  position: relative;
  overflow: hidden;
}

.swal2-popup::after {
  content: '';
  position: absolute;
  display: block;
  width: 25px;
  height: var(--la-thick);
  background: var(--la-line);
  bottom: 6px;
  right: 10px;
  transform: rotate(-10deg);
}
.swal2-popup::before {
  content: '';
  position: absolute;
  display: block;
  width: 15px;
  height: 1px;
  background: var(--la-muted);
  bottom: 9px;
  right: 15px;
  transform: rotate(-10deg);
}

.swal2-title {
  color: var(--la-line) !important;
  font-weight: 700;
}
.swal2-html-container {
  color: var(--la-muted) !important;
}
.swal2-header {
  border-bottom: var(--la-thick) solid var(--la-line) !important;
}
.swal2-actions {
  border-top: var(--la-thick) solid var(--la-line) !important;
}
.swal2-confirm,
.swal2-cancel,
.swal2-deny {
  font-family: var(--la-font) !important;
  font-weight: 700 !important;
  border: var(--la-thick) solid var(--la-line) !important;
  border-radius: var(--la-radius) 6px var(--la-radius) 8px !important;
  background: var(--la-bg) !important;
  color: var(--la-line) !important;
  transition: var(--la-transition);
  position: relative;
  overflow: hidden;
}

.swal2-confirm::after, .swal2-cancel::after, .swal2-deny::after {
  content: '';
  position: absolute;
  display: block;
  width: 15px;
  height: var(--la-thick);
  background: var(--la-line);
  bottom: 5px;
  right: 5px;
  transform: rotate(-10deg);
}

.swal2-confirm:hover,
.swal2-cancel:hover,
.swal2-deny:hover {
  background: rgba(0,0,0,.08) !important;
}
.swal2-input,
.swal2-file,
.swal2-textarea {
  font-family: var(--la-font) !important;
  border: var(--la-thick) solid var(--la-line) !important;
  border-radius: var(--la-radius) 6px var(--la-radius) 8px !important;
  background: var(--la-bg) !important;
  color: var(--la-line) !important;
  position: relative;
  overflow: hidden;
}
.swal2-input:focus,
.swal2-file:focus,
.swal2-textarea:focus {
  box-shadow: 0 0 0 4px rgba(0,0,0,.15) !important;
  outline: none !important;
}
</style>

<h3><strong>
CDN-LIB/NPM 
<hr>
Sebuah theme plugn'play siap pakai dengan plugin yang orang sering pakai, seperti bootstap & tainwild

</strong></h3>


## []=========[] PLUGIN []=========[]
```html

•  font-awesome
•  bootstrap
•  tailwind
•  sweetalert2
• IKAN / JL'FISH FLAY FOOTHER
```

NOTE !!!

## PASTE CODE DI BAWAH SEBELUM 
```html 
</body>
```
<hr>
## CODE

```html 
<ikan class="ikan"></ikan>
```

(TEMPEL CODE INI UNTUK MENAMPILKAN IKAN TERBANG) -_<


## =================================== ##

• Lineart Theme
```
<script src="https://cdn.jsdelivr.net/gh/cdn-lib/npm@3.0/theme/lineart.js" data="b"></script>
```
• Bootstap Theme
```
<script src="https://cdn.jsdelivr.net/gh/cdn-lib/npm@3.0/theme.js" data="bootstap"></script>
```
• Tainwild Theme
```
<script src="https://cdn.jsdelivr.net/gh/cdn-lib/npm@3.0/theme.js" data="tainwild"></script>
```
( Letakan sebelum <body> atau sebelum </body> )




## NOTE !!!!!

MAU BANTU MENGEMBANGKAN PROJEK INI ?

CONTACTS !!!

OWNER WHATSAPP : <a class="btn" href="//wa.me/6285135311112"> 6285135311112/ YUMEIRO</a><br>

GMAIL : <a class="btn" href="mailto:kagurairyosuke@gmail.com">kagurairyosuke@gmail.com</a> <br>
        <a class="btn" href="mailto:yumeiro@mirai.re">yumeiro@mirai.re</a><br>
        <a class="btn" href="mailto:yumeiro.dev@via.tokyo.jp">yumeiro.dev@via.tokyo.jp</a><br>
        <a class="btn" href="mailto:yumeiroryosuke@svk.jp">yumeiroryosuke@svk.jp</a><br>
        
GITHUB : https://github.com/cdn-lib/
