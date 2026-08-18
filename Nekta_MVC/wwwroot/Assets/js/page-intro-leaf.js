gsap.registerPlugin(ScrollTrigger);

window.addEventListener("load", function () {
  document.querySelectorAll(".bc-experience-section").forEach(function (section) {
    var leaf = section.querySelector(".bc-leaf-deco");
    if (!leaf) return;

    gsap.set(leaf, {
      y: 0,
      x: 0,
      rotation: 22,
      transformOrigin: "50% 50%",
    });

    gsap.to(leaf, {
      y: 450,
      x: 20,
      rotation: 0,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: section,
        start: "top 40%",
        end: "bottom 20%",
        toggleActions: "restart none none reverse",
        invalidateOnRefresh: true,
      },
    });
  });

  ScrollTrigger.refresh();
});
