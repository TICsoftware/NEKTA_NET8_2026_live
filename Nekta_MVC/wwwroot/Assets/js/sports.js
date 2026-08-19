// right side image animation
gsap.registerPlugin(ScrollTrigger);

window.addEventListener('load', () => {
   const intro = document.querySelector('.bc-experience-section');
   if (intro) {
      const media = intro.querySelector('.nourish-media');
      if (media) {
         const travel = window.matchMedia('(max-width: 767px)').matches ? 28 : 72;
         gsap.fromTo(media,
            { opacity: 0, x: -travel },
            {
               opacity: 1,
               x: 0,
               duration: 1.15,
               ease: 'power3.out',
               scrollTrigger: {
                  trigger: intro,
                  start: 'top 75%',
                  toggleActions: 'play none none reverse',
                  invalidateOnRefresh: true
               }
            }
         );
      }
   }

   const section = document.querySelector('.sce-section');
   if (!section) return;

   const photo = section.querySelector('[data-sce-photo]');
   if (!photo) return;

   gsap.set(photo, {
      opacity: 0,
      x: 150,       // starts off to the right
      rotation: 0
   });

   gsap.to(photo, {
      opacity: 1,
      x: 0,
      rotation: -5,   // settles into its tilted resting angle
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
         trigger: section,
         start: 'top 70%',
         end: 'bottom 20%',
         toggleActions: 'restart none none reverse',
         invalidateOnRefresh: true
         // markers: true, // uncomment to debug the trigger lines while testing
      }
   });

   ScrollTrigger.refresh();
});