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


// curve — topY must be >= maxCurve so the upward arc stays inside the viewBox
function buildPath(W, H, curveAmount, topY) {
  if (curveAmount <= 0) {
    return "M0," + topY + " L" + W + "," + topY +
           " L" + W + "," + H + " L0," + H + " Z";
  }

  var halfW = W / 2;
  var s = curveAmount;
  var r = (halfW * halfW + s * s) / (2 * s); // radius from chord + sagitta

  // sweep-flag 1 keeps the original upward mound (peak toward y=0)
  return (
    "M0," + topY +
    " A" + r + "," + r + " 0 0,1 " + W + "," + topY +
    " L" + W + "," + H +
    " L0," + H +
    " Z"
  );
}

function setupCurveReveal(path, maxCurve) {
  var W = 1000, H = 400;
  // Chord sits at maxCurve (+ pad) so the peak lands just inside y=0, never clipped
  var topY = Math.ceil(maxCurve) + 4;
  var state = { curve: 0 };

  function render() {
    path.setAttribute("d", buildPath(W, H, state.curve, topY));
  }
  render();

  var tween = gsap.to(state, {
    curve: maxCurve,
    ease: "power2.inOut",
    duration: 1,
    paused: true,
    onUpdate: render
  });

  var wrap = path.closest(".curveshape-wrap");
  if (!wrap) {
    console.warn("setupCurveReveal: no .curveshape-wrap ancestor found", path);
    return;
  }

  ScrollTrigger.create({
    trigger: wrap,
    start: "top 80%",
    end: "bottom 20%",
    onEnter: function () { tween.play(); },
    onLeave: function () { tween.reverse(); },
    onEnterBack: function () { tween.play(); },
    onLeaveBack: function () { tween.reverse(); }
  });
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





    // nekta edgenewslider
document.querySelectorAll('[data-center-slider]').forEach(function (slider) {
    const viewport = slider.querySelector('.bc-arch-viewport');
    const track = slider.querySelector('.bc-arch-track');
    const prevBtn = slider.querySelector('.bc-arch-prev');
    const nextBtn = slider.querySelector('.bc-arch-next');
    const dotsWrap = slider.querySelector('.bc-arch-dots');

    const realCards = Array.from(track.children);
    const realCount = realCards.length;
    const GAP = 24;

    // These MUST mirror your CSS values exactly — update both together if you change sizes
function getSizes() {
    const isMobile = window.innerWidth <= 640;
    if (isMobile) {
        const vw = viewport.getBoundingClientRect().width;
        return { base: vw, active: vw, gap: 0 };
    }
    return { base: 260, active: 600, gap: GAP };
}

    const cardWidth = realCards[0].offsetWidth || 260;
    const gap = parseFloat(getComputedStyle(track).gap) || 24;
    const viewportWidth = viewport.getBoundingClientRect().width;
    const peekCount = Math.max(2, Math.ceil((viewportWidth / 2) / (cardWidth + gap)) + 1);

    const clonesStart = realCards.slice(-peekCount).map(c => {
        const clone = c.cloneNode(true);
        clone.classList.add('is-clone');
        return clone;
    });
    const clonesEnd = realCards.slice(0, peekCount).map(c => {
        const clone = c.cloneNode(true);
        clone.classList.add('is-clone');
        return clone;
    });

    clonesStart.forEach(c => track.insertBefore(c, track.firstChild));
    clonesEnd.forEach(c => track.appendChild(c));

    const cards = Array.from(track.children);
    const offset = clonesStart.length;

    let activeIndex = 0;

    function renderedIndex(i) { return i + offset; }

    function centerTrack(withTransition = true) {
        track.style.transition = withTransition
            ? 'transform 0.35s cubic-bezier(0.65, 0, 0.35, 1)'
            : 'none';

        const sizes = getSizes();
        const vw = viewport.getBoundingClientRect().width;
        const rIndex = renderedIndex(activeIndex);

        // Use KNOWN target width, not offsetWidth (which lies mid-transition)
        const activeWidth = sizes.active;

        let offsetToCard = 0;
        for (let i = 0; i < rIndex; i++) {
            offsetToCard += sizes.base + sizes.gap;
        }

        const centerOffset = (vw / 2) - (activeWidth / 2);
        track.style.transform = `translateX(${centerOffset - offsetToCard}px)`;
    }

function updateClasses(withTransition = true) {
    const rIndex = renderedIndex(activeIndex);
    cards.forEach((card, i) => {
        const wasActive = card.classList.contains('is-active');
        const willBeActive = (i === rIndex);

        if (wasActive && !willBeActive) {
            card.classList.remove('content-ready');
        }

        card.classList.remove('is-active', 'is-adjacent');

        if (willBeActive) {
            card.classList.add('is-active');

            if (!withTransition) {
                card.classList.add('content-ready');
            } else if (!wasActive) {
                const onResizeDone = (e) => {
                    if (e.propertyName === 'min-height' || e.propertyName === 'width') {
                        card.classList.add('content-ready');
                        card.removeEventListener('transitionend', onResizeDone);
                    }
                };
                card.addEventListener('transitionend', onResizeDone);
            }
        } else if (Math.abs(i - rIndex) === 1) {
            card.classList.add('is-adjacent');
        }
    });
}

function render(withTransition = true) {
    updateClasses(withTransition);
    centerTrack(withTransition);
    updateDots();
}

    function buildDots() {
        dotsWrap.innerHTML = '';
        realCards.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.type = 'button';
            dot.addEventListener('click', () => goTo(i));
            dotsWrap.appendChild(dot);
        });
        updateDots();
    }

    function updateDots() {
        Array.from(dotsWrap.children).forEach((d, i) => d.classList.toggle('active', i === activeIndex));
    }



    function goTo(index, withTransition = true) {
        activeIndex = (index + realCount) % realCount;
        render(withTransition);
    }

    prevBtn.addEventListener('click', () => goTo(activeIndex - 1));
    nextBtn.addEventListener('click', () => goTo(activeIndex + 1));

    cards.forEach((card) => {
        card.addEventListener('click', () => {
            const i = Number(card.dataset.index);
            if (!isNaN(i) && i !== activeIndex) goTo(i);
        });
    });

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => centerTrack(false), 100);
    });

    buildDots();
    render(false);
});


});
