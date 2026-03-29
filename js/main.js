/**
 * Coin Signal Profile — Main JS
 * Handles accordion-style capability card expansion.
 */
(function () {
  'use strict';

  // ---- Accordion for capability cards ----
  document.querySelectorAll('.cap-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var expanded = btn.getAttribute('aria-expanded') === 'true';
      var bodyId   = btn.getAttribute('aria-controls');
      var body     = document.getElementById(bodyId);

      if (!body) return;

      if (expanded) {
        btn.setAttribute('aria-expanded', 'false');
        body.hidden = true;
      } else {
        btn.setAttribute('aria-expanded', 'true');
        body.hidden = false;
      }
    });
  });

  // ---- Smooth active-link highlighting in nav ----
  var sections = document.querySelectorAll('section[id], header[id]');
  var navLinks = document.querySelectorAll('.site-nav a');

  function onScroll () {
    var scrollY = window.scrollY + 80;
    var current = '';

    sections.forEach(function (sec) {
      if (sec.offsetTop <= scrollY) {
        current = sec.id;
      }
    });

    navLinks.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---- Intersection Observer: fade-in sections ----
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(
      '.highlight-card, .cap-card, .metal-card, .science-item, .two-col > div'
    ).forEach(function (el) {
      el.classList.add('fade-in');
      observer.observe(el);
    });
  }
})();
