/**
 * Wavlon Lasers — Catalog Download Modal
 * Self-contained: injects its own CSS + HTML into the DOM on first call.
 *
 * Usage on any page:
 *   <script src="/assets/catalog-modal.js"></script>
 *   <button onclick="openCatalogModal('PowerCut Series', '/catalogs/wavlon-powercut-series-catalog.pdf')">
 *     Download Catalog
 *   </button>
 *
 * openCatalogModal(catalogName, pdfPath)
 *   catalogName — written to Supabase `catalog_name` field, shown in modal heading
 *   pdfPath     — URL revealed only after successful lead submission
 */
(function () {
  'use strict';

  var _ready    = false;
  var _pdfPath  = '';
  var _catName  = '';

  /* ── CSS injected once ────────────────────────────────────────────── */
  var CSS = [
    '#wlCatOverlay{position:fixed;inset:0;background:rgba(10,20,36,.72);display:none;',
    'align-items:center;justify-content:center;z-index:99999;padding:20px;',
    'backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);}',

    '#wlCatPanel{background:#fff;border-radius:16px;width:100%;max-width:480px;',
    'box-shadow:0 24px 80px rgba(0,0,0,.35);overflow:hidden;position:relative;}',

    '#wlCatHeader{background:#0d1b2a;padding:28px 32px 24px;position:relative;}',
    '#wlCatHeader h2{font-family:Inter,system-ui,sans-serif;font-size:18px;',
    'font-weight:800;color:#fff;margin:0 36px 6px 0;letter-spacing:-.3px;}',
    '#wlCatHeader p{font-size:13px;color:#8899aa;margin:0;line-height:1.5;}',

    '#wlCatCloseBtn{position:absolute;top:16px;right:16px;background:rgba(255,255,255,.08);',
    'border:none;color:#8899aa;width:32px;height:32px;border-radius:8px;',
    'cursor:pointer;display:flex;align-items:center;justify-content:center;',
    'font-size:18px;line-height:1;transition:background .15s;}',
    '#wlCatCloseBtn:hover{background:rgba(255,255,255,.16);color:#fff;}',

    '#wlCatBody{padding:28px 32px 32px;}',

    '.wlcat-row{display:grid;grid-template-columns:1fr 1fr;gap:14px;}',
    '@media(max-width:480px){.wlcat-row{grid-template-columns:1fr;}}',

    '.wlcat-field{display:flex;flex-direction:column;gap:6px;margin-bottom:14px;}',
    '.wlcat-field label{font-family:Inter,system-ui,sans-serif;font-size:12px;',
    'font-weight:700;color:#1a1a2e;text-transform:uppercase;letter-spacing:.6px;}',
    '.wlcat-field input{font-family:Inter,system-ui,sans-serif;font-size:14px;',
    'color:#1a1a2e;background:#f8f9fa;border:1.5px solid #dee2e6;border-radius:8px;',
    'padding:10px 14px;transition:border-color .15s,box-shadow .15s;outline:none;',
    'width:100%;box-sizing:border-box;}',
    '.wlcat-field input:focus{border-color:#0066cc;',
    'box-shadow:0 0 0 3px rgba(0,102,204,.12);}',
    '.wlcat-field input::placeholder{color:#adb5bd;}',

    '#wlCatSubmitBtn{width:100%;padding:14px;background:#0066cc;color:#fff;',
    'border:none;border-radius:8px;font-family:Inter,system-ui,sans-serif;',
    'font-size:15px;font-weight:700;cursor:pointer;transition:background .15s;',
    'margin-top:6px;letter-spacing:-.1px;}',
    '#wlCatSubmitBtn:hover:not(:disabled){background:#0055b3;}',
    '#wlCatSubmitBtn:disabled{opacity:.65;cursor:not-allowed;}',

    '#wlCatError{display:none;margin-top:12px;padding:10px 14px;background:#fff0f0;',
    'border:1px solid #ffcccc;border-radius:8px;font-size:13px;color:#cc3333;',
    'font-family:Inter,system-ui,sans-serif;}',

    '#wlCatDisclaimer{margin-top:14px;font-size:11px;color:#adb5bd;',
    'font-family:Inter,system-ui,sans-serif;line-height:1.5;text-align:center;}',

    /* step 2 */
    '#wlCatStep2{display:none;padding:40px 32px;}',
    '#wlCatStep2 .wlcat-check{width:56px;height:56px;background:#e6f2ff;',
    'border-radius:50%;display:flex;align-items:center;justify-content:center;',
    'margin:0 auto 20px;}',
    '#wlCatStep2 h3{font-family:Inter,system-ui,sans-serif;font-size:20px;',
    'font-weight:800;color:#1a1a2e;text-align:center;margin:0 0 12px;',
    'letter-spacing:-.3px;}',
    '#wlCatStep2 p{font-size:14px;color:#495057;text-align:center;',
    'line-height:1.65;margin:0 0 28px;font-family:Inter,system-ui,sans-serif;}',
    '#wlCatDlBtn{display:flex;align-items:center;justify-content:center;gap:10px;',
    'width:100%;padding:14px;background:#0066cc;color:#fff;border-radius:8px;',
    'font-family:Inter,system-ui,sans-serif;font-size:15px;font-weight:700;',
    'text-decoration:none;transition:background .15s;box-sizing:border-box;}',
    '#wlCatDlBtn:hover{background:#0055b3;}',

    '#wlCatStep2 .wlcat-note{margin-top:14px;font-size:12px;color:#868e96;',
    'text-align:center;font-family:Inter,system-ui,sans-serif;}',
  ].join('');

  /* ── HTML template ─────────────────────────────────────────────────── */
  var HTML = [
    '<div id="wlCatOverlay" role="dialog" aria-modal="true" aria-labelledby="wlCatTitle">',
    '  <div id="wlCatPanel">',

    '    <div id="wlCatHeader">',
    '      <h2 id="wlCatTitle">Catalog Download</h2>',
    '      <p>Fill in your details and we\'ll unlock the full PDF instantly.</p>',
    '      <button id="wlCatCloseBtn" aria-label="Close">&#x2715;</button>',
    '    </div>',

    '    <!-- Step 1: lead form -->',
    '    <div id="wlCatStep1">',
    '      <div id="wlCatBody">',
    '        <form id="wlCatForm" novalidate>',
    '          <div class="wlcat-row">',
    '            <div class="wlcat-field">',
    '              <label for="wlFldFirst">First Name</label>',
    '              <input id="wlFldFirst" type="text" placeholder="Jane" required autocomplete="given-name"/>',
    '            </div>',
    '            <div class="wlcat-field">',
    '              <label for="wlFldLast">Last Name</label>',
    '              <input id="wlFldLast" type="text" placeholder="Smith" required autocomplete="family-name"/>',
    '            </div>',
    '          </div>',
    '          <div class="wlcat-field">',
    '            <label for="wlFldEmail">Company Email</label>',
    '            <input id="wlFldEmail" type="email" placeholder="jane@company.com" required autocomplete="email"/>',
    '          </div>',
    '          <div class="wlcat-field">',
    '            <label for="wlFldCompany">Company Name</label>',
    '            <input id="wlFldCompany" type="text" placeholder="Acme Manufacturing" required autocomplete="organization"/>',
    '          </div>',
    '          <button type="submit" id="wlCatSubmitBtn">Get Catalog &rarr;</button>',
    '          <div id="wlCatError"></div>',
    '          <p id="wlCatDisclaimer">No spam — ever. One catalog, one email. Unsubscribe anytime.</p>',
    '        </form>',
    '      </div>',
    '    </div>',

    '    <!-- Step 2: confirmation + download -->',
    '    <div id="wlCatStep2">',
    '      <div class="wlcat-check">',
    '        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0066cc" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
    '      </div>',
    '      <h3>Thanks for your interest in Wavlon Lasers!</h3>',
    '      <p>You\'ll receive the catalog at your email shortly. If you haven\'t received it within a few minutes, download it directly using the button below.</p>',
    '      <a id="wlCatDlBtn" href="#" download>',
    '        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
    '        Download Catalog PDF',
    '      </a>',
    '      <p class="wlcat-note">PDF opens in a new tab. Free to save and share with your team.</p>',
    '    </div>',

    '  </div>',
    '</div>',
  ].join('\n');

  /* ── Bootstrap DOM on first openCatalogModal call ─────────────────── */
  function bootstrap() {
    if (_ready) return;
    _ready = true;

    var styleEl = document.createElement('style');
    styleEl.id  = 'wlCatStyles';
    styleEl.textContent = CSS;
    document.head.appendChild(styleEl);

    var wrap = document.createElement('div');
    wrap.innerHTML = HTML;
    document.body.appendChild(wrap.firstElementChild);

    /* close on overlay click */
    document.getElementById('wlCatOverlay').addEventListener('click', function (e) {
      if (e.target === this) closeModal();
    });

    document.getElementById('wlCatCloseBtn').addEventListener('click', closeModal);
    document.getElementById('wlCatForm').addEventListener('submit', handleSubmit);

    /* close on Escape */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeModal();
    });
  }

  /* ── Public API ──────────────────────────────────────────────────────── */
  function openCatalogModal(catalogName, pdfPath) {
    bootstrap();

    _catName = catalogName  || 'Product';
    _pdfPath = pdfPath      || '#';

    /* reset to step 1 */
    var s1 = document.getElementById('wlCatStep1');
    var s2 = document.getElementById('wlCatStep2');
    s1.style.display = 'block';
    s2.style.display = 'none';

    document.getElementById('wlCatForm').reset();
    document.getElementById('wlCatError').style.display = 'none';

    var btn = document.getElementById('wlCatSubmitBtn');
    btn.textContent = 'Get Catalog →';
    btn.disabled    = false;

    document.getElementById('wlCatTitle').textContent = _catName + ' — Catalog Download';

    /* open overlay */
    var overlay = document.getElementById('wlCatOverlay');
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    /* focus first field after paint */
    setTimeout(function () {
      var f = document.getElementById('wlFldFirst');
      if (f) f.focus();
    }, 80);
  }

  function closeModal() {
    var overlay = document.getElementById('wlCatOverlay');
    if (overlay) {
      overlay.style.display = 'none';
      document.body.style.overflow = '';
    }
  }

  /* ── Form submission ─────────────────────────────────────────────────── */
  function handleSubmit(e) {
    e.preventDefault();

    var btn    = document.getElementById('wlCatSubmitBtn');
    var errEl  = document.getElementById('wlCatError');

    var first   = (document.getElementById('wlFldFirst').value   || '').trim();
    var last    = (document.getElementById('wlFldLast').value    || '').trim();
    var email   = (document.getElementById('wlFldEmail').value   || '').trim();
    var company = (document.getElementById('wlFldCompany').value || '').trim();

    /* client-side validation */
    if (!first || !last || !email || !company) {
      errEl.textContent    = 'Please fill in all fields.';
      errEl.style.display  = 'block';
      return;
    }

    var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email)) {
      errEl.textContent    = 'Please enter a valid email address.';
      errEl.style.display  = 'block';
      return;
    }

    btn.textContent = 'Submitting…';
    btn.disabled    = true;
    errEl.style.display = 'none';

    var payload = {
      first_name:    first,
      last_name:     last,
      company_email: email,
      company_name:  company,
      catalog_name:  _catName,
      page_url:      window.location.href,
    };

    fetch('/api/capture-lead', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(payload),
    })
      .then(function (r) {
        if (!r.ok) throw new Error('Server error ' + r.status);
        return r.json();
      })
      .then(function () {
        /* reveal step 2 with PDF link */
        document.getElementById('wlCatDlBtn').href = _pdfPath;
        document.getElementById('wlCatStep1').style.display = 'none';
        document.getElementById('wlCatStep2').style.display = 'block';
      })
      .catch(function () {
        btn.textContent     = 'Get Catalog →';
        btn.disabled        = false;
        errEl.textContent   = 'Something went wrong — please try again.';
        errEl.style.display = 'block';
      });
  }

  /* ── Expose globally ─────────────────────────────────────────────────── */
  window.openCatalogModal = openCatalogModal;
})();
