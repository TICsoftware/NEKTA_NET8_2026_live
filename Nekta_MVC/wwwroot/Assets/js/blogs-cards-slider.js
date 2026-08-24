document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  function initSlider(slider) {
    const totalSlides = slider.querySelectorAll(".swiper-slide").length;
    const nav = slider.querySelector(".blogs-slider-nav");
    const nextEl = slider.querySelector(".blogs-next");
    const prevEl = slider.querySelector(".blogs-prev");

    new Swiper(slider, {
      slidesPerView: 1,
      spaceBetween: 20,
      centeredSlides: true,
      loop: totalSlides > 3,
      navigation: {
        nextEl,
        prevEl,
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
          centeredSlides: false,
          spaceBetween: 24,
        },
        1024: {
          slidesPerView: 3,
          centeredSlides: false,
          spaceBetween: 30,
        },
      },
    });

    if (!nav) return;

    function toggleNav() {
      if (window.innerWidth >= 1024) {
        nav.style.display = totalSlides > 3 ? "flex" : "none";
      } else {
        nav.style.display = totalSlides > 1 ? "flex" : "none";
      }
    }

    toggleNav();
    window.addEventListener("resize", toggleNav);
  }

  function initSliderAnimation(slider) {
    const cards = gsap.utils.toArray(slider.querySelectorAll(".swiper-slide"));
    if (!cards.length) return;

    gsap.set(cards, {
      opacity: 0,
      y: 120,
      scale: 0.9,
      rotateX: 8,
      transformPerspective: 1000,
      transformOrigin: "center bottom",
    });

    gsap.timeline({
      scrollTrigger: {
        trigger: slider,
        start: "top 78%",
        toggleActions: "play none none reverse",
      },
    }).to(cards, {
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
  }

  document.querySelectorAll(".blogs-cards-slider").forEach((slider) => {
    initSlider(slider);
    initSliderAnimation(slider);
  });
});
