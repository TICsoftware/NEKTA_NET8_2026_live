  (function () {
    var btn = document.getElementById('dpReadMoreBtn');
    var label = document.getElementById('dpReadMoreLabel');
    var paragraph = document.getElementById('dpFadeParagraph');
    var img = document.querySelector('.daily-pour-section .dp-image-wrap');
    var text = document.querySelector('.daily-pour-section .dp-text-block');

    function centerTextBesideImage() {
      if (!img || !text) return;
      if (window.matchMedia('(max-width: 900px)').matches) {
        text.style.paddingTop = '';
        return;
      }
      if (paragraph && paragraph.classList.contains('is-expanded')) return;

      text.style.paddingTop = '0px';
      var offset = Math.max(0, Math.round((img.offsetHeight - text.offsetHeight) / 2));
      text.style.paddingTop = offset + 'px';
    }

    if (btn && paragraph) {
      btn.addEventListener('click', function () {
        var expanded = paragraph.classList.toggle('is-expanded');
        btn.classList.toggle('is-expanded', expanded);
        btn.setAttribute('aria-expanded', String(expanded));
        if (label) label.textContent = expanded ? 'Read Less' : 'Read More';
        if (!expanded) centerTextBesideImage();
      });
    }

    centerTextBesideImage();
    window.addEventListener('resize', centerTextBesideImage);

    var pic = img && img.querySelector('img');
    if (pic && !pic.complete) pic.addEventListener('load', centerTextBesideImage);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(centerTextBesideImage);
    }
  })();



// ------------------------SLIDER------------------------//
(function () {
  var track = document.getElementById('menuTrack');
  var prevBtn = document.getElementById('menuPrev');
  var nextBtn = document.getElementById('menuNext');
  var viewport = document.querySelector('.menu-slider-viewport');
  if (!track || !prevBtn || !nextBtn || !viewport) return;

  var cards = Array.prototype.slice.call(track.children);
  if (!cards.length) return;

  var index = 0;
  var pointerId = null;
  var startX = 0;
  var startY = 0;
  var startTranslate = 0;
  var tracking = false;
  var axisLocked = false;
  var horizontal = false;
  var blockClick = false;
  var SWIPE_THRESHOLD = 50;
  var AXIS_SLOP = 8;

  function cardStep() {
    var card = cards[0];
    var style = window.getComputedStyle(track);
    var gap = parseFloat(style.columnGap || style.gap) || 0;
    return card.getBoundingClientRect().width + gap;
  }

  function limits() {
    var step = cardStep();
    var trackWidth = track.scrollWidth;
    var viewportWidth = viewport.getBoundingClientRect().width;
    var maxScroll = Math.max(0, trackWidth - viewportWidth);
    // Ignore sub-pixel remainder so the next arrow disables when the last card is already flush.
    var maxIdx = step > 0 ? Math.max(0, Math.ceil((maxScroll - 1) / step)) : 0;
    return { step: step, maxScroll: maxScroll, maxIdx: maxIdx };
  }

  function currentTranslate(lim) {
    return Math.min(index * lim.step, lim.maxScroll);
  }

  function update() {
    var lim = limits();
    if (index > lim.maxIdx) index = lim.maxIdx;
    if (index < 0) index = 0;

    track.style.transform = 'translateX(-' + currentTranslate(lim) + 'px)';
    prevBtn.disabled = index <= 0;
    nextBtn.disabled = index >= lim.maxIdx;
    viewport.classList.toggle('is-swipeable', lim.maxScroll > 1);
  }

  function resistedTranslate(raw, maxScroll) {
    if (raw < 0) return raw * 0.28;
    if (raw > maxScroll) return maxScroll + (raw - maxScroll) * 0.28;
    return raw;
  }

  function onPointerDown(e) {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    if (tracking) return;

    var lim = limits();
    tracking = true;
    axisLocked = false;
    horizontal = false;
    pointerId = e.pointerId;
    startX = e.clientX;
    startY = e.clientY;
    startTranslate = currentTranslate(lim);

    if (e.pointerType === 'mouse') {
      viewport.setPointerCapture(e.pointerId);
    }
  }

  function onPointerMove(e) {
    if (!tracking || e.pointerId !== pointerId) return;

    var dx = e.clientX - startX;
    var dy = e.clientY - startY;

    if (!axisLocked) {
      if (Math.abs(dx) < AXIS_SLOP && Math.abs(dy) < AXIS_SLOP) return;
      axisLocked = true;
      horizontal = Math.abs(dx) >= Math.abs(dy);
      if (!horizontal) {
        tracking = false;
        return;
      }
      track.classList.add('is-dragging');
      viewport.classList.add('is-dragging');
      if (viewport.setPointerCapture) {
        try { viewport.setPointerCapture(e.pointerId); } catch (err) {}
      }
    }

    if (!horizontal) return;
    if (e.cancelable) e.preventDefault();

    var lim = limits();
    var next = resistedTranslate(startTranslate - dx, lim.maxScroll);
    track.style.transform = 'translateX(-' + next + 'px)';
  }

  function finish(e) {
    if (!tracking || e.pointerId !== pointerId) return;

    var dx = e.clientX - startX;
    var wasHorizontal = horizontal;
    tracking = false;
    horizontal = false;
    axisLocked = false;
    viewport.classList.remove('is-dragging');

    if (wasHorizontal && Math.abs(dx) > AXIS_SLOP) blockClick = true;

    if (wasHorizontal) {
      if (dx <= -SWIPE_THRESHOLD) index += 1;
      else if (dx >= SWIPE_THRESHOLD) index -= 1;
      track.classList.remove('is-dragging');
      void track.offsetWidth;
    }

    update();
  }

  prevBtn.addEventListener('click', function () {
    index -= 1;
    update();
  });

  nextBtn.addEventListener('click', function () {
    index += 1;
    update();
  });

  viewport.addEventListener('pointerdown', onPointerDown);
  viewport.addEventListener('pointermove', onPointerMove, { passive: false });
  viewport.addEventListener('pointerup', finish);
  viewport.addEventListener('pointercancel', finish);
  viewport.addEventListener('dragstart', function (e) { e.preventDefault(); });
  viewport.addEventListener('click', function (e) {
    if (!blockClick) return;
    e.preventDefault();
    e.stopPropagation();
    blockClick = false;
  }, true);

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

    var pointerId = null;
    var startX = 0;
    var startY = 0;
    var startTranslate = 0;
    var tracking = false;
    var axisLocked = false;
    var horizontal = false;
    var blockClick = false;
    var SWIPE_THRESHOLD = 50;
    var AXIS_SLOP = 8;

    function translateFor(index) {
      var slide = slides[index];
      var viewportWidth = viewport.getBoundingClientRect().width;
      var slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
      return viewportWidth / 2 - slideCenter;
    }

    function readTranslate() {
      var value = window.getComputedStyle(track).transform;
      if (!value || value === 'none') return translateFor(currentIndex);
      var match = value.match(/matrix\(([^)]+)\)/);
      if (!match) return translateFor(currentIndex);
      var parts = match[1].split(',');
      var x = parseFloat(parts[4]);
      return isNaN(x) ? translateFor(currentIndex) : x;
    }

    function resistedTranslate(raw) {
      var maxT = translateFor(0);
      var minT = translateFor(total - 1);
      if (raw > maxT) return maxT + (raw - maxT) * 0.28;
      if (raw < minT) return minT + (raw - minT) * 0.28;
      return raw;
    }

    function onPointerDown(e) {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      if (tracking) return;

      tracking = true;
      axisLocked = false;
      horizontal = false;
      pointerId = e.pointerId;
      startX = e.clientX;
      startY = e.clientY;
      startTranslate = readTranslate();

      if (e.pointerType === 'mouse') {
        try { viewport.setPointerCapture(e.pointerId); } catch (err) {}
      }
    }

    function onPointerMove(e) {
      if (!tracking || e.pointerId !== pointerId) return;

      var dx = e.clientX - startX;
      var dy = e.clientY - startY;

      if (!axisLocked) {
        if (Math.abs(dx) < AXIS_SLOP && Math.abs(dy) < AXIS_SLOP) return;
        axisLocked = true;
        horizontal = Math.abs(dx) >= Math.abs(dy);
        if (!horizontal) {
          tracking = false;
          return;
        }
        var visual = readTranslate();
        startTranslate = visual - dx;
        track.classList.add('is-dragging');
        viewport.classList.add('is-dragging');
        track.style.transition = 'none';
        try { viewport.setPointerCapture(e.pointerId); } catch (err) {}
      }

      if (!horizontal) return;
      if (e.cancelable) e.preventDefault();

      track.style.transform = 'translateX(' + resistedTranslate(startTranslate + dx) + 'px)';
    }

    function finish(e) {
      if (!tracking || e.pointerId !== pointerId) return;

      var dx = e.clientX - startX;
      var wasHorizontal = horizontal;
      tracking = false;
      horizontal = false;
      axisLocked = false;
      viewport.classList.remove('is-dragging');

      if (wasHorizontal && Math.abs(dx) > AXIS_SLOP) blockClick = true;

      if (wasHorizontal) {
        if (dx <= -SWIPE_THRESHOLD) currentIndex += 1;
        else if (dx >= SWIPE_THRESHOLD) currentIndex -= 1;
        track.classList.remove('is-dragging');
        track.style.transition = '';
        void track.offsetWidth;
      }

      update();
    }

    viewport.classList.toggle('is-swipeable', total > 1);
    viewport.addEventListener('pointerdown', onPointerDown);
    viewport.addEventListener('pointermove', onPointerMove, { passive: false });
    viewport.addEventListener('pointerup', finish);
    viewport.addEventListener('pointercancel', finish);
    viewport.addEventListener('dragstart', function (e) { e.preventDefault(); });
    viewport.addEventListener('click', function (e) {
      if (!blockClick) return;
      e.preventDefault();
      e.stopPropagation();
      blockClick = false;
    }, true);
 
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

/* ---------------------------------------
   Deco images — smooth scroll drift
   Tweens a CSS variable only, so rotate and
   existing transforms stay in place.
--------------------------------------- */
(function () {
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    return;
  }

  function drift(el, trigger, from, to) {
    if (!el || !trigger) return null;

    return gsap.fromTo(el, { '--deco-shift': from }, {
      '--deco-shift': to,
      ease: 'none',
      scrollTrigger: {
        trigger: trigger,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.7,
        invalidateOnRefresh: true,
      },
    });
  }

  function killTweens(tweens) {
    tweens.forEach(function (tween) {
      if (tween.scrollTrigger) tween.scrollTrigger.kill();
      tween.kill();
    });
  }

  function clearShift(selector) {
    document.querySelectorAll(selector).forEach(function (el) {
      el.style.removeProperty('--deco-shift');
    });
  }

  var mmDeco = gsap.matchMedia();

  mmDeco.add('(min-width: 561px)', function () {
    var tweens = [];

    document.querySelectorAll('.daily-pour-section').forEach(function (section) {
      var left = drift(section.querySelector('.dp-deco-left'), section, '-18px', '26px');
      var right = drift(section.querySelector('.dp-deco-right'), section, '14px', '-22px');
      if (left) tweens.push(left);
      if (right) tweens.push(right);
    });

    return function () {
      killTweens(tweens);
      clearShift('.dp-deco-left, .dp-deco-right');
    };
  });

  mmDeco.add('(min-width: 421px)', function () {
    var tweens = [];

    document.querySelectorAll('.dpq-banner').forEach(function (banner) {
      var left = drift(banner.querySelector('.dpq-deco-left'), banner, '12px', '-14px');
      var right = drift(banner.querySelector('.dpq-deco-right'), banner, '-12px', '14px');
      if (left) tweens.push(left);
      if (right) tweens.push(right);
    });

    return function () {
      killTweens(tweens);
      clearShift('.dpq-deco-left, .dpq-deco-right');
    };
  });

  mmDeco.add('all', function () {
    var tweens = [];

    document.querySelectorAll('.belongs-section').forEach(function (section) {
      var splash = drift(section.querySelector('.belongs-bg-corner'), section, '-16px', '20px');
      if (splash) tweens.push(splash);
    });

    document.querySelectorAll('.daily-pour-cta-section').forEach(function (section) {
      var cup = drift(section.querySelector('.dp-cta-deco-right'), section, '10px', '-16px');
      if (cup) tweens.push(cup);
    });

    return function () {
      killTweens(tweens);
      clearShift('.belongs-bg-corner, .dp-cta-deco-right');
    };
  });
})();