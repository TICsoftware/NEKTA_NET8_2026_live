 document.documentElement.classList.remove('no-js');

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    // Skip motion entirely — just show everything in its resting state.
    gsap.set('.plate, .deco-left, .deco-right', { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 });
  } else {
    gsap.registerPlugin(ScrollTrigger);

    const plates    = gsap.utils.toArray('.plate');
  const decoLeft = document.querySelector('.deco-left');
  const decoRight= document.querySelector('.deco-right');

  /* ---------- plates: staggered pop-in with a slight overshoot ---------- */
  gsap.set(plates, { opacity: 0, y: 40, scale: .8, rotate: () => gsap.utils.random(-8, 8) });

  gsap.to(plates, {
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: 0,
    duration: .8,
    ease: 'back.out(1.6)',
    stagger: { each: 0.06, from: 'start', grid: 'auto' },
    scrollTrigger: {
      trigger: '.plate-grid',
      start: 'top 85%',
      once: true
    }
  });

  /* ---------- plates: magnetic hover / tap ---------- */
  plates.forEach((plate) => {
    const img = plate.querySelector('.plate-img');
    const hoverIn = () => {
      gsap.to(plate, { scale: 1.08, y: -10, rotate: gsap.utils.random(-4, 4), duration: .35, ease: 'power2.out' });
      gsap.to(img,   { boxShadow: '0 16px 22px rgba(140,100,50,.28)', duration: .35 });
    };
    const hoverOut = () => {
      gsap.to(plate, { scale: 1, y: 0, rotate: 0, duration: .5, ease: 'elastic.out(1, 0.5)' });
    };
    plate.addEventListener('mouseenter', hoverIn);
    plate.addEventListener('mouseleave', hoverOut);
    plate.addEventListener('touchstart', hoverIn, { passive: true });
    plate.addEventListener('touchend', hoverOut, { passive: true });
  });

  /* ---------- decorative food images: float in + idle bob ---------- */
  gsap.set(decoLeft,  { opacity: 0, x: -60, rotate: -16 });
  gsap.set(decoRight, { opacity: 0, x: 60,  rotate: 16 });

  gsap.timeline({ scrollTrigger: { trigger: '.plates-section', start: 'top 70%' } })
    .to(decoLeft,  { opacity: 1, x: 0, rotate: -6, duration: 1, ease: 'power3.out' })
    .to(decoRight, { opacity: 1, x: 0, rotate: 8,  duration: 1, ease: 'power3.out' }, '-=.8');

  gsap.to(decoLeft,  { y: -14, duration: 2.6, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 1 });
  gsap.to(decoRight, { y: 14,  duration: 2.8, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 1.2 });

  /*background curve line: gentle parallax drift on scroll ---------- */

  } // end reduced-motion check


  // ----------  Read more funtionality----------  //
    const readMoreBtn = document.getElementById('avReadMoreBtn');
  const avContent   = document.getElementById('avContent');
  const readMoreLabel = readMoreBtn.querySelector('.av-read-more-text');

  readMoreBtn.addEventListener('click', () => {
    const isExpanded = avContent.classList.toggle('is-expanded');
    readMoreBtn.setAttribute('aria-expanded', isExpanded);
    readMoreLabel.textContent = isExpanded ? 'Read Less' : 'Read More';
  });
   // ----------  Read more funtionality----------  //


  // ----------  Accrodian section ---------- //

  /* ---------------- accordion toggle (each item independent) ---------------- */
  document.querySelectorAll('[data-acc-toggle]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.closest('[data-acc-item]');
      item.classList.toggle('is-open');
    });
  });

  /* ---------------- generic media slider ---------------- */
  class AccSlider {
    constructor(root) {
      this.media = root; // the .acc-media wrapper
      this.sliderEl = root.querySelector('.acc-slider');
      this.slides = Array.from(root.querySelectorAll('.acc-slide'));
      this.dotsWrap = root.querySelector('[data-slider-dots]');
      this.prevBtn = root.querySelector('[data-slider-prev]');
      this.nextBtn = root.querySelector('[data-slider-next]');

      this.perView = Math.max(1, parseInt(root.dataset.perView, 10) || 1);
      this.pageIndex = 0;

      this.init();
    }

    init() {
      const count = this.slides.length;
      const pageCount = Math.ceil(count / this.perView);

      // expose per-view to CSS so slide widths divide the track correctly
      this.media.style.setProperty('--per-view', Math.min(this.perView, count) || 1);

      // not enough slides to page through — show them all, no nav
      if (pageCount <= 1) {
        if (this.prevBtn) this.prevBtn.style.display = 'none';
        if (this.nextBtn) this.nextBtn.style.display = 'none';
        if (this.dotsWrap) this.dotsWrap.style.display = 'none';
        return;
      }

      this.pageCount = pageCount;

      // build one dot per page (not per slide)
      if (this.dotsWrap) {
        for (let i = 0; i < pageCount; i++) {
          const dot = document.createElement('button');
          dot.className = 'acc-dot' + (i === 0 ? ' is-active' : '');
          dot.type = 'button';
          dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
          dot.addEventListener('click', () => this.goTo(i));
          this.dotsWrap.appendChild(dot);
        }
      }

      if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.goTo(this.pageIndex - 1));
      if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.goTo(this.pageIndex + 1));

      this.update();
    }

    goTo(newIndex) {
      this.pageIndex = (newIndex + this.pageCount) % this.pageCount;
      this.update();
    }

    update() {
      this.sliderEl.style.transform = `translateX(-${this.pageIndex * 100}%)`;
      if (this.dotsWrap) {
        Array.from(this.dotsWrap.children).forEach((dot, i) => {
          dot.classList.toggle('is-active', i === this.pageIndex);
        });
      }
      // pause videos on slides that have scrolled out of the current page
      const firstVisible = this.pageIndex * this.perView;
      const lastVisible = firstVisible + this.perView - 1;
      this.slides.forEach((slide, i) => {
        const video = slide.querySelector('video');
        if (video && (i < firstVisible || i > lastVisible)) {
          video.pause();
          slide.classList.remove('is-playing');
        }
      });
    }
  }

  document.querySelectorAll('.acc-media').forEach((mediaEl) => new AccSlider(mediaEl));

  /* ---------------- video play buttons ---------------- */
  document.querySelectorAll('[data-play-video]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const slide = btn.closest('.acc-slide');
      const video = slide.querySelector('video');
      video.play();
      slide.classList.add('is-playing');
      video.addEventListener('pause', () => slide.classList.remove('is-playing'));
      video.addEventListener('ended', () => slide.classList.remove('is-playing'));
    });
  });

  // ----------  Accrodian section ---------- //