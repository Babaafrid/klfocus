/**
* Template Name: Moderna
* Updated: Sep 18 2023 with Bootstrap v5.3.2
* Template URL: https://bootstrapmade.com/free-bootstrap-template-corporate-moderna/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 20
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-carousel', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-wrap',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

  /**
   * Theme: dark/light with persistence
   */
  const savedTheme = localStorage.getItem('theme');
  // Default to LIGHT on first load. Only use dark if the user explicitly chose it before.
  const initialTheme = (savedTheme === 'dark' || savedTheme === 'light') ? savedTheme : 'light';

  const setTheme = (mode) => {
    const root = document.documentElement;
    const body = document.body;
    // Always manage theme class on <html> only for consistency
    if (mode === 'dark') {
      root.classList.add('theme-dark');
    } else {
      root.classList.remove('theme-dark');
    }
    // Ensure body never keeps a stale class
    body.classList.remove('theme-dark');
    localStorage.setItem('theme', mode);
    const btn = select('#themeToggle');
    if (btn) {
      const iconClass = mode === 'dark' ? 'bi-sun' : 'bi-moon-stars';
      const oldIcon = btn.querySelector('.theme-toggle-icon');
      if (oldIcon) {
        oldIcon.className = `bi ${iconClass} theme-toggle-icon`;
      }
    }
  };
  // Migrate any legacy body-level theme class to the root
  (function migrateThemeClass(){
    const body = document.body; const root = document.documentElement;
    if (body.classList.contains('theme-dark') && !root.classList.contains('theme-dark')) {
      root.classList.add('theme-dark');
    }
    body.classList.remove('theme-dark');
  })();
  setTheme(initialTheme);
  on('click', '#themeToggle', () => {
    const isDark = document.documentElement.classList.contains('theme-dark');
    setTheme(isDark ? 'light' : 'dark');
  });

  /**
   * Home page animations (GSAP + ScrollTrigger + Sparkles + Lottie)
   */
  const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const initGSAP = () => {
    if (!window.gsap || reducedMotion) return;
    const { gsap } = window;
    if (window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // Hero intro
    gsap.from('#hero h2', { y: 30, opacity: 0, duration: 0.9, ease: 'power3.out' });
    gsap.from('#hero p', { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.2 });

    // Floating orbs subtle motion
    gsap.utils.toArray('.orb').forEach((el, i) => {
      gsap.to(el, {
        x: `random(-30, 30)`,
        y: `random(-30, 30)`,
        duration: gsap.utils.random(3, 6),
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: i * 0.2
      });
    });

    // Cards in: service-details
    if (window.ScrollTrigger) {
      gsap.utils.toArray('.service-details .card').forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          y: 40,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: card, start: 'top 80%' }
        });
      });

      // Stats icons pop
      gsap.from('.stats-section .stat-item i', {
        scale: 0,
        opacity: 0,
        duration: 0.6,
        ease: 'back.out(1.7)',
        stagger: 0.1,
        scrollTrigger: { trigger: '.stats-section', start: 'top 80%' }
      });
    }
  };

  /**
   * Site-wide motion & micro-interactions
   */
  const loadScript = (src) => new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve();
    const s = document.createElement('script'); s.src = src; s.async = true;
    s.onload = resolve; s.onerror = reject; document.head.appendChild(s);
  });

  const ensureMotionLibs = async () => {
    const tasks = [];
    if (!window.gsap) tasks.push(loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js'));
    if (!window.ScrollTrigger) tasks.push(loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js'));
    if (!window.ScrollToPlugin) tasks.push(loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollToPlugin.min.js'));
    if (!window.lottie) tasks.push(loadScript('https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js'));
    if (tasks.length) await Promise.all(tasks);
  };

  const addGlobalStyleClasses = () => {
    // Add glow/tilt to common card-like elements
    const glowAndTilt = [
      '.service-details .card', '.services .icon-box', '.pricing .box',
      '.blog .entry', '.portfolio .portfolio-item',
      '.contact .info-box', '.why-us .icon-box'
    ];
    glowAndTilt.forEach(sel => select(sel, true).forEach(el => {
      el.classList.add('glow-card', 'tilt');
    }));

    // Team cards: glow only on card; tilt only the image container to avoid layout conflicts
    select('.team .member', true).forEach(el => el.classList.add('glow-card'));
    select('.team .member .member-img', true).forEach(el => el.classList.add('tilt'));

    // Club detail pages: elevate boxes and highlight slider
    select('.portfolio-details .portfolio-info', true).forEach(el => el.classList.add('glass','glow-card'));
    select('.portfolio-details .portfolio-description', true).forEach(el => el.classList.add('glass','glow-card'));
    select('.portfolio-details .portfolio-details-slider', true).forEach(el => el.classList.add('neon-frame'));

    // Enhance breadcrumb/header bar with animated gradient
    const bc = select('.breadcrumbs'); if (bc) bc.classList.add('gradient-animated');

    // Subtle gradients to section backgrounds
    select('section.section-bg', true).forEach(sec => sec.classList.add('gradient-animated'));

    // Make CTA buttons a bit magnetic
    select('.btn-get-started, .cta-btn, .button, .btn', true).forEach(btn => btn.classList.add('magnetic'));

    // Section titles shimmer
    select('.section-title h2', true).forEach(h => h.classList.add('shimmer-text'));
  };

  const initSiteWideGSAP = () => {
    if (!window.gsap || reducedMotion) return;
    const { gsap } = window; if (window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

    const reveal = (selector, from = { opacity: 0, y: 40 }) => {
      if (!window.ScrollTrigger) return;
      gsap.utils.toArray(selector).forEach((el) => {
        gsap.from(el, { ...from, duration: 0.7, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 85%' } });
      });
    };

    reveal('.section-title');
    reveal('.services .icon-box');
    reveal('.service-details .card');
    reveal('.pricing .box');
    reveal('.team .member');
    reveal('.portfolio .portfolio-item');
    reveal('.blog .entry');
    reveal('.contact .info-box');
  };

  const initAboutAnimations = () => {
    if (!window.gsap || reducedMotion) return;
    if (!document.querySelector('section.about')) return;
    const { gsap } = window;
    // Float the hero image subtly
    const img = document.querySelector('.about img.rounded.shadow-lg');
    if (img) {
      gsap.to(img, { y: 8, duration: 3, ease: 'sine.inOut', yoyo: true, repeat: -1 });
    }
    // Stagger in checklist rows when visible
    if (window.ScrollTrigger) {
      gsap.utils.toArray('.about .d-flex.align-items-start').forEach((el, i) => {
        gsap.from(el, { opacity:0, x:-20, duration:.5, ease:'power2.out', scrollTrigger:{ trigger: el, start:'top 85%' } });
      });
    }
  };

  const initTilt = () => {
    if (reducedMotion) return;
    const els = select('.tilt', true);
    const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
    els.forEach(el => {
      const rect = () => el.getBoundingClientRect();
      const max = 8; // deg
      const onMove = (e) => {
        const r = rect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        const rx = clamp((0.5 - py) * max * 2, -max, max);
        const ry = clamp((px - 0.5) * max * 2, -max, max);
        el.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
      };
      const onLeave = () => { el.style.transform = 'perspective(800px) rotateX(0) rotateY(0)'; };
      el.addEventListener('mousemove', onMove);
      el.addEventListener('mouseleave', onLeave);
    });
  };

  const initMagnetic = () => {
    if (reducedMotion) return;
    select('.magnetic', true).forEach(btn => {
      const strength = 20;
      const onMove = (e) => {
        const r = btn.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        btn.style.transform = `translate(${dx/strength}px, ${dy/strength}px)`;
      };
      const onLeave = () => { btn.style.transform = 'translate(0,0)'; };
      btn.addEventListener('mousemove', onMove);
      btn.addEventListener('mouseleave', onLeave);
    });
  };

  const initDataLotties = () => {
    if (!window.lottie || reducedMotion) return;
    select('[data-lottie]', true).forEach(el => {
      try {
        window.lottie.loadAnimation({
          container: el,
          renderer: 'svg', loop: true, autoplay: true,
          path: el.getAttribute('data-lottie')
        });
      } catch(e){ /* ignore */ }
    });
  };

  /**
   * Clubs page: transform portfolio grid into circular club cards
   * - Derives club name from the href filename (e.g., aprameya.html -> Aprameya)
   * - Wraps images into a circular frame with animated electric border
   */
  const initClubCards = () => {
    // Only run on clubs page to avoid affecting other portfolios (e.g., #Include)
    const pathname = (location.pathname || '').replace(/\/+$/, '');
    const isClubsPage = pathname === '/clubs' || /(^|\/)clubs\.html(?:$|[?#])/.test(location.pathname) || document.body.classList.contains('page-clubs');
    if (!isClubsPage) return;
    const grid = select('.portfolio');
    if (!grid) return; // safety
    // Support pretty URLs ("/aprameya") and .html links
    const links = select('.portfolio .portfolio-item a', true);
    if (!links || !links.length) return;

    const ACR = { gdsc: 'GDSC', rpa: 'RPA', socc: 'SOCC', sods: 'SODS', sea: 'SEA', dc: 'DC', ai: 'AI' };
    const titleCase = (s) => s.replace(/[-_]+/g, ' ').replace(/\s+/g, ' ').trim()
      .split(' ').map(w => ACR[w.toLowerCase()] || (w.charAt(0).toUpperCase() + w.slice(1))).join(' ');
    const deriveName = (a) => {
      const href = (a.getAttribute('href') || '').split('?')[0];
      let slug = href.split('/').filter(Boolean).pop() || '';
      slug = slug.replace(/\.html$/i, '').replace(/\/?$/, '');
      if (!slug) {
        const img = a.querySelector('img');
        if (img) {
          const src = (img.getAttribute('src') || '').split('?')[0];
          slug = src.split('/').filter(Boolean).pop() || '';
          slug = slug.replace(/\.[a-zA-Z0-9]+$/, '');
        }
      }
      return titleCase(slug || 'Club');
    };

    links.forEach(a => {
      const item = a.closest('.portfolio-item');
      if (!item || item.classList.contains('club-card')) return;
      item.classList.add('club-card');

      const name = deriveName(a);
      const img = a.querySelector('img');
      if (img) {
        img.classList.add('club-img');
        // Wrap image for electric ring
        const wrap = document.createElement('div');
        wrap.className = 'club-img-wrap electric';
        img.parentNode.insertBefore(wrap, img);
        wrap.appendChild(img);
      }

      const caption = document.createElement('div');
      caption.className = 'club-name';
      caption.textContent = name;
      a.appendChild(caption);
    });
  };

  const initSparkles = () => {
    if (reducedMotion) return;
    const canvas = document.getElementById('sparkleCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width, height, dpr;
    const resize = () => {
      dpr = window.devicePixelRatio || 1;
      width = canvas.clientWidth || window.innerWidth;
      height = canvas.clientHeight || window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    const COUNT = 110; // a bit heavy, but pretty
    const particles = new Array(COUNT).fill(0).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      r: Math.random() * 2 + 0.6,
      hue: 190 + Math.random() * 60
    }));

    let mx = width / 2, my = height / 2; let hasMouse = false;
    window.addEventListener('mousemove', (e) => { hasMouse = true; mx = e.clientX; my = e.clientY; });

    const step = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'lighter';
      particles.forEach(p => {
        // gentle attraction to mouse
        if (hasMouse) {
          const dx = mx - p.x, dy = my - p.y; const dist = Math.hypot(dx, dy) + 0.001;
          const force = Math.min(0.08 / dist, 0.04);
          p.vx += force * dx;
          p.vy += force * dy;
        }
        p.x += p.vx; p.y += p.vy;
        // bounds wrap
        if (p.x < -5) p.x = width + 5; if (p.x > width + 5) p.x = -5;
        if (p.y < -5) p.y = height + 5; if (p.y > height + 5) p.y = -5;
        p.vx *= 0.98; p.vy *= 0.98;

        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 12);
        g.addColorStop(0, `hsla(${p.hue}, 95%, 70%, 0.9)`);
        g.addColorStop(1, `hsla(${p.hue}, 95%, 50%, 0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 12, 0, Math.PI * 2);
        ctx.fill();
      });
      requestAnimationFrame(step);
    };
    step();
  };

  const initLottie = () => {
    const el = select('#lottie-hero');
    if (!el || !window.lottie || reducedMotion) return;
    try {
      const path = el.getAttribute('data-src') || 'assets/animations/hero.json';
      window.lottie.loadAnimation({
        container: el,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path
      });
      // If the file is missing, hide gracefully later
      setTimeout(() => { if (!el.firstChild) el.style.display = 'none'; }, 4000);
    } catch (e) { el.style.display = 'none'; }
  };

  // Ensure club cards render regardless of external script load
  document.addEventListener('DOMContentLoaded', () => { try { initClubCards(); } catch(e){} });

  // Initialize page-specific effects after load
  window.addEventListener('load', async () => {
    // Render clubs immediately as a priority
    try { initClubCards(); } catch(e){}

    // Ensure motion libraries exist everywhere, but don't block essentials
    try { await ensureMotionLibs(); } catch(e) { /* continue without motion libs */ }
    addGlobalStyleClasses();

    // Animations & effects
    initGSAP();         // home hero specifics
    initSiteWideGSAP(); // generic reveals
    initAboutAnimations();
    initTilt();
    initMagnetic();
    initSparkles();
    initLottie();       // hero lottie hook
    initDataLotties();  // [data-lottie] anywhere
    initHeroTypewriter();

    // Safety fallback: if AOS didn't kick in, unhide AOS-marked elements
    setTimeout(() => {
      const aosEls = select('[data-aos]', true);
      if (!aosEls || !aosEls.length) return;
      // If many remain fully transparent, force show to avoid empty sections
      const hiddenCount = aosEls.filter(el => {
        const cs = window.getComputedStyle(el);
        return cs && parseFloat(cs.opacity) === 0;
      }).length;
      if (hiddenCount > Math.max(2, aosEls.length * 0.5)) {
        aosEls.forEach(el => { el.style.opacity = '1'; el.style.transform = 'none'; });
      }
    }, 800);
  });

  /**
   * Typewriter effect for hero slide taglines (<p> inside each carousel-item)
   */
  const initHeroTypewriter = () => {
    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const carousel = select('#heroCarousel');
    if (!carousel) return;

    const items = carousel.querySelectorAll('.carousel-item .carousel-container p');
    if (!items.length) return;

    // Save originals
    items.forEach(p => {
      if (!p.dataset.twOriginal) p.dataset.twOriginal = p.textContent.trim();
    });

    const timers = new Map();
    const cancelTyping = (el) => {
      const t = timers.get(el);
      if (t) { clearTimeout(t); timers.delete(el); }
      el.classList.remove('typewriter');
    };
    const type = (el, text, speed = 30) => {
      el.textContent = '';
      el.classList.add('typewriter');
      let i = 0;
      const tick = () => {
        el.textContent = text.slice(0, i);
        i++;
        if (i <= text.length) {
          const id = setTimeout(tick, speed);
          timers.set(el, id);
        } else {
          el.classList.remove('typewriter');
          el.dataset.twDone = '1'; // mark done so it won't retype on revisit
        }
      };
      tick();
    };

    const typeActive = () => {
      const activeItem = carousel.querySelector('.carousel-item.active .carousel-container p');
      if (!activeItem) return;
      if (reduced) return; // show static text, no typing
      // If already typed once, keep it as-is
      if (activeItem.dataset.twDone === '1') return;
      // Start typing
      type(activeItem, activeItem.dataset.twOriginal || activeItem.textContent.trim());
    };

    // Initial
    typeActive();

    // On slide
    carousel.addEventListener('slide.bs.carousel', () => {
      // Only cancel timers; do not clear text to avoid flicker
      items.forEach(cancelTyping);
    });
    carousel.addEventListener('slid.bs.carousel', () => {
      typeActive();
    });
  };

})()