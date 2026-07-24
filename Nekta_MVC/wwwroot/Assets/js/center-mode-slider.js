(function () {
    function initCenterModeSlider() {
        if (typeof Swiper === "undefined") return;

        const sliderRoot = document.querySelector(".edgeSwiper");
        if (!sliderRoot) return;

        const qsa = (selector, scope = document) => [
            ...scope.querySelectorAll(selector),
        ];
        const qs = (selector, scope = document) => scope.querySelector(selector);
        const navContainer = qs(".edge-nav-arrows");
        const prevControl = navContainer
            ? qs(".edge-swiper-prev", navContainer)
            : null;
        const nextControl = navContainer
            ? qs(".edge-swiper-next", navContainer)
            : null;

        const wrapperEl = qs(".swiper-wrapper", sliderRoot);
        let realSlideCount = qsa(".swiper-slide", sliderRoot).length;

        const MIN_REAL_SLIDES = 6;
        if (wrapperEl && realSlideCount > 0 && realSlideCount < MIN_REAL_SLIDES) {
            const originalSlides = qsa(".swiper-slide", sliderRoot);
            let i = 0;
            while (realSlideCount < MIN_REAL_SLIDES) {
                const clone = originalSlides[i % originalSlides.length].cloneNode(true);
                clone.setAttribute("data-duplicated", "true");
                wrapperEl.appendChild(clone);
                realSlideCount++;
                i++;
            }
        }

        const neededClones = Math.max(realSlideCount + 6, 9);

const edgeSwiper = new Swiper(".edgeSwiper", {
    slidesPerView: 1,
    centeredSlides: true,
    spaceBetween: 0,

    loop: true,
    rewind: false,
    slidesPerGroup: 1,

    watchOverflow: false,
    speed: 700,

    breakpoints: {
        290: {
            slidesPerView: 1.1,
            centeredSlides: true,
            spaceBetween: 2,
        },
        768: {
            slidesPerView: 2.6,
            centeredSlides: true,
            spaceBetween: 30,
        },
    },

    navigation: {
        nextEl: ".edge-swiper-next",
        prevEl: ".edge-swiper-prev",
    },

    on: {
        init(swiper) {
            swiper.update();
        },
    },
});

        // Hide per-card arrow controls; keep only .edge-nav-arrows controls.
        qsa(".edgeArrow", sliderRoot).forEach((item) =>
            item.classList.add("hidden"),
        );

        prevControl?.addEventListener("click", () => edgeSwiper.slidePrev());
        nextControl?.addEventListener("click", () => edgeSwiper.slideNext());
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initCenterModeSlider, {
            once: true,
        });
    } else {
        initCenterModeSlider();
    }
})();