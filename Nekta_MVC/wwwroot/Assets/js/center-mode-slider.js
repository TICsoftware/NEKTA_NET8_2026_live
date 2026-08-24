(function () {
    function initOneCenterModeSlider(sliderRoot) {
        if (!sliderRoot || sliderRoot.dataset.edgeSwiperReady === "1") return;
        if (typeof Swiper === "undefined") return;

        const qsa = (selector, scope = document) => [
            ...scope.querySelectorAll(selector),
        ];
        const qs = (selector, scope = document) => scope.querySelector(selector);

        // Prefer arrows inside this slider section so multiple edge swipers
        // on one page don't share the wrong controls.
        const section =
            sliderRoot.closest("section") || sliderRoot.parentElement || document;
        const navContainer =
            qs(".edge-nav-arrows", sliderRoot) ||
            qs(".edge-nav-arrows", section);
        const prevControl = navContainer
            ? qs(".edge-swiper-prev", navContainer)
            : null;
        const nextControl = navContainer
            ? qs(".edge-swiper-next", navContainer)
            : null;

        const placeNavArrows = () => {
            if (!navContainer) return;
            const swiperInst = sliderRoot.swiper;
            if (
                swiperInst &&
                (swiperInst.animating ||
                    sliderRoot.classList.contains("edge-swiper-jumping"))
            ) {
                return;
            }
            const img = qs(".swiper-slide-active .edge-card-image", sliderRoot);
            if (!img) return;
            const rootRect = sliderRoot.getBoundingClientRect();
            const imgRect = img.getBoundingClientRect();
            if (imgRect.height < 8 || imgRect.width < 8) return;
            const top = imgRect.top - rootRect.top + imgRect.height / 2;
            navContainer.style.setProperty("--edge-nav-top", `${top}px`);
            navContainer.style.setProperty("--edge-nav-width", `${imgRect.width}px`);
        };

        let placeNavRaf = 0;
        const schedulePlaceNav = () => {
            if (placeNavRaf) cancelAnimationFrame(placeNavRaf);
            placeNavRaf = requestAnimationFrame(() => {
                placeNavRaf = 0;
                placeNavArrows();
            });
        };

        const wrapperEl = qs(".swiper-wrapper", sliderRoot);
        const originalSlides = qsa(".swiper-slide", sliderRoot);
        const originalCount = originalSlides.length;

        if (!wrapperEl || originalCount === 0) return;

        // 3-set track: [copy][original][copy] — order always a,b,c,d,a,b,c,d...
        const enableManualLoop = originalCount > 1;
        if (enableManualLoop) {
            const cloneSlide = (slide) => {
                const clone = slide.cloneNode(true);
                clone.setAttribute("data-duplicated", "true");
                qsa("img", clone).forEach((img) => {
                    img.loading = "eager";
                    img.removeAttribute("loading");
                });
                return clone;
            };

            for (let i = originalCount - 1; i >= 0; i--) {
                wrapperEl.insertBefore(
                    cloneSlide(originalSlides[i]),
                    wrapperEl.firstChild,
                );
            }
            originalSlides.forEach((slide) => {
                wrapperEl.appendChild(cloneSlide(slide));
            });
        }

        const middleStart = enableManualLoop ? originalCount : 0;
        const middleEnd = enableManualLoop
            ? originalCount * 2 - 1
            : originalCount - 1;
        let jumping = false;
        let userInteracted = false;
        let directionArmed = false;

        const silentJump = (swiper, target) => {
            if (!enableManualLoop || jumping || !swiper) return false;
            const idx = swiper.activeIndex;
            if (
                target === idx ||
                target < 0 ||
                !swiper.slides ||
                target >= swiper.slides.length
            ) {
                return false;
            }

            jumping = true;
            sliderRoot.classList.add("edge-swiper-jumping");
            swiper.setTransition(0);

            const currentSlide = swiper.slides[idx];
            const targetSlide = swiper.slides[target];
            if (currentSlide && targetSlide) {
                const diff =
                    targetSlide.getBoundingClientRect().left -
                    currentSlide.getBoundingClientRect().left;
                swiper.setTranslate(swiper.getTranslate() - diff);
            } else {
                const from = swiper.slidesGrid[idx];
                const to = swiper.slidesGrid[target];
                if (typeof from === "number" && typeof to === "number") {
                    swiper.setTranslate(swiper.getTranslate() - (to - from));
                }
            }

            swiper.updateActiveIndex(target);
            swiper.updateSlidesClasses();

            if (swiper.touchEventsData) {
                const t = swiper.getTranslate();
                swiper.touchEventsData.startTranslate = t;
                swiper.touchEventsData.currentTranslate = t;
            }

            void wrapperEl.offsetWidth;
            sliderRoot.classList.remove("edge-swiper-jumping");
            jumping = false;
            return true;
        };

        const ensureLoopRoom = (swiper, direction) => {
            if (!enableManualLoop || jumping || !swiper) return;
            const idx = swiper.activeIndex;

            if (direction > 0 && idx >= middleEnd) {
                silentJump(swiper, idx - originalCount);
            } else if (direction < 0 && idx <= middleStart) {
                silentJump(swiper, idx + originalCount);
            }
        };

        const snapToMiddleSet = (swiper) => {
            if (!enableManualLoop || jumping || !swiper) return;
            const idx = swiper.activeIndex;
            let target = null;
            if (idx < originalCount) target = idx + originalCount;
            else if (idx >= originalCount * 2) target = idx - originalCount;
            if (target === null) return;
            silentJump(swiper, target);
        };

        // Pass the element (not ".edgeSwiper") so Swiper never returns an
        // array when the page has more than one center-mode slider.
        const edgeSwiper = new Swiper(sliderRoot, {
            slidesPerView: 1,
            centeredSlides: true,
            spaceBetween: 0,
            loop: false,
            rewind: false,
            slidesPerGroup: 1,
            watchOverflow: false,
            speed: 700,
            initialSlide: middleStart,
            allowTouchMove: true,
            navigation: false,

            breakpoints: {
                290: {
                    slidesPerView: 1.1,
                    centeredSlides: true,
                    spaceBetween: 2,
                },
                768: {
                    slidesPerView: 1.45,
                    centeredSlides: true,
                    spaceBetween: 16,
                },
                1200: {
                    slidesPerView: 2.6,
                    centeredSlides: true,
                    spaceBetween: 30,
                },
            },

            observer: true,
            observeParents: true,
            observeSlideChildren: true,

            on: {
                init(swiper) {
                    if (typeof swiper.update === "function") swiper.update();
                    schedulePlaceNav();
                    if (!enableManualLoop) {
                        return;
                    }

                    swiper.slideTo(middleStart, 0, false);
                    swiper.slides.forEach((slide) => {
                        slide.getBoundingClientRect();
                    });
                    qsa("img", wrapperEl).forEach((img) => {
                        if (typeof img.decode === "function") {
                            img.decode().catch(() => {});
                        }
                    });
                    schedulePlaceNav();
                },
                touchStart() {
                    userInteracted = true;
                    directionArmed = false;
                },
                sliderFirstMove(swiper) {
                    if (!enableManualLoop || directionArmed) return;
                    directionArmed = true;
                    userInteracted = true;
                    const diff =
                        (swiper.touches?.currentX ?? 0) -
                        (swiper.touches?.startX ?? 0);
                    if (Math.abs(diff) < 1) return;
                    ensureLoopRoom(swiper, diff < 0 ? 1 : -1);
                },
                slideChangeTransitionEnd(swiper) {
                    snapToMiddleSet(swiper);
                },
                transitionEnd(swiper) {
                    snapToMiddleSet(swiper);
                },
            },
        });

        // Guard: string selector + multiple matches returns an array in Swiper 14.
        if (!edgeSwiper || typeof edgeSwiper.slideNext !== "function") return;

        sliderRoot.dataset.edgeSwiperReady = "1";
        schedulePlaceNav();
        setTimeout(placeNavArrows, 750);

        qsa(".edgeArrow", sliderRoot).forEach((item) =>
            item.classList.add("hidden"),
        );

        const goNext = () => {
            userInteracted = true;
            ensureLoopRoom(edgeSwiper, 1);
            edgeSwiper.slideNext();
        };
        const goPrev = () => {
            userInteracted = true;
            ensureLoopRoom(edgeSwiper, -1);
            edgeSwiper.slidePrev();
        };

        nextControl?.addEventListener("click", goNext);
        prevControl?.addEventListener("click", goPrev);

        let resyncScheduled = false;
        const forceResync = () => {
            if (resyncScheduled) return;
            if (!edgeSwiper || edgeSwiper.destroyed) return;
            if (typeof edgeSwiper.update !== "function") return;
            resyncScheduled = true;
            requestAnimationFrame(() => {
                if (!edgeSwiper || edgeSwiper.destroyed) {
                    resyncScheduled = false;
                    return;
                }
                edgeSwiper.update();
                if (!userInteracted) {
                    edgeSwiper.slideTo(middleStart, 0, false);
                } else {
                    snapToMiddleSet(edgeSwiper);
                }
                if (!userInteracted) {
                    placeNavArrows();
                }
                resyncScheduled = false;
            });
        };

        qsa("img", wrapperEl).forEach((img) => {
            if (!img.complete) {
                img.addEventListener("load", forceResync, { once: true });
            }
        });
        window.addEventListener("load", forceResync, { once: true });
        window.addEventListener("resize", schedulePlaceNav);

        if (typeof ResizeObserver !== "undefined") {
            const firstImg = qs(".edge-card-image", sliderRoot);
            if (firstImg) {
                const ro = new ResizeObserver(schedulePlaceNav);
                ro.observe(firstImg);
            }
        }

        if (typeof IntersectionObserver !== "undefined") {
            const io = new IntersectionObserver(
                (entries, obs) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            forceResync();
                            obs.disconnect();
                        }
                    });
                },
                { threshold: 0.1 },
            );
            io.observe(sliderRoot);
        }
    }

    function initCenterModeSlider() {
        if (typeof Swiper === "undefined") return;
        document
            .querySelectorAll(".edgeSwiper")
            .forEach((el) => initOneCenterModeSlider(el));
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initCenterModeSlider, {
            once: true,
        });
    } else {
        initCenterModeSlider();
    }
})();
