// ============================================
// Velora Coffee - Main JavaScript File
// ============================================
document.addEventListener('DOMContentLoaded', function() {
  // ============================================
  // 1. Navbar Scroll Effect
  // بيغير خلفية الـ navbar لما بنسكرول
  // ============================================
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(13, 13, 13, 0.95)';
      navbar.style.padding = '10px 0';
    } else {
      navbar.style.background = 'rgba(13, 13, 13, 0.85)';
      navbar.style.padding = '15px 0';
    }
  });
  // ============================================
  // 2. Scroll Spy - Nav Links Active State
  // بيخلي الـ nav link تبقى active لما نوصل للقسم بتاعها
  // ============================================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  function updateActiveLink() {
    let current = '';
    sections.forEach(function(section) {
      var sectionTop = section.offsetTop;
      var sectionHeight = section.clientHeight;
      if (window.scrollY >= (sectionTop - 150)) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(function(link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }
  window.addEventListener('scroll', updateActiveLink);
  // ============================================
  // 3. Smooth Scroll on Nav Click
  // لما بنضغط على nav link بيودينا للقسم بسلاسة
  // ============================================
  navLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      var targetId = this.getAttribute('href');
      var targetSection = document.querySelector(targetId);
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 80,
          behavior: 'smooth'
        });
      }
      navLinks.forEach(function(l) { l.classList.remove('active'); });
      this.classList.add('active');
    });
  });
  // ============================================
  // 4. Intersection Observer - Scroll Triggered Animations
  // بيخلي الأقسام تظهر بس لما المستخدم يوصل عندها
  // ============================================
  var observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };
  function createObserver(selector, animationClass, delay) {
    var elements = document.querySelectorAll(selector);
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          setTimeout(function() {
            entry.target.classList.add(animationClass);
          }, delay || 0);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    elements.forEach(function(el) {
      observer.observe(el);
    });
  }
  // Hero Section - تظهر على طول لأنها أول حاجة
  var heroElements = document.querySelectorAll('.hero-content > *');
  heroElements.forEach(function(el, index) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.8s ease';
    setTimeout(function() {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 100 + (index * 150));
  });
  var heroImage = document.querySelector('.hero-image-wrapper');
  if (heroImage) {
    heroImage.style.opacity = '0';
    heroImage.style.transform = 'scale(0.8)';
    heroImage.style.transition = 'all 1s ease';
    setTimeout(function() {
      heroImage.style.opacity = '1';
      heroImage.style.transform = 'scale(1)';
    }, 300);
  }
  // About Section - بتظهر لما بنوصل ليها
  var aboutElements = document.querySelectorAll('.about-content > *');
  aboutElements.forEach(function(el) {
    el.classList.add('hidden-element');
  });
  var aboutObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        var children = entry.target.querySelectorAll('.hidden-element');
        children.forEach(function(child, index) {
          setTimeout(function() {
            child.style.opacity = '1';
            child.style.transform = 'translateY(0)';
          }, index * 150);
        });
        aboutObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);
  var aboutContent = document.querySelector('.about-content');
  if (aboutContent) {
    aboutObserver.observe(aboutContent);
  }
  var aboutCard = document.querySelector('.about-card');
  if (aboutCard) {
    aboutCard.style.opacity = '0';
    aboutCard.style.transform = 'translateX(50px) scale(0.9)';
    aboutCard.style.transition = 'all 1s ease';
    var aboutCardObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateX(0) scale(1)';
          aboutCardObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);
    aboutCardObserver.observe(aboutCard);
  }
  // Products Section - بتظهر لما بنوصل ليها
  var productsHeader = document.querySelector('.products-section .section-header');
  if (productsHeader) {
    productsHeader.style.opacity = '0';
    productsHeader.style.transform = 'translateY(30px)';
    productsHeader.style.transition = 'all 0.8s ease';
    var productsHeaderObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          productsHeaderObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);
    productsHeaderObserver.observe(productsHeader);
  }
  var productCards = document.querySelectorAll('.product-card');
  productCards.forEach(function(card) {
    card.style.opacity = '0';
    card.style.transform = 'translateY(40px)';
    card.style.transition = 'all 0.8s ease';
  });
  var productsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        var cards = entry.target.querySelectorAll('.product-card');
        cards.forEach(function(card, index) {
          setTimeout(function() {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, index * 200);
        });
        productsObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);
  var productsRow = document.querySelector('.products-section .row');
  if (productsRow) {
    productsObserver.observe(productsRow);
  }
  // Features Section - بتظهر لما بنوصل ليها
  var featuresHeader = document.querySelector('.features-section .section-header');
  if (featuresHeader) {
    featuresHeader.style.opacity = '0';
    featuresHeader.style.transform = 'translateY(30px)';
    featuresHeader.style.transition = 'all 0.8s ease';
    var featuresHeaderObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          featuresHeaderObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);
    featuresHeaderObserver.observe(featuresHeader);
  }
  var featureCards = document.querySelectorAll('.feature-card');
  featureCards.forEach(function(card) {
    card.style.opacity = '0';
    card.style.transform = 'translateY(40px)';
    card.style.transition = 'all 0.8s ease';
  });
  var featuresObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        var cards = entry.target.querySelectorAll('.feature-card');
        cards.forEach(function(card, index) {
          setTimeout(function() {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, index * 150);
        });
        featuresObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);
  var featuresRow = document.querySelector('.features-section .row');
  if (featuresRow) {
    featuresObserver.observe(featuresRow);
  }
  // Testimonials Section - بتظهر لما بنوصل ليها
  var testimonialsHeader = document.querySelector('.testimonials-section .section-header');
  if (testimonialsHeader) {
    testimonialsHeader.style.opacity = '0';
    testimonialsHeader.style.transform = 'translateY(30px)';
    testimonialsHeader.style.transition = 'all 0.8s ease';
    var testimonialsHeaderObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          testimonialsHeaderObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);
    testimonialsHeaderObserver.observe(testimonialsHeader);
  }
  // CTA Section - بتظهر لما بنوصل ليها
  var ctaCard = document.querySelector('.cta-card');
  if (ctaCard) {
    ctaCard.style.opacity = '0';
    ctaCard.style.transform = 'scale(0.95)';
    ctaCard.style.transition = 'all 1s ease';
    var ctaCardObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'scale(1)';
          ctaCardObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);
    ctaCardObserver.observe(ctaCard);
  }
  var ctaContent = document.querySelector('.cta-content');
  if (ctaContent) {
    var ctaElements = ctaContent.children;
    for (var i = 0; i < ctaElements.length; i++) {
      ctaElements[i].style.opacity = '0';
      ctaElements[i].style.transform = 'translateY(25px)';
      ctaElements[i].style.transition = 'all 0.7s ease';
    }
    var ctaContentObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var children = entry.target.children;
          for (var j = 0; j < children.length; j++) {
            (function(index) {
              setTimeout(function() {
                children[index].style.opacity = '1';
                children[index].style.transform = 'translateY(0)';
              }, index * 150);
            })(j);
          }
          ctaContentObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);
    ctaContentObserver.observe(ctaContent);
  }
  // Footer Section - بيظهر لما بنوصل ليه
  var footerSection = document.querySelector('.footer-section');
  if (footerSection) {
    footerSection.style.opacity = '0';
    footerSection.style.transform = 'translateY(30px)';
    footerSection.style.transition = 'all 0.8s ease';
    var footerObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          footerObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);
    footerObserver.observe(footerSection);
  }
  var footerCols = document.querySelectorAll('.footer-main .col-lg-3');
  footerCols.forEach(function(col) {
    col.style.opacity = '0';
    col.style.transform = 'translateY(25px)';
    col.style.transition = 'all 0.6s ease';
  });
  var footerColsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        var cols = entry.target.querySelectorAll('.col-lg-3');
        cols.forEach(function(col, index) {
          setTimeout(function() {
            col.style.opacity = '1';
            col.style.transform = 'translateY(0)';
          }, index * 150);
        });
        footerColsObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);
  var footerRow = document.querySelector('.footer-main .row');
  if (footerRow) {
    footerColsObserver.observe(footerRow);
  }
  // ============================================
  // 5. Stats Counter Animation
  // العداد اللي بيعد من 0 للرقم النهائي
  // ============================================
  var statNumbers = document.querySelectorAll('.stat-number');
  var statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        var stats = entry.target.querySelectorAll('.stat-number');
        stats.forEach(function(stat) {
          var finalValue = stat.textContent;
          var hasPlus = finalValue.includes('+');
          var hasPercent = finalValue.includes('%');
          var numericPart = parseInt(finalValue.replace(/[^0-9]/g, ''));
          var current = 0;
          var increment = Math.ceil(numericPart / 50);
          var timer = setInterval(function() {
            current += increment;
            if (current >= numericPart) {
              current = numericPart;
              clearInterval(timer);
            }
            var display = '';
            if (hasPlus) display += '+';
            display += current;
            if (hasPercent) display += '%';
            if (hasPlus && current >= 1000) display = '+' + (current / 1000).toFixed(0) + 'K';
            stat.textContent = display;
          }, 30);
        });
        statsObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);
  var statsRow = document.querySelector('.stats-row');
  if (statsRow) {
    statsObserver.observe(statsRow);
  }
  // ============================================
  // 6. Swiper.js - Testimonials Slider
  // السلايدر بتاع آراء العملاء
  // ============================================
  var testimonialsSwiper = new Swiper('.testimonials-swiper', {
    slidesPerView: 1,
    spaceBetween: 25,
    loop: true,
    grabCursor: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 25,
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 25,
      },
    },
  });
});