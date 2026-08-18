gsap.registerPlugin(ScrollTrigger);

window.addEventListener("load", function () {
  function leafTravel(section, leaf) {
    var padBottom = 28;
    var gapAfterTitle = 20;
    var sectionRect = section.getBoundingClientRect();
    var leafH = leaf.offsetHeight || 80;
    var title = section.querySelector(".title-section");

    var startY = 16;
    if (title) {
      startY = Math.max(
        startY,
        title.getBoundingClientRect().bottom - sectionRect.top + gapAfterTitle
      );
    }

    var endY = section.offsetHeight - leafH - padBottom;
    if (endY < startY + 48) endY = startY + 48;

    return { startY: startY, endY: endY };
  }

  document.querySelectorAll(".bc-experience-section").forEach(function (section) {
    var leaf = section.querySelector(".bc-leaf-deco");
    if (!leaf) return;

    var tween;

    function build() {
      if (tween) {
        if (tween.scrollTrigger) tween.scrollTrigger.kill();
        tween.kill();
      }

      var range = leafTravel(section, leaf);

      tween = gsap.fromTo(
        leaf,
        { y: range.startY, x: 0, rotation: 16, transformOrigin: "50% 50%" },
        {
          y: range.endY,
          x: 0,
          rotation: 0,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 55%",
            end: "bottom 22%",
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
        }
      );
    }

    if (leaf.complete) {
      build();
    } else {
      leaf.addEventListener("load", build, { once: true });
      build();
    }

    var resizeTimer;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        build();
        ScrollTrigger.refresh();
      }, 150);
    });
  });

  ScrollTrigger.refresh();
});
