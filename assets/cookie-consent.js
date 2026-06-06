/* Wavlon Lasers — Cookie Consent Banner
   PIPEDA-compliant. Pre-wired for Facebook Pixel + Google Analytics (inactive until IDs configured).
   Saves choice to localStorage under 'wavlon_cookie_consent'. */
(function () {
  'use strict';

  var KEY = 'wavlon_cookie_consent';

  // ── Activate tracking once consent is confirmed ───────────────────────
  function activateAnalytics() {
    // Google Analytics 4 — replace G-XXXXXXXXXX with your Measurement ID
    // (function(){ var s=document.createElement('script'); s.async=true;
    //   s.src='https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX';
    //   document.head.appendChild(s); })();
    // window.dataLayer = window.dataLayer || [];
    // function gtag(){dataLayer.push(arguments);} gtag('js',new Date()); gtag('config','G-XXXXXXXXXX');
  }

  function activateMarketing() {
    // Facebook Pixel — replace YOUR_PIXEL_ID with your Pixel ID
    // !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    //   n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
    //   n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
    //   t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
    //   document,'script','https://connect.facebook.net/en_US/fbevents.js');
    // fbq('init','YOUR_PIXEL_ID'); fbq('track','PageView');
  }

  // ── Check existing consent ────────────────────────────────────────────
  try {
    var existing = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (existing) {
      if (existing.analytics)  activateAnalytics();
      if (existing.marketing)  activateMarketing();
      return; // banner already answered — don't show again
    }
  } catch(e) {}

  // ── CSS ───────────────────────────────────────────────────────────────
  var style = document.createElement('style');
  style.textContent = `
    #wl-cookie-bar {
      position: fixed; bottom: 0; left: 0; right: 0; z-index: 10000;
      background: #0d1b2a; color: #c9d6e3;
      font-family: 'Inter', system-ui, sans-serif;
      padding: 16px 24px; display: flex;
      align-items: center; gap: 20px; flex-wrap: wrap;
      box-shadow: 0 -4px 24px rgba(0,0,0,.35);
      animation: wl-bar-in .3s ease;
    }
    @keyframes wl-bar-in {
      from { transform: translateY(100%); opacity: 0; }
      to   { transform: translateY(0);    opacity: 1; }
    }
    #wl-cookie-bar p {
      flex: 1; margin: 0; font-size: 13px; line-height: 1.55; min-width: 260px;
    }
    #wl-cookie-bar a { color: #5b9bd5; text-decoration: underline; }
    #wl-cookie-bar a:hover { color: #7fbff5; }
    .wl-cookie-btns { display: flex; gap: 10px; flex-shrink: 0; flex-wrap: wrap; }
    .wl-cookie-btn {
      padding: 9px 20px; border-radius: 7px; font-size: 13px;
      font-weight: 600; cursor: pointer; border: none; font-family: inherit;
      transition: opacity .15s; white-space: nowrap;
    }
    .wl-cookie-btn.accept { background: #0066cc; color: #fff; }
    .wl-cookie-btn.accept:hover { opacity: .88; }
    .wl-cookie-btn.essential { background: transparent; color: #8899aa; border: 1.5px solid #2a3f55; }
    .wl-cookie-btn.essential:hover { border-color: #5b9bd5; color: #c9d6e3; }
    @media(max-width: 640px) {
      #wl-cookie-bar { padding: 14px 16px; gap: 14px; }
      .wl-cookie-btns { width: 100%; }
      .wl-cookie-btn { flex: 1; text-align: center; padding: 10px 12px; }
    }
  `;
  document.head.appendChild(style);

  // ── Banner HTML ───────────────────────────────────────────────────────
  var bar = document.createElement('div');
  bar.id = 'wl-cookie-bar';
  bar.innerHTML = `
    <p>We use cookies to improve your experience, analyse site traffic, and for marketing. By clicking <strong>"Accept All"</strong>, you consent to our use of analytics and advertising cookies (including future Facebook Pixel and Google Analytics integration). See our <a href="/cookies/">Cookie Policy</a> and <a href="/privacy/">Privacy Policy</a>.</p>
    <div class="wl-cookie-btns">
      <button class="wl-cookie-btn essential" id="wl-cookie-ess">Essential Only</button>
      <button class="wl-cookie-btn accept"    id="wl-cookie-all">Accept All</button>
    </div>
  `;
  document.body.appendChild(bar);

  function saveAndClose(analytics, marketing) {
    try { localStorage.setItem(KEY, JSON.stringify({ analytics: analytics, marketing: marketing, ts: Date.now() })); } catch(e) {}
    if (analytics) activateAnalytics();
    if (marketing) activateMarketing();
    bar.style.animation = 'none';
    bar.style.transition = 'transform .25s ease, opacity .25s ease';
    bar.style.transform = 'translateY(100%)';
    bar.style.opacity = '0';
    setTimeout(function(){ if(bar.parentNode) bar.parentNode.removeChild(bar); }, 280);
  }

  document.getElementById('wl-cookie-all').addEventListener('click', function(){ saveAndClose(true, true); });
  document.getElementById('wl-cookie-ess').addEventListener('click', function(){ saveAndClose(false, false); });

})();
