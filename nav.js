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

    /* ── Desktop dropdowns: pointer, keyboard, and touch ───────── */
    var megaTimers = {};
    var desktopDropdowns = document.querySelectorAll('.nav-item.has-mega, .nav-item.nav-supp-drop');

    function setDropdownOpen(navItem, open) {
      navItem.classList.toggle('open', open);
      var trigger = navItem.querySelector('.nav-link-btn');
      if (trigger) trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    function closeDesktopDropdowns(except) {
      desktopDropdowns.forEach(function (other) {
        if (other !== except) setDropdownOpen(other, false);
      });
    }

    desktopDropdowns.forEach(function (navItem) {
      var itemId = navItem.id || ('mega-' + Math.random().toString(36).slice(2));
      var btn = navItem.querySelector('.nav-link-btn');

      navItem.addEventListener('mouseenter', function () {
        clearTimeout(megaTimers[itemId]);
        closeDesktopDropdowns(navItem);
        setDropdownOpen(navItem, true);
      });

      navItem.addEventListener('mouseleave', function () {
        megaTimers[itemId] = setTimeout(function () {
          setDropdownOpen(navItem, false);
        }, 140);
      });

      navItem.addEventListener('focusout', function () {
        megaTimers[itemId] = setTimeout(function () {
          if (!navItem.contains(document.activeElement)) setDropdownOpen(navItem, false);
        }, 0);
      });

      if (btn) {
        btn.addEventListener('click', function (event) {
          event.stopPropagation();
          var willOpen = !navItem.classList.contains('open');
          closeDesktopDropdowns(navItem);
          setDropdownOpen(navItem, willOpen);
        });

        btn.addEventListener('keydown', function (event) {
          if (event.key === 'ArrowDown') {
            event.preventDefault();
            closeDesktopDropdowns(navItem);
            setDropdownOpen(navItem, true);
            var firstLink = navItem.querySelector('.mega-menu a, .supp-panel a');
            if (firstLink) firstLink.focus();
          }
        });
      }

      navItem.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
          event.preventDefault();
          setDropdownOpen(navItem, false);
          if (btn) btn.focus();
        }
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
      desktopDropdowns.forEach(function (navItem) {
        if (!navItem.contains(e.target)) {
          setDropdownOpen(navItem, false);
        }
      });
    });

    /* ── Mobile hamburger + drawer ────────────────────────────── */
    var hamburger = document.getElementById('hamburger');
    var mobileDrawer = document.getElementById('mobileDrawer');

    if (hamburger && mobileDrawer) {
      function setMobileMenuOpen(open, returnFocus) {
        mobileDrawer.classList.toggle('open', open);
        hamburger.classList.toggle('open', open);
        hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
        hamburger.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
        mobileDrawer.setAttribute('aria-hidden', open ? 'false' : 'true');
        document.body.style.overflow = open ? 'hidden' : '';
        if (!open) {
          document.querySelectorAll('.mobile-nav-btn').forEach(function (mobileBtn) {
            var mobileSub = mobileBtn.nextElementSibling;
            mobileBtn.setAttribute('aria-expanded', 'false');
            if (mobileSub) mobileSub.classList.remove('open');
            var indicator = mobileBtn.querySelector('span');
            if (indicator) indicator.textContent = '+';
          });
          if (returnFocus) hamburger.focus();
        }
      }

      hamburger.addEventListener('click', function () {
        setMobileMenuOpen(!mobileDrawer.classList.contains('open'), false);
      });

      mobileDrawer.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () { setMobileMenuOpen(false, false); });
      });

      document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && mobileDrawer.classList.contains('open')) {
          event.preventDefault();
          setMobileMenuOpen(false, true);
        }
      });

      window.addEventListener('resize', function () {
        if (window.innerWidth > 768 && mobileDrawer.classList.contains('open')) {
          setMobileMenuOpen(false, false);
        }
      }, { passive: true });
    }

    /* Mobile accordion sub-sections */
    document.querySelectorAll('.mobile-nav-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var sub = btn.nextElementSibling;
        if (sub && sub.classList.contains('mobile-sub')) {
          var willOpen = !sub.classList.contains('open');
          document.querySelectorAll('.mobile-nav-btn').forEach(function (otherBtn) {
            var otherSub = otherBtn.nextElementSibling;
            otherBtn.setAttribute('aria-expanded', 'false');
            if (otherSub) otherSub.classList.remove('open');
            var otherIndicator = otherBtn.querySelector('span');
            if (otherIndicator) otherIndicator.textContent = '+';
          });
          sub.classList.toggle('open', willOpen);
          btn.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
          var span = btn.querySelector('span');
          if (span) span.textContent = willOpen ? '−' : '+';
        }
      });
    });

    /* ── Sticky CTA bar ───────────────────────────────────────── */
    var stickyCta = document.getElementById('stickyCta');
    var stickyDismiss = document.getElementById('stickyDismissBtn');
    var ctaDismissed = false;
    var heroBottom = 0;

    if (stickyCta) {
      stickyCta.setAttribute('aria-hidden', 'true');
      /* Find where hero ends (if present) */
      var heroEl = document.querySelector('.machine-hero, .page-hero, .hero');
      function updateHeroBottom() {
        heroBottom = heroEl ? heroEl.getBoundingClientRect().bottom + window.scrollY : 300;
      }
      updateHeroBottom();
      window.addEventListener('resize', updateHeroBottom, { passive: true });

      function updateStickyCta() {
        if (ctaDismissed) return;
        var visible = window.scrollY > heroBottom;
        stickyCta.classList.toggle('visible', visible);
        stickyCta.setAttribute('aria-hidden', visible ? 'false' : 'true');
        document.body.classList.toggle('page-sticky-visible', visible);
      }

      window.addEventListener('scroll', updateStickyCta, { passive: true });
      updateStickyCta();

      if (stickyDismiss) {
        stickyDismiss.addEventListener('click', function () {
          ctaDismissed = true;
          stickyCta.classList.remove('visible');
          stickyCta.setAttribute('aria-hidden', 'true');
          document.body.classList.remove('page-sticky-visible');
        });
      }
    }

    /* Announce and focus successful form submissions. */
    document.querySelectorAll('.form-success').forEach(function (successMessage) {
      successMessage.setAttribute('role', 'status');
      successMessage.setAttribute('aria-live', 'polite');
      successMessage.setAttribute('tabindex', '-1');
      var wasVisible = false;
      function syncSuccessState() {
        var visible = window.getComputedStyle(successMessage).display !== 'none';
        if (visible && !wasVisible) successMessage.focus();
        wasVisible = visible;
      }
      new MutationObserver(syncSuccessState).observe(successMessage, { attributes: true, attributeFilter: ['class', 'style'] });
      syncSuccessState();
    });

    /* Accessible FAQ accordions. */
    document.querySelectorAll('.faq-q[aria-controls]').forEach(function (question) {
      var answer = document.getElementById(question.getAttribute('aria-controls'));
      if (!answer) return;
      question.addEventListener('click', function () {
        var open = question.getAttribute('aria-expanded') === 'true';
        question.setAttribute('aria-expanded', open ? 'false' : 'true');
        answer.hidden = open;
      });
    });

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
