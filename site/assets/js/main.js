(function () {
  'use strict';

  var root = document.documentElement;
  var header = document.getElementById('site-header');
  var menuButton = document.getElementById('menu-button');
  var nav = document.getElementById('site-nav');
  var main = document.getElementById('main');
  var footer = document.querySelector('.site-footer');
  var mobile = window.matchMedia('(max-width: 900px)');
  var lastFocused = null;

  root.classList.add('nav-ready');

  function setPageInert(value) {
    [main, footer].forEach(function (element) {
      if (!element) return;
      if (value) {
        element.setAttribute('inert', '');
        element.setAttribute('aria-hidden', 'true');
      } else {
        element.removeAttribute('inert');
        element.removeAttribute('aria-hidden');
      }
    });
  }

  function openMenu() {
    if (!header || !menuButton || !nav || !mobile.matches) return;
    lastFocused = document.activeElement;
    header.classList.add('menu-open');
    document.body.classList.add('menu-locked');
    menuButton.setAttribute('aria-expanded', 'true');
    menuButton.setAttribute('aria-label', '메뉴 닫기');
    setPageInert(true);

    var firstLink = nav.querySelector('a');
    if (firstLink) window.setTimeout(function () { firstLink.focus(); }, 0);
  }

  function closeMenu(options) {
    if (!header || !menuButton) return;
    var restoreFocus = !options || options.restoreFocus !== false;
    header.classList.remove('menu-open');
    document.body.classList.remove('menu-locked');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', '메뉴 열기');
    setPageInert(false);

    if (restoreFocus && lastFocused && typeof lastFocused.focus === 'function') {
      lastFocused.focus();
    }
    lastFocused = null;
  }

  function menuIsOpen() {
    return Boolean(header && header.classList.contains('menu-open'));
  }

  if (header && menuButton && nav) {
    menuButton.addEventListener('click', function () {
      if (menuIsOpen()) closeMenu();
      else openMenu();
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        closeMenu({ restoreFocus: false });
      });
    });

    document.addEventListener('keydown', function (event) {
      if (!menuIsOpen()) return;

      if (event.key === 'Escape') {
        event.preventDefault();
        closeMenu();
        return;
      }

      if (event.key !== 'Tab') return;
      var focusable = [menuButton].concat(Array.from(nav.querySelectorAll('a')));
      var first = focusable[0];
      var last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });

    mobile.addEventListener('change', function (event) {
      if (!event.matches) closeMenu({ restoreFocus: false });
    });
  }

  function updateHeader() {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 24);
  }

  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var revealItems = Array.from(document.querySelectorAll('.reveal'));

  if (!reduceMotion && 'IntersectionObserver' in window && revealItems.length) {
    revealItems.forEach(function (element) {
      if (element.getBoundingClientRect().top < window.innerHeight * 0.9) {
        element.classList.add('is-visible');
      }
    });
    root.classList.add('reveal-ready');

    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

    revealItems.forEach(function (element) {
      if (!element.classList.contains('is-visible')) revealObserver.observe(element);
    });
  }

  var navLinks = Array.from(document.querySelectorAll('.site-nav a[href^="#"]'));
  var sections = navLinks.map(function (link) {
    return document.querySelector(link.getAttribute('href'));
  }).filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (link) {
          var active = link.getAttribute('href') === '#' + entry.target.id;
          if (active) link.setAttribute('aria-current', 'true');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-42% 0px -52% 0px', threshold: 0 });

    sections.forEach(function (section) { sectionObserver.observe(section); });
  }

  document.querySelectorAll('[data-year]').forEach(function (element) {
    element.textContent = String(new Date().getFullYear());
  });
})();
