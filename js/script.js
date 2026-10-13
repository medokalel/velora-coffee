// Velora Coffee: main script
document.addEventListener('DOMContentLoaded', function () {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Navbar: solid background after scrolling (class toggled, rAF-throttled)
  var navbar = document.querySelector('.navbar');
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      navbar.classList.toggle('is-scrolled', window.scrollY > 50);
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // 2. Scroll spy: mark the nav link of the section currently in view
  var navLinks = document.querySelectorAll('.nav-link');
  var spyTargets = [];
  navLinks.forEach(function (link) {
    var target = document.querySelector(link.getAttribute('href'));
    if (target) spyTargets.push({ link: link, el: target });
  });
  function setActive(link) {
    navLinks.forEach(function (l) {
      l.classList.toggle('active', l === link);
      if (l === link) l.setAttribute('aria-current', 'true');
      else l.removeAttribute('aria-current');
    });
  }
  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var hit = spyTargets.filter(function (t) { return t.el === entry.target; })[0];
        if (hit) setActive(hit.link);
      });
    }, { rootMargin: '-35% 0px -55% 0px' });
    spyTargets.forEach(function (t) { spy.observe(t.el); });
  }

  // 3. Nav clicks: smooth scroll (CSS handles it) and close the mobile menu
  var collapseEl = document.getElementById('navbarNav');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      setActive(link);
      if (collapseEl && collapseEl.classList.contains('show') && window.bootstrap) {
        window.bootstrap.Collapse.getOrCreateInstance(collapseEl).hide();
      }
    });
  });

  // 4. Reveal on scroll. Classes are added here, so without JS everything stays visible.
  function reveal(selector, step) {
    if (reduceMotion || !('IntersectionObserver' in window)) return;
    var items = document.querySelectorAll(selector);
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        el.classList.add('in');
        io.unobserve(el);
        // drop the helper classes afterwards so hover transforms keep working
        setTimeout(function () { el.classList.remove('reveal', 'in'); el.style.removeProperty('--d'); }, 1400);
      });
    }, { threshold: 0.15 });
    items.forEach(function (el, i) {
      el.classList.add('reveal');
      el.style.setProperty('--d', (i % 4) * step + 'ms');
      io.observe(el);
    });
  }
  reveal('.about-content > *, .about-card', 120);
  reveal('.section-header', 0);
  reveal('.product-card', 150);
  reveal('.feature-card', 120);
  reveal('.cta-card', 0);
  reveal('.footer-main .col-lg-3', 120);

  // 5. Stats counter (final text is already in the HTML, so no-JS shows real values)
  function format(stat, value) {
    return (stat.dataset.prefix || '') + value + (stat.dataset.suffix || '');
  }
  var statsRow = document.querySelector('.stats-row');
  if (statsRow && !reduceMotion && 'IntersectionObserver' in window) {
    var statsIO = new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting) return;
      statsIO.disconnect();
      statsRow.querySelectorAll('.stat-number').forEach(function (stat) {
        var target = parseInt(stat.dataset.target, 10);
        if (isNaN(target)) return;
        var start = null;
        function step(ts) {
          if (start === null) start = ts;
          var p = Math.min((ts - start) / 1200, 1);
          stat.textContent = format(stat, Math.round(target * p));
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
    }, { threshold: 0.3 });
    statsIO.observe(statsRow);
  }

  // 6. Testimonials slider (autoplay pauses on hover and is off for reduced motion)
  if (window.Swiper) {
    new Swiper('.testimonials-swiper', {
      slidesPerView: 1,
      spaceBetween: 25,
      loop: true,
      grabCursor: true,
      autoplay: reduceMotion ? false : { delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true },
      pagination: { el: '.swiper-pagination', clickable: true },
      a11y: { enabled: true, paginationBulletMessage: 'الانتقال إلى الرأي {{index}}' },
      breakpoints: {
        768: { slidesPerView: 2, spaceBetween: 25 },
        992: { slidesPerView: 3, spaceBetween: 25 }
      }
    });
  }

  // 7. Demo-only controls: tell the visitor nothing is sent or bought
  var toast = document.getElementById('demo-toast');
  var toastTimer;
  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.hidden = true; }, 3500);
  }
  document.querySelectorAll('[data-demo]').forEach(function (btn) {
    btn.addEventListener('click', function () { showToast(btn.dataset.demo); });
  });
  var form = document.getElementById('newsletter-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      form.reset();
      showToast('هذا نموذج تجريبي، لم يتم حفظ أو إرسال أي بيانات.');
    });
  }
});
