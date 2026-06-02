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

    /* ── Mega menus (desktop) — handles ALL .has-mega nav items ─ */
    var megaTimers = {};
    document.querySelectorAll('.nav-item.has-mega').forEach(function (navItem) {
      var itemId = navItem.id || ('mega-' + Math.random().toString(36).slice(2));
      var btn = navItem.querySelector('.nav-link-btn');

      navItem.addEventListener('mouseenter', function () {
        clearTimeout(megaTimers[itemId]);
        /* Close all other open menus */
        document.querySelectorAll('.nav-item.has-mega').forEach(function (other) {
          if (other !== navItem) {
            other.classList.remove('open');
            var ob = other.querySelector('.nav-link-btn');
            if (ob) ob.setAttribute('aria-expanded', 'false');
          }
        });
        navItem.classList.add('open');
        if (btn) btn.setAttribute('aria-expanded', 'true');
      });

      navItem.addEventListener('mouseleave', function () {
        megaTimers[itemId] = setTimeout(function () {
          navItem.classList.remove('open');
          if (btn) btn.setAttribute('aria-expanded', 'false');
        }, 140);
      });
    });

    /* Category panel switching — scoped to parent mega-menu */
    document.querySelectorAll('.mega-cat-btn').forEach(function (btn) {
      btn.addEventListener('mouseenter', function () {
        var megaMenu = btn.closest('.mega-menu');
        if (!megaMenu) return;
        megaMenu.querySelectorAll('.mega-cat-btn').forEach(function (b) { b.classList.remove('active'); });
        megaMenu.querySelectorAll('.mega-panel').forEach(function (p) { p.classList.remove('active'); });
        btn.classList.add('active');
        var panel = megaMenu.querySelector('#panel-' + btn.dataset.panel);
        if (panel) panel.classList.add('active');
      });
    });

    /* Close all mega menus when clicking outside */
    document.addEventListener('click', function (e) {
      document.querySelectorAll('.nav-item.has-mega').forEach(function (navItem) {
        if (!navItem.contains(e.target)) {
          navItem.classList.remove('open');
          var b = navItem.querySelector('.nav-link-btn');
          if (b) b.setAttribute('aria-expanded', 'false');
        }
      });
    });

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
