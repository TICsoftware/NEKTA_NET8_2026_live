document.addEventListener("DOMContentLoaded", function () {
// ==================== BUSINESS & CORPORATES PAGE ====================
// Plate roation animation
gsap.to(".bc-plate-img", {
    rotation: -120,
    scale: 1.05,
    y: -20,
    ease: "none",
    scrollTrigger: {
        trigger: ".bc-experience-section",
        start: "top 85%",
        end: "bottom 15%",
        scrub: 2
    }
});

gsap.to(".bc-plate-wrap", {
    ease: "none",
    keyframes: {
        "0%":   { "--rot": "-120deg",    "--scale": 1,    "--y": "0px" },
        "50%":  { "--rot": "0deg", "--scale": 1, "--y": "0px" },
        "100%": { "--rot": "0deg",    "--scale": 1,    "--y": "0px" }
    },
    scrollTrigger: {
        trigger: ".bc-experience-section",
        start: "top 85%",
        end: "bottom 15%",
        scrub: 2
    }
});
// half circle bg animation

document.querySelectorAll('.bc-experience-section').forEach((wrapper) => {
    const deco = wrapper.querySelector('.bc-deco');
    const plateMini = wrapper.querySelector('.bc-plate-mini');

    gsap.to(deco, {
        y: -12,
        rotate: '+=5',
        duration: 2.8,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true
    });

    gsap.to(plateMini, {
        y: -10,
        rotate: '-=6',
        duration: 3.2,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: 0.25
    });
});


// curve — drawn in the section's real pixel size so the arc is not stretched
function buildPath(W, H, curveAmount, topY) {
  if (curveAmount <= 0) {
    return "M0," + topY + " L" + W + "," + topY +
           " L" + W + "," + H + " L0," + H + " Z";
  }

  var halfW = W / 2;
  var s = curveAmount;
  var r = (halfW * halfW + s * s) / (2 * s);

  return (
    "M0," + topY +
    " A" + r + "," + r + " 0 0,1 " + W + "," + topY +
    " L" + W + "," + H +
    " L0," + H +
    " Z"
  );
}

function setupCurveReveal(path, designedCurve) {
  var svg = path.closest("svg");
  var wrap = path.closest(".curveshape-wrap");
  if (!wrap || !svg) {
    console.warn("setupCurveReveal: no .curveshape-wrap ancestor found", path);
    return;
  }

  var DESIGN_WIDTH = 1000;
  var PAD = 4;
  var W = DESIGN_WIDTH;
  var H = 400;
  var maxCurve = designedCurve;
  var topY = designedCurve + PAD;
  var state = { t: 0 };

  function measure() {
    var box = wrap.getBoundingClientRect();
    W = Math.max(1, Math.round(box.width));
    H = Math.max(1, Math.round(box.height));
    maxCurve = Math.min(designedCurve * (W / DESIGN_WIDTH), H * 0.35);
    topY = Math.ceil(maxCurve) + PAD;
    svg.setAttribute("viewBox", "0 0 " + W + " " + H);
    svg.setAttribute("preserveAspectRatio", "none");
  }

  function render() {
    path.setAttribute("d", buildPath(W, H, state.t * maxCurve, topY));
  }

  function sync() {
    measure();
    render();
  }

  sync();

  var tween = gsap.to(state, {
    t: 1,
    ease: "power2.inOut",
    duration: 1,
    paused: true,
    onUpdate: render
  });

  ScrollTrigger.create({
    trigger: wrap,
    start: "top 80%",
    end: "bottom 20%",
    onEnter: function () { tween.play(); },
    onLeave: function () { tween.reverse(); },
    onEnterBack: function () { tween.play(); },
    onLeaveBack: function () { tween.reverse(); }
  });

  var resizeTimer;
  function scheduleSync() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(sync, 80);
  }

  window.addEventListener("resize", scheduleSync);
  if (typeof ResizeObserver !== "undefined") {
    new ResizeObserver(scheduleSync).observe(wrap);
  }
}

document.querySelectorAll(".curvePath").forEach(function (path) {
  var maxCurve = parseFloat(path.dataset.maxCurve) || 140;
  setupCurveReveal(path, maxCurve);
});



document.querySelectorAll('.outer-polaroids-icons').forEach((wrapper) => {
    const left = wrapper.querySelector('.bc-polaroid--left');
    const right = wrapper.querySelector('.bc-polaroid--right');
    const chili = wrapper.querySelector('.bc-dining-deco--chili');
    const basil = wrapper.querySelector('.bc-dining-deco--basil');

    // starting positions
    gsap.set(left, { xPercent: -30, opacity: 0, rotate: -6 });
    gsap.set(right, { xPercent: 30, opacity: 0, rotate: 6 });
    gsap.set(chili, { y: -20, opacity: 0, rotate: -15 });
    gsap.set(basil, { y: -20, opacity: 0, rotate: 15 });

    // idle float loops — created paused, played once merge finishes
    const floatLeft = gsap.to(left, {
        y: -10,
        duration: 2.2,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        paused: true
    });

    const floatRight = gsap.to(right, {
        y: -14,
        duration: 2.6,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        paused: true,
        delay: 0.3
    });

    const floatChili = gsap.to(chili, {
        y: -8,
        rotate: '+=6',
        duration: 3,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        paused: true
    });

    const floatBasil = gsap.to(basil, {
        y: -8,
        rotate: '-=6',
        duration: 3.4,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        paused: true,
        delay: 0.2
    });

    gsap.timeline({
        scrollTrigger: {
            trigger: wrapper,
            start: 'top 80%',
            end: 'top 40%',
            toggleActions: 'play none none reverse',
        },
        onComplete: () => {
            floatLeft.play();
            floatRight.play();
            floatChili.play();
            floatBasil.play();
        },
        onReverseComplete: () => {
            floatLeft.pause(0);
            floatRight.pause(0);
            floatChili.pause(0);
            floatBasil.pause(0);
        }
    })
    .to(left, { xPercent: 0, opacity: 1, rotate: -3, duration: 1, ease: 'power3.out' })
    .to(right, { xPercent: 0, opacity: 1, rotate: 3, duration: 1, ease: 'power3.out' }, '<0.15')
    .to(chili, { y: 0, opacity: 1, rotate: 0, duration: 0.8, ease: 'power2.out' }, '<0.1')
    .to(basil, { y: 0, opacity: 1, rotate: 0, duration: 0.8, ease: 'power2.out' }, '<0.1');
});



});

// Nekta edge center focued slider chanages
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-slider]').forEach(function (slider) {
        const track = slider.querySelector('.bc-arch-track');
        const viewport = slider.querySelector('.bc-arch-viewport');
        const cards = Array.from(track.children);
        const prevBtn = slider.querySelector('.bc-arch-prev');
        const nextBtn = slider.querySelector('.bc-arch-next');
        const dotsWrap = slider.querySelector('.bc-arch-dots');

        let currentIndex = 0;
        let cardsPerView = 4;
        let maxIndex = 0;

        function getCardsPerView() {
            const w = window.innerWidth;
            if (w <= 640) return 1;
            if (w <= 1024) return 2;
            return 4;
        }

        function buildDots() {
            dotsWrap.innerHTML = '';
            for (let i = 0; i <= maxIndex; i++) {
                const dot = document.createElement('button');
                dot.type = 'button';
                dot.addEventListener('click', () => goTo(i));
                dotsWrap.appendChild(dot);
            }
            updateDots();
        }

        function updateDots() {
            Array.from(dotsWrap.children).forEach((d, i) => {
                d.classList.toggle('active', i === currentIndex);
            });
        }

        function updateNav() {
            prevBtn.disabled = currentIndex === 0;
            nextBtn.disabled = currentIndex === maxIndex;
        }

        function update() {
            cardsPerView = getCardsPerView();
            maxIndex = Math.max(0, cards.length - cardsPerView);
            currentIndex = Math.min(currentIndex, maxIndex);

            const cardWidth = cards[0].getBoundingClientRect().width;
            const gap = parseFloat(getComputedStyle(track).gap) || 0;
            const offset = currentIndex * (cardWidth + gap);

            track.style.transform = `translateX(-${offset}px)`;
            buildDots();
            updateNav();
        }

        function goTo(index) {
            currentIndex = Math.min(Math.max(index, 0), maxIndex);
            update();
        }

        prevBtn.addEventListener('click', () => goTo(currentIndex - 1));
        nextBtn.addEventListener('click', () => goTo(currentIndex + 1));

        // touch/swipe support
        let startX = 0;
        let isDragging = false;

        viewport.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
        }, { passive: true });

        viewport.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            const diff = e.changedTouches[0].clientX - startX;
            if (Math.abs(diff) > 40) {
                diff < 0 ? goTo(currentIndex + 1) : goTo(currentIndex - 1);
            }
            isDragging = false;
        });

        window.addEventListener('resize', update);
        update();
    });



 // ==================== NEKTA EDGE POPUP (shared, built once) ==================== //

let edgeModal = null;

function getEdgeModal() {
    if (edgeModal) return edgeModal;

    const el = document.createElement('div');
    el.className = 'bc-edge-modal';
    el.setAttribute('aria-hidden', 'true');
    el.innerHTML =
        '<div class="bc-edge-modal__backdrop" data-edge-close></div>' +
        '<div class="bc-edge-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="bcEdgeModalTitle" tabindex="-1">' +
            '<button type="button" class="bc-edge-modal__close" aria-label="Close" data-edge-close>&times;</button>' +
            '<div class="bc-edge-modal__media"><img alt="" /></div>' +
            '<div class="bc-edge-modal__body" data-lenis-prevent>' +
                '<h3 id="bcEdgeModalTitle" class="bc-edge-modal__title"></h3>' +
                '<div class="bc-edge-modal__content"></div>' +
            '</div>' +
        '</div>';
    document.body.appendChild(el);

    const dialog = el.querySelector('.bc-edge-modal__dialog');
    const media = el.querySelector('.bc-edge-modal__media');
    const img = media.querySelector('img');
    const title = el.querySelector('.bc-edge-modal__title');
    const content = el.querySelector('.bc-edge-modal__content');
    const body = el.querySelector('.bc-edge-modal__body');
    let lastFocus = null;

    function open(card) {
        const cardImg = card.querySelector('img');
        const cardTitle = card.querySelector('h3');
        const cardText = card.querySelector('.edge-content');

        if (cardImg && (cardImg.currentSrc || cardImg.src)) {
            img.src = cardImg.currentSrc || cardImg.src;
            img.alt = cardImg.getAttribute('alt') || '';
            media.style.display = '';
        } else {
            media.style.display = 'none';
        }

        title.textContent = cardTitle ? cardTitle.textContent.trim() : '';
        content.innerHTML = cardText ? cardText.innerHTML : '';
        body.scrollTop = 0;

        lastFocus = document.activeElement;
        el.classList.add('is-open');
        el.setAttribute('aria-hidden', 'false');
        document.documentElement.classList.add('bc-edge-modal-open');
        if (window.lenis && typeof window.lenis.stop === 'function') window.lenis.stop();

        setTimeout(() => dialog.focus(), 50);
    }

    function close() {
        if (!el.classList.contains('is-open')) return;
        el.classList.remove('is-open');
        el.setAttribute('aria-hidden', 'true');
        document.documentElement.classList.remove('bc-edge-modal-open');
        if (window.lenis && typeof window.lenis.start === 'function') window.lenis.start();
        if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
    }

    el.addEventListener('click', (e) => {
        if (e.target.closest('[data-edge-close]')) close();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') close();

        // keep Tab focus inside the popup
        if (e.key === 'Tab' && el.classList.contains('is-open')) {
            const focusables = dialog.querySelectorAll('button, a[href], [tabindex]:not([tabindex="-1"])');
            if (!focusables.length) return;
            const first = focusables[0];
            const last = focusables[focusables.length - 1];
            if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
            else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
    });

    edgeModal = { open, close };
    return edgeModal;
}


 // ==================== NEKTA EDGE – ARCH CARDS ==================== //
// Desktop / tablet : static cards, click opens the popup
// Mobile (<=767px) : swipe slider with prev / next, text shown in the centered card

document.querySelectorAll('[data-edge-grid]').forEach(function (wrap) {
    const modal = getEdgeModal();
    const grid = wrap.querySelector('.bc-edge-grid');
    const cards = Array.from(grid.querySelectorAll('.bc-edge-card'));
    const prevBtn = wrap.querySelector('.bc-edge-prev');
    const nextBtn = wrap.querySelector('.bc-edge-next');
    const mq = window.matchMedia('(max-width: 767px)');
    let activeIndex = 0;
    let ticking = false;

    if (!cards.length) return;

    function isMobile() { return mq.matches; }

    function setActive(i) {
        activeIndex = i;
        cards.forEach((c, idx) => c.classList.toggle('is-active', isMobile() && idx === i));
    }

    // card whose center is closest to the slider's center
    function findCenteredIndex() {
        const box = grid.getBoundingClientRect();
        const center = box.left + box.width / 2;
        let best = 0;
        let bestDist = Infinity;
        cards.forEach((c, idx) => {
            const r = c.getBoundingClientRect();
            const d = Math.abs(r.left + r.width / 2 - center);
            if (d < bestDist) { bestDist = d; best = idx; }
        });
        return best;
    }

    function scrollToCard(i, smooth = true) {
        const card = cards[i];
        const left = card.offsetLeft - (grid.clientWidth - card.offsetWidth) / 2;
        grid.scrollTo({ left: left, behavior: smooth ? 'smooth' : 'auto' });
        setActive(i);
    }

    function goTo(i) {
        const total = cards.length;
        scrollToCard((i + total) % total); // loops: last -> first, first -> last
    }

    if (prevBtn) prevBtn.addEventListener('click', () => goTo(activeIndex - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goTo(activeIndex + 1));

    // keep "active" in sync while the user swipes
    grid.addEventListener('scroll', function () {
        if (!isMobile() || ticking) return;
        ticking = true;
        requestAnimationFrame(function () {
            setActive(findCenteredIndex());
            ticking = false;
        });
    }, { passive: true });

    cards.forEach(function (card, idx) {
        function handle(e) {
            e.preventDefault();
            // mobile: a side card slides to the center first;
            // the centered card (and every card on desktop) opens the popup
            if (isMobile() && idx !== activeIndex) {
                scrollToCard(idx);
                return;
            }
            modal.open(card);
        }

        card.addEventListener('click', handle);
        card.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') handle(e);
        });
    });

    function onModeChange() {
        if (isMobile()) {
            scrollToCard(activeIndex, false);
        } else {
            grid.scrollLeft = 0;
            setActive(activeIndex); // clears is-active on desktop
        }
    }

    if (mq.addEventListener) mq.addEventListener('change', onModeChange);
    else mq.addListener(onModeChange);

    let resizeTimer;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            if (isMobile()) scrollToCard(activeIndex, false);
        }, 120);
    });

    onModeChange();
});


});