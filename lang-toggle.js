(function() {
  var STORAGE_KEY = 'letabuild-lang';

  function getLang() {
    return localStorage.getItem(STORAGE_KEY) || 'pt';
  }

  function setLang(lang) {
    localStorage.setItem(STORAGE_KEY, lang);
    applyLang(lang);
    window.dispatchEvent(new CustomEvent('langchange', { detail: { lang: lang } }));
  }

  function applyLang(lang) {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
    var els = document.querySelectorAll('[data-pt][data-en]');
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      var text = el.getAttribute('data-' + lang);
      if (text !== null) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = text;
        } else {
          el.innerHTML = text;
        }
      }
    }
    // Update select value
    var sel = document.getElementById('langToggle');
    if (sel && sel.tagName === 'SELECT') {
      sel.value = lang;
    }
  }

  function upgradeToggle() {
    var btn = document.getElementById('langToggle');
    if (!btn) return;

    // If already a select, just bind
    if (btn.tagName === 'SELECT') {
      btn.value = getLang();
      btn.addEventListener('change', function() { setLang(this.value); });
      return;
    }

    // Replace button with select
    var sel = document.createElement('select');
    sel.id = 'langToggle';
    sel.title = 'Language';
    sel.style.cssText = 'background:#1E293B;color:#E2E8F0;border:1px solid rgba(224,138,58,0.15);' +
      'border-radius:8px;padding:4px 8px;font-size:14px;cursor:pointer;outline:none;' +
      'appearance:none;-webkit-appearance:none;-moz-appearance:none;' +
      'background-image:url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'10\' height=\'6\'%3E%3Cpath d=\'M0 0l5 6 5-6z\' fill=\'%2394A3B8\'/%3E%3C/svg%3E");' +
      'background-repeat:no-repeat;background-position:right 8px center;padding-right:24px;';

    var optPt = document.createElement('option');
    optPt.value = 'pt';
    optPt.textContent = '\uD83C\uDDE7\uD83C\uDDF7 PT';

    var optEn = document.createElement('option');
    optEn.value = 'en';
    optEn.textContent = '\uD83C\uDDFA\uD83C\uDDF8 EN';

    sel.appendChild(optPt);
    sel.appendChild(optEn);
    sel.value = getLang();

    sel.addEventListener('change', function() { setLang(this.value); });

    btn.parentNode.replaceChild(sel, btn);
  }

  document.addEventListener('DOMContentLoaded', function() {
    upgradeToggle();
    applyLang(getLang());
  });

  var currentLang = getLang();
  document.documentElement.lang = currentLang === 'pt' ? 'pt-BR' : 'en';

  window.letabuildLang = {
    get: getLang,
    set: setLang,
    apply: applyLang
  };
})();
