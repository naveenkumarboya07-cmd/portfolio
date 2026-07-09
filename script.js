// ==========================================================================
// BOYA NAVEEN KUMAR — PORTFOLIO
// Modular interaction script
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  initCursor();
  initThemeToggle();
  initMobileNav();
  initScrollTop();
  initScrollReveal();
  initCounters();
  initStagger();
  initContactForm();
  initActiveNav();
  initButtonRipple();
  initParticleTrail();
});

/* ------------------------------------------------------------------------
   Custom cursor (desktop / fine-pointer only)
   ------------------------------------------------------------------------ */
function initCursor() {
  if (window.matchMedia('(hover: none)').matches) return;

  const cursor = document.getElementById('cursor');
  const cursorRing = document.getElementById('cursorRing');
  if (!cursor || !cursorRing) return;

  let mouseX = 0;
  let mouseY = 0;
  let ringX = 0;
  let ringY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = `${mouseX - 5}px`;
    cursor.style.top = `${mouseY - 5}px`;
  });

  function animateCursor() {
    ringX += (mouseX - ringX - 18) * 0.12;
    ringY += (mouseY - ringY - 18) * 0.12;
    cursorRing.style.left = `${ringX}px`;
    cursorRing.style.top = `${ringY}px`;
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  document.querySelectorAll('a, button, .btn, .project-card, .skill-card').forEach((el) => {
    el.addEventListener('mouseenter', () => {
      cursorRing.style.width = '56px';
      cursorRing.style.height = '56px';
      cursorRing.style.opacity = '0.6';
    });
    el.addEventListener('mouseleave', () => {
      cursorRing.style.width = '36px';
      cursorRing.style.height = '36px';
      cursorRing.style.opacity = '1';
    });
  });
}

/* ------------------------------------------------------------------------
   Theme toggle (persists for the session only — no localStorage requirement)
   ------------------------------------------------------------------------ */
function initThemeToggle() {
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  if (!themeToggle || !themeIcon) return;

  let isDark = document.documentElement.getAttribute('data-theme') !== 'light';

  themeToggle.addEventListener('click', () => {
    isDark = !isDark;
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    themeIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
  });
}

/* ------------------------------------------------------------------------
   Mobile hamburger navigation
   ------------------------------------------------------------------------ */
function initMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ------------------------------------------------------------------------
   Scroll-to-top button
   ------------------------------------------------------------------------ */
function initScrollTop() {
  const scrollTopBtn = document.getElementById('scrollTop');
  if (!scrollTopBtn) return;

  window.addEventListener('scroll', () => {
    scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ------------------------------------------------------------------------
   Reveal-on-scroll (Intersection Observer)
   ------------------------------------------------------------------------ */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal, .reveal-left');
  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), 80);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  reveals.forEach((el) => observer.observe(el));
}

/* ------------------------------------------------------------------------
   Animated stat counters
   ------------------------------------------------------------------------ */
function initCounters() {
  const counters = document.querySelectorAll('.stat-num');
  if (!counters.length) return;

  const countObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseFloat(el.getAttribute('data-count'));
        const suffix = el.getAttribute('data-suffix') || '';
        const isDecimal = String(el.getAttribute('data-count')).includes('.');
        if (!target) return;

        let start = 0;
        const duration = 1500;

        const step = (timestamp) => {
          if (!start) start = timestamp;
          const progress = Math.min((timestamp - start) / duration, 1);
          const eased = 1 - (1 - progress) ** 3;
          const value = isDecimal ? (eased * target).toFixed(1) : Math.floor(eased * target);
          el.textContent = value + suffix;
          if (progress < 1) {
            requestAnimationFrame(step);
          } else {
            el.textContent = target + suffix;
          }
        };
        requestAnimationFrame(step);
        countObserver.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((el) => countObserver.observe(el));
}

/* ------------------------------------------------------------------------
   Stagger children animation delays
   ------------------------------------------------------------------------ */
function initStagger() {
  document
    .querySelectorAll('.projects-grid, .education-grid, .certs-grid, .skills-grid')
    .forEach((grid) => {
      Array.from(grid.children).forEach((child, i) => {
        child.style.transitionDelay = `${i * 0.1}s`;
      });
    });
}

/* ------------------------------------------------------------------------
   Contact form submit feedback
   ------------------------------------------------------------------------ */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.btn-primary');
    if (!btn) return;

    const originalHTML = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check" aria-hidden="true"></i> Message Sent!';
    btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = originalHTML;
      btn.style.background = '';
      btn.disabled = false;
      form.reset();
    }, 3000);
  });
}

/* ------------------------------------------------------------------------
   Active nav link highlighting on scroll
   ------------------------------------------------------------------------ */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  if (!sections.length || !navLinks.length) return;

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach((s) => {
      if (window.scrollY >= s.offsetTop - 120) current = s.getAttribute('id');
    });
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  });
}

/* ------------------------------------------------------------------------
   Button ripple micro-interaction
   ------------------------------------------------------------------------ */
function initButtonRipple() {
  document.querySelectorAll('.btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      ripple.className = 'ripple';
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });
}

/* ------------------------------------------------------------------------
   Ambient particle trail (desktop / fine-pointer only)
   ------------------------------------------------------------------------ */
function initParticleTrail() {
  if (window.matchMedia('(hover: none)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.85) {
      const p = document.createElement('div');
      p.style.cssText = `position:fixed;left:${e.clientX}px;top:${e.clientY}px;width:4px;height:4px;background:var(--accent);border-radius:50%;pointer-events:none;z-index:9997;opacity:0.7;transition:all 0.8s ease;transform:scale(1)`;
      document.body.appendChild(p);
      requestAnimationFrame(() => {
        p.style.opacity = '0';
        p.style.transform = 'scale(0) translateY(-20px)';
      });
      setTimeout(() => p.remove(), 800);
    }
  });
}
