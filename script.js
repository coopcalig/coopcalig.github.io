// script.js — animaciones y microinteracciones
document.addEventListener('DOMContentLoaded', () => {
  // NAV toggle (mobile)
  const navToggle = document.querySelector('.nav-toggle');
  const navList = document.getElementById('nav-list');
  if(navToggle){
    navToggle.addEventListener('click', () => {
      const open = navList.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Intersection Observer: reveal elements with data-anim
  const animEls = document.querySelectorAll('[data-anim]');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if(!prefersReduced && animEls.length){
    const obs = new IntersectionObserver((entries, observer) => {
      entries.forEach(e => {
        if(e.isIntersecting){
          e.target.classList.add('in');
          observer.unobserve(e.target);
        }
      });
    }, {threshold: 0.12});
    animEls.forEach(el => obs.observe(el));
  } else {
    // fallback: show immediately
    animEls.forEach(el => el.classList.add('in'));
  }

  // Parallax micro-effect on mousemove for .parallax elements
  const parallaxEls = document.querySelectorAll('[data-parallax]');
  parallaxEls.forEach(el => {
    el.addEventListener('mousemove', e => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      // subtle transform
      el.style.transform = `translate3d(${x * 8}px, ${y * 6}px, 0) rotate(${x * 2}deg)`;
      // show shine
      const shine = el.querySelector('.shine');
      if(shine) shine.style.opacity = 1;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
      const shine = el.querySelector('.shine');
      if(shine) shine.style.opacity = 0;
    });
  });

  // Small performance improvement: lazy-load images (native)
  document.querySelectorAll('img').forEach(img => {
    if(!img.hasAttribute('loading')) img.setAttribute('loading', 'lazy');
  });

  // Accessibility: close nav on outside click (mobile)
  document.addEventListener('click', (e) => {
    if(!navList) return;
    if(window.innerWidth <= 760 && navList.classList.contains('open')){
      if(!navList.contains(e.target) && !navToggle.contains(e.target)){
        navList.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    }
  });

});





document.addEventListener("DOMContentLoaded", () => {
      const loader = document.getElementById("loader");
      setTimeout(() => loader.classList.add("hide"), 2000);

      const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      }, { threshold: .2 });

      document.querySelectorAll('.scroll-anim, .scroll-anim-left')
        .forEach(el => obs.observe(el));
    });