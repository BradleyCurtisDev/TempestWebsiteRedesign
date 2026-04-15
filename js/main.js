/* ============================================================
   Tempest Financial Services — Main JS
   ============================================================ */

(function () {
  'use strict';

  // --- Navbar scroll behaviour ----------------------------
  const header = document.querySelector('.site-header');
  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 20);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // --- Mobile nav toggle ----------------------------------
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');

  navToggle.addEventListener('click', function () {
    const open = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', String(open));
  });

  // Close menu when a nav link is clicked
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Close menu on outside click
  document.addEventListener('click', function (e) {
    if (!header.contains(e.target) && navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // --- Scroll reveal --------------------------------------
  const revealEls = document.querySelectorAll(
    '.service-card, .about-card, .contact-detail-item, .contact-form-wrap, .about-content, .about-visual, .section-header'
  );

  revealEls.forEach(function (el, i) {
    el.classList.add('reveal');
    // Stagger cards within grids
    const siblings = el.parentElement.querySelectorAll('.reveal');
    const idx = Array.prototype.indexOf.call(siblings, el);
    if (idx > 0 && idx <= 5) {
      el.classList.add('reveal-delay-' + idx);
    }
  });

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealEls.forEach(function (el) { observer.observe(el); });

  // --- Dynamic footer year --------------------------------
  const yearEl = document.getElementById('footerYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // --- Contact form (client-side demo) --------------------
  const form = document.getElementById('contactForm');
  if (form) {
    // Inject feedback elements
    const successEl = document.createElement('p');
    successEl.className = 'form-success';
    successEl.textContent = 'Thank you! We\'ll be in touch within one business day.';

    const errorEl = document.createElement('p');
    errorEl.className = 'form-error';
    errorEl.textContent = 'Please fill in all required fields correctly.';

    form.insertBefore(successEl, form.firstChild);
    form.insertBefore(errorEl, form.firstChild);

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      successEl.style.display = 'none';
      errorEl.style.display   = 'none';

      const name  = form.fullName.value.trim();
      const phone = form.phone.value.trim();
      const email = form.email.value.trim();
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!name || !phone || !email || !emailRe.test(email)) {
        errorEl.style.display = 'block';
        errorEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        return;
      }

      // Replace this section with your preferred form backend
      // (e.g. Formspree, Netlify Forms, EmailJS, etc.)
      console.log('Form submitted:', { name, phone, email, message: form.message.value });

      successEl.style.display = 'block';
      form.reset();
      successEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }

  // --- Active nav link on scroll --------------------------
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-link');

  function setActiveLink() {
    let current = '';
    sections.forEach(function (section) {
      const top = section.offsetTop - 100;
      if (window.scrollY >= top) current = section.getAttribute('id');
    });
    navItems.forEach(function (link) {
      link.classList.toggle(
        'active',
        link.getAttribute('href') === '#' + current
      );
    });
  }

  window.addEventListener('scroll', setActiveLink, { passive: true });
  setActiveLink();

})();
