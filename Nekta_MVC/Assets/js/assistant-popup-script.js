
function initContactModal() {
    const modal = document.querySelector("#contactModal");
    if (!modal) return;

    const panel = modal.querySelector(".modal-panel");

    const openButtons = document.querySelectorAll("[data-modal-open]");
    const closeButtons = modal.querySelectorAll("[data-modal-close]");

    let lastFocused = null;

    function openModal() {
        lastFocused = document.activeElement;

        modal.hidden = false;
        document.body.classList.add("modal-open");

        const scroller = modal.querySelector(".modal-scroll");
        if (scroller) scroller.scrollTop = 0;

        if (window.lenis) window.lenis.stop();

        if (window.gsap) {
            gsap.fromTo(
                panel,
                {
                    autoAlpha: 0,
                    x: 60,
                },
                {
                    autoAlpha: 1,
                    x: 0,
                    duration: 0.45,
                    ease: "power3.out",
                    onComplete: () => {
                        gsap.set(panel, { clearProps: "transform" });
                    },
                }
            );
        }

        requestAnimationFrame(() => panel.focus());

        renderHomeCaptcha();
    }

    function renderHomeCaptcha(attempts) {
        const el = document.getElementById("homeRecaptcha");
        if (!el) return;

        const remaining = attempts === undefined ? 50 : attempts;
        if (typeof grecaptcha === "undefined" || typeof grecaptcha.render !== "function") {
            if (remaining > 0) {
                setTimeout(() => renderHomeCaptcha(remaining - 1), 100);
            }
            return;
        }

        if (el.getAttribute("data-widget-id")) {
            try {
                grecaptcha.reset(Number(el.getAttribute("data-widget-id")));
            } catch (e) {
                // Widget not ready yet; ignore.
            }
            return;
        }

        const sitekey = el.getAttribute("data-sitekey");
        if (!sitekey) return;

        const widgetId = grecaptcha.render(el, { sitekey: sitekey });
        el.setAttribute("data-widget-id", String(widgetId));
    }

    function closeModal() {
        if (modal.hidden) return;

        const finish = () => {
            modal.hidden = true;
            document.body.classList.remove("modal-open");
            if (window.lenis) window.lenis.start();

            lastFocused?.focus();
        };

        if (window.gsap) {
            gsap.to(panel, {
                autoAlpha: 0,
                x: 60,
                duration: 0.25,
                ease: "power2.out",
                onComplete: () => {
                    gsap.set(panel, { clearProps: "all" });
                    finish();
                },
            });
        } else {
            finish();
        }
    }

    openButtons.forEach((button) => {
        button.addEventListener("click", openModal);
    });

    closeButtons.forEach((button) => {
        button.addEventListener("click", closeModal);
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeModal();
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    initContactModal();
});
