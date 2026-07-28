gsap.registerPlugin(ScrollTrigger);

gsap.fromTo(
    ".bc-arch-center .bc-arch-card",
    {
        y: 80,
        opacity: 0,
        scale: 0.9
    },
    {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
        stagger: {
            each: 0.12,
            from: "center"
        },
        scrollTrigger: {
            trigger: ".bc-edge-section",
            start: "top 70%",
            once: true
        }
    }
);