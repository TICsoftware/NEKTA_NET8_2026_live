  (function () {
    var btn = document.getElementById('dpReadMoreBtn');
    var label = document.getElementById('dpReadMoreLabel');
    var paragraph = document.getElementById('dpFadeParagraph');
    if (!btn || !paragraph) return;

    btn.addEventListener('click', function () {
      var expanded = paragraph.classList.toggle('is-expanded');
      btn.classList.toggle('is-expanded', expanded);
      btn.setAttribute('aria-expanded', String(expanded));
      label.textContent = expanded ? 'Read Less' : 'Read More';
    });
  })();



// ------------------------SLIDER------------------------//
(function () {
  var track = document.getElementById('menuTrack');
  var prevBtn = document.getElementById('menuPrev');
  var nextBtn = document.getElementById('menuNext');
  var viewport = document.querySelector('.menu-slider-viewport');
  if (!track || !prevBtn || !nextBtn || !viewport) return;

  var cards = Array.prototype.slice.call(track.children);
  var index = 0;

  function cardStep() {
    var card = cards[0];
    var style = window.getComputedStyle(track);
    var gap = parseFloat(style.columnGap || style.gap) || 0;
    return card.getBoundingClientRect().width + gap;
  }

  function update() {
    var step = cardStep();
    var trackWidth = track.scrollWidth;               // real full width of all cards + gaps
    var viewportWidth = viewport.getBoundingClientRect().width;
    var maxScroll = Math.max(0, trackWidth - viewportWidth); // real max pixel distance, no guessing
    var maxIdx = step > 0 ? Math.ceil(maxScroll / step) : 0;

    if (index > maxIdx) index = maxIdx;
    if (index < 0) index = 0;

    // clamp the actual translate to maxScroll so it can never overshoot past the last card
    var translateX = Math.min(index * step, maxScroll);
    track.style.transform = 'translateX(-' + translateX + 'px)';

    prevBtn.disabled = index <= 0;
    nextBtn.disabled = index >= maxIdx;
  }

  prevBtn.addEventListener('click', function () {
    index -= 1;
    update();
  });

  nextBtn.addEventListener('click', function () {
    index += 1;
    update();
  });

  window.addEventListener('resize', update);
  update();
})();


// Center the slider on page load
(function () {
    var viewport = document.getElementById('experienceViewport');
    var track = document.getElementById('experienceTrack');
    var prevBtn = document.getElementById('experiencePrev');
    var nextBtn = document.getElementById('experienceNext');
    var dotsWrap = document.getElementById('experienceDots');
    if (!viewport || !track || !prevBtn || !nextBtn || !dotsWrap) return;
 
    var slides = Array.prototype.slice.call(track.children);
    var total = slides.length;
    if (total === 0) return;
 
    var currentIndex = Math.min(1, total - 1); // start on the 2nd slide if it exists, like the reference
 
    // Build dots to match however many slides actually exist.
    var dots = slides.map(function (_, i) {
      var dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'experience-dot';
      dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
      dot.addEventListener('click', function () {
        currentIndex = i;
        update();
      });
      dotsWrap.appendChild(dot);
      return dot;
    });
 
    function center(instant) {
      var active = slides[currentIndex];
      var viewportWidth = viewport.getBoundingClientRect().width;
      var slideCenter = active.offsetLeft + active.offsetWidth / 2;
      var translateX = viewportWidth / 2 - slideCenter;
 
      track.style.transition = instant ? 'none' : '';
      track.style.transform = 'translateX(' + translateX + 'px)';
 
      if (instant) {
        track.getBoundingClientRect(); // force reflow so the "instant" jump has no transition
        track.style.transition = '';
      }
    }
 
    function update(instant) {
      if (currentIndex < 0) currentIndex = 0;
      if (currentIndex > total - 1) currentIndex = total - 1;
 
      slides.forEach(function (slide, i) {
        slide.classList.toggle('is-active', i === currentIndex);
      });
      dots.forEach(function (dot, i) {
        dot.classList.toggle('is-active', i === currentIndex);
      });
 
      prevBtn.disabled = currentIndex <= 0;
      nextBtn.disabled = currentIndex >= total - 1;
 
      center(instant);
    }
 
    prevBtn.addEventListener('click', function () {
      currentIndex -= 1;
      update();
    });
 
    nextBtn.addEventListener('click', function () {
      currentIndex += 1;
      update();
    });
 
    window.addEventListener('resize', function () {
      update(true);
    });
 
    update(true); // center correctly on load — works the same whether there's 1 slide or many
  })();


  // Accordion functionality for the "Daily Pour Belongs" section
  (function () {
    var accordion = document.getElementById('belongsAccordion');
    if (!accordion) return;
 
    var items = Array.prototype.slice.call(accordion.querySelectorAll('.belongs-accordion-item'));
 
    function setPanelHeight(item, open) {
      var panel = item.querySelector('.belongs-accordion-panel');
      var trigger = item.querySelector('.belongs-accordion-trigger');
      if (open) {
        panel.style.maxHeight = panel.scrollHeight + 'px';
      } else {
        panel.style.maxHeight = '0px';
      }
      item.classList.toggle('is-open', open);
      trigger.setAttribute('aria-expanded', String(open));
    }
 
    items.forEach(function (item) {
      var trigger = item.querySelector('.belongs-accordion-trigger');
      trigger.addEventListener('click', function () {
        var alreadyOpen = item.classList.contains('is-open');
 
        // Single-open accordion — collapse any other open item first.
        items.forEach(function (other) {
          if (other !== item) setPanelHeight(other, false);
        });
 
        setPanelHeight(item, !alreadyOpen);
      });
    });
 
    // Initialize the panel that's open by default (Corporate Workplaces),
    // and keep heights correct if fonts/layout shift on load or resize.
    function refreshOpenPanel() {
      var openItem = accordion.querySelector('.belongs-accordion-item.is-open');
      if (openItem) setPanelHeight(openItem, true);
    }
 
    refreshOpenPanel();
    window.addEventListener('resize', refreshOpenPanel);
  })();

  // last section readmore
    (function () {
    var btn = document.getElementById('backboneReadMoreBtn');
    var label = document.getElementById('backboneReadMoreLabel');
    var paragraph = document.getElementById('backboneFadeParagraph');
    if (!btn || !paragraph) return;
 
    btn.addEventListener('click', function () {
      var expanded = paragraph.classList.toggle('is-expanded');
      btn.classList.toggle('is-expanded', expanded);
      btn.setAttribute('aria-expanded', String(expanded));
      label.textContent = expanded ? 'Read Less' : 'Read More';
    });
  })();

  

  /* ---------------------------------------
   CTA BANNER — background image parallax
--------------------------------------- */
(function () {
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    return; // bail out cleanly instead of referencing an undefined external variable
  }

  var mmCta = gsap.matchMedia();

  mmCta.add('all', function () {
    var section = document.querySelector('.daily-pour-cta-section');
    if (!section) return;

    var bg = section.querySelector('.dp-cta-bg');
    if (!bg) return;

    var tween = gsap.fromTo(
      bg,
      { yPercent: -10 },
      {
        yPercent: 10,
        ease: 'none',
        force3D: true,
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
          invalidateOnRefresh: true,
        },
      }
    );

    return function () {
      if (tween.scrollTrigger) tween.scrollTrigger.kill();
      tween.kill();
      gsap.set(bg, { clearProps: 'transform' });
    };
  });
})();