gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", function () {
  const wrapper = document.querySelector(".ld-leaf-wrapper");
  const leaf = document.querySelector(".leaf-travel-anim");
  const waypoints = wrapper
    ? Array.from(wrapper.querySelectorAll(".ld-leaf-waypoint"))
    : [];

  if (!wrapper || !leaf || !waypoints.length) return;

  let timeline;

  function build() {
    if (timeline) {
      if (timeline.scrollTrigger) timeline.scrollTrigger.kill();
      timeline.kill();
    }

    gsap.set(leaf, { clearProps: "left,top,right,x,y,rotation,transform" });

    const wrapW = wrapper.getBoundingClientRect().width;
    if (wrapW < 250) return;

    const originX = leaf.offsetLeft;
    const originY = leaf.offsetTop;
    const leafW = leaf.offsetWidth || 135;
    const yPad = window.innerWidth < 768 ? 24 : 64;
    const last = waypoints[waypoints.length - 1];

    gsap.set(leaf, {
      x: 0,
      y: 0,
      rotation: 0,
      transformOrigin: "50% 50%",
    });

    timeline = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: wrapper,
        start: "top 75%",
        endTrigger: last,
        end: "top 35%",
        scrub: 1.4,
        invalidateOnRefresh: true,
      },
    });

    timeline.to(leaf, {
      x: 0,
      y: 0,
      rotation: 0,
      duration: Math.max(400, waypoints[0].offsetHeight * 0.7),
    });

    for (let i = 1; i < waypoints.length; i++) {
      const section = waypoints[i];
      const xPct = parseFloat(section.dataset.leafX);
      const rotation = parseFloat(section.dataset.leafRotation) || 0;
      const targetX = wrapW * (xPct / 100) - leafW / 2;
      const targetY = section.offsetTop + yPad;

      timeline.to(leaf, {
        x: targetX - originX,
        y: targetY - originY,
        rotation: rotation,
        duration: Math.max(400, section.offsetTop - waypoints[i - 1].offsetTop),
      });
    }
  }

  build();

  window.addEventListener("load", function () {
    build();
    ScrollTrigger.refresh();
  });

  var resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      build();
      ScrollTrigger.refresh();
    }, 150);
  });
});
