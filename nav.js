/* ═══════════════════════════════════════════════════════════════
   WAVLON LASERS — Navigation JS
   Shared across all pages. Handles:
     • Mega menu open/close with hover delay
     • Category panel switching in mega menu
     • Mobile drawer toggle
     • Scroll: sticky shadow + sticky CTA bar visibility
     • Active nav item highlighting based on current URL
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {

    /* ── Scroll: nav shadow ───────────────────────────────────── */
    var headerNav = document.getElementById('headerNav');
    if (headerNav) {
      window.addEventListener('scroll', function () {
        headerNav.classList.toggle('scrolled', window.scrollY > 10);
      }, { passive: true });
    }

    /* ── Mega menu (desktop) ──────────────────────────────────── */
    var navProducts = document.getElementById('navProducts');
    var productsBtn = document.getElementById('productsBtn');
    var megaTimer;

    if (navProducts) {
      navProducts.addEventListener('mouseenter', function () {
        clearTimeout(megaTimer);
        navProducts.classList.add('open');
        if (productsBtn) productsBtn.setAttribute('aria-expanded', 'true');
      });
      navProducts.addEventListener('mouseleave', function () {
        megaTimer = setTimeout(function () {
          navProducts.classList.remove('open');
          if (productsBtn) productsBtn.setAttribute('aria-expanded', 'false');
        }, 140);
      });

      /* Category panel switching */
      document.querySelectorAll('.mega-cat-btn').forEach(function (btn) {
        btn.addEventListener('mouseenter', function () {
          document.querySelectorAll('.mega-cat-btn').forEach(function (b) {
            b.classList.remove('active');
          });
          document.querySelectorAll('.mega-panel').forEach(function (p) {
            p.classList.remove('active');
          });
          btn.classList.add('active');
          var panel = document.getElementById('panel-' + btn.dataset.panel);
          if (panel) panel.classList.add('active');
        });
      });

      /* Close mega menu when clicking outside */
      document.addEventListener('click', function (e) {
        if (!navProducts.contains(e.target)) {
          navProducts.classList.remove('open');
          if (productsBtn) productsBtn.setAttribute('aria-expanded', 'false');
        }
      });
    }

    /* ── Mobile hamburger + drawer ────────────────────────────── */
    var hamburger = document.getElementById('hamburger');
    var mobileDrawer = document.getElementById('mobileDrawer');

    if (hamburger && mobileDrawer) {
      hamburger.addEventListener('click', function () {
        var open = mobileDrawer.classList.toggle('open');
        hamburger.classList.toggle('open', open);
        document.body.style.overflow = open ? 'hidden' : '';
      });
    }

    /* Mobile accordion sub-sections */
    document.querySelectorAll('.mobile-nav-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var sub = btn.nextElementSibling;
        if (sub && sub.classList.contains('mobile-sub')) {
          sub.classList.toggle('open');
          var span = btn.querySelector('span');
          if (span) span.textContent = sub.classList.contains('open') ? '−' : '+';
        }
      });
    });

    /* ── Sticky CTA bar ───────────────────────────────────────── */
    var stickyCta = document.getElementById('stickyCta');
    var stickyDismiss = document.getElementById('stickyDismissBtn');
    var ctaDismissed = false;
    var heroBottom = 0;

    if (stickyCta) {
      /* Find where hero ends (if present) */
      var heroEl = document.querySelector('.machine-hero, .page-hero, .hero');
      function updateHeroBottom() {
        heroBottom = heroEl ? heroEl.getBoundingClientRect().bottom + window.scrollY : 300;
      }
      updateHeroBottom();
      window.addEventListener('resize', updateHeroBottom, { passive: true });

      window.addEventListener('scroll', function () {
        if (ctaDismissed) return;
        stickyCta.classList.toggle('visible', window.scrollY > heroBottom);
      }, { passive: true });

      if (stickyDismiss) {
        stickyDismiss.addEventListener('click', function () {
          ctaDismissed = true;
          stickyCta.classList.remove('visible');
        });
      }
    }

    /* ── Active nav highlight ─────────────────────────────────── */
    var path = window.location.pathname.replace(/\/$/, '') || '/';
    document.querySelectorAll('.nav-link[href], .nav-list a[href]').forEach(function (a) {
      var href = a.getAttribute('href').replace(/\/$/, '') || '/';
      if (href === path || (href !== '/' && path.startsWith(href))) {
        a.classList.add('active');
        var li = a.closest('.nav-item');
        if (li) li.classList.add('active');
      }
    });

  });
}());
