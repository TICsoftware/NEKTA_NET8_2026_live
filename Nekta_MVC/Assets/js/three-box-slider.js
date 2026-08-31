/* ======================
   PREMIUM PLAYGROUND
====================== */
document.addEventListener("DOMContentLoaded", () => {
  const sliders = document.querySelectorAll(".three-box-slider");
  if (!sliders.length) return;

  const VISIBLE_DOTS = 3;

  function keepActiveDotVisible(swiper, instant) {
    const pagEl = swiper.pagination && swiper.pagination.el;
    if (!pagEl) return;

    const bullets = pagEl.querySelectorAll(".swiper-pagination-bullet");
    const active = pagEl.querySelector(".swiper-pagination-bullet-active");
    if (!active || !bullets.length) return;

    if (bullets.length <= VISIBLE_DOTS) {
      pagEl.scrollLeft = 0;
      return;
    }

    const i = Array.prototype.indexOf.call(bullets, active);
    let start = i - Math.floor(VISIBLE_DOTS / 2);
    const maxStart = bullets.length - VISIBLE_DOTS;
    if (start < 0) start = 0;
    if (start > maxStart) start = maxStart;

    const origin = bullets[0].offsetLeft;
    const target = bullets[start].offsetLeft - origin;
    if (typeof pagEl.scrollTo === "function") {
      pagEl.scrollTo({ left: target, behavior: instant ? "auto" : "smooth" });
    } else {
      pagEl.scrollLeft = target;
    }
  }

  function initSlider(el) {
    const paginationEl = el.querySelector(".swiper-pagination-custom");
    const nextEl = el.querySelector(".swiper-button-next-custom");
    const prevEl = el.querySelector(".swiper-button-prev-custom");

    return new Swiper(el, {
      slidesPerView: "auto",
      spaceBetween: 30,
      loop: true,
      watchOverflow: true,
      observer: false,
      observeParents: false,
      pagination: {
        el: paginationEl,
        clickable: true,
      },
      navigation: {
        nextEl: nextEl,
        prevEl: prevEl,
      },
      on: {
        afterInit: function (swiper) {
          keepActiveDotVisible(swiper, true);
        },
        slideChange: function (swiper) {
          keepActiveDotVisible(swiper);
        },
        resize: function (swiper) {
          keepActiveDotVisible(swiper, true);
        },
      },
    });
  }

  sliders.forEach(initSlider);

  const section = sliders[0];
  const cards = gsap.utils.toArray(".three-box-slider .swiper-slide");

  gsap.set(cards, {
    opacity: 0,
    y: 120,
    scale: 0.9,
    rotateX: 8,
    transformPerspective: 1000,
    transformOrigin: "center bottom",
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top 78%",
      toggleActions: "play none none reverse",
    },
  });

  tl.to(cards, {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    duration: 1.15,
    ease: "power4.out",
    stagger: {
      each: 0.22,
    },
  });
});
