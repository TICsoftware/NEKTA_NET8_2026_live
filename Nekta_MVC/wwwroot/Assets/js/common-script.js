const headerWrap = document.getElementById('headerWrap');
  const navBar = document.getElementById('navBar');
  const navViewport = document.getElementById('navViewport');
  const dropdownAnchor = document.getElementById('dropdownAnchor');
  const desktopNav = document.getElementById('desktopNav');
  let menuItems = [...desktopNav.querySelectorAll('.nav-item[data-menu]')];
  const panels = [...document.querySelectorAll('.nav-panel')];

  let activeMenu = null;
  let prevIndex = null;
  let closeTimer = null;

  function bindDesktopMenuEvents(){
    menuItems.forEach(item => {
      item.addEventListener('mouseenter', () => openMenu(item));
      item.addEventListener('focusin', () => openMenu(item));
      const btn = item.querySelector('button');
      if (!btn) return;
      btn.addEventListener('click', e => {
        e.preventDefault();
        activeMenu === item.dataset.menu ? closeMenu() : openMenu(item);
      });
    });
  }

  function wireMobileAccordions(){
    document.querySelectorAll('[data-accordion]').forEach(row => {
      const trigger = row.querySelector('.accordion-trigger');
      const panel = row.querySelector('.accordion-panel');
      const inner = row.querySelector('.accordion-panel-inner');
      if (!trigger || !panel || !inner) return;

      trigger.addEventListener('click', () => {
        const isOpen = row.classList.contains('open');

        document.querySelectorAll('[data-accordion]').forEach(r => {
          r.classList.remove('open');
          const p = r.querySelector('.accordion-panel');
          const t = r.querySelector('.accordion-trigger');
          if (p) p.style.maxHeight = '0';
          if (t) t.setAttribute('aria-expanded', 'false');
        });

        if (!isOpen) {
          row.classList.add('open');
          panel.style.maxHeight = inner.scrollHeight + 'px';
          trigger.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  function measurePanel(panel){
    const clone = panel.cloneNode(true);
    clone.classList.add('is-active');
    clone.style.cssText = 'position:fixed;left:-9999px;top:0;display:block;visibility:hidden;pointer-events:none;';
    document.body.appendChild(clone);
    const w = clone.offsetWidth;
    const h = clone.offsetHeight;
    document.body.removeChild(clone);
    return { w, h };
  }

  function applySize(panel){
    const { w, h } = measurePanel(panel);
    navViewport.style.width = w + 'px';
    navViewport.style.minHeight = h + 'px';
  }

  function showPanel(panel, direction){
    panels.forEach(p => p.classList.remove('is-active','from-start','from-end'));
    panel.classList.add('is-active');
    if (direction) panel.classList.add(direction);
    applySize(panel);
  }

  function positionViewportToItem(item){
    const btn = item.querySelector('button');
    if (!btn) return;
    const btnRect = btn.getBoundingClientRect();
    const anchorRect = dropdownAnchor.getBoundingClientRect();
    const centerX = btnRect.left + (btnRect.width / 2) - anchorRect.left;
    navViewport.style.left = centerX + 'px';
  }

  function openMenu(item){
    clearTimeout(closeTimer);
    const menu = item.dataset.menu;
    const index = Number(item.dataset.index);
    const panel = document.getElementById('panel-' + menu);
    if (!panel) return;

    const direction = activeMenu && prevIndex !== null
      ? (index > prevIndex ? 'from-end' : 'from-start') : '';

    menuItems.forEach(i => {
      i.classList.toggle('open', i === item);
      const btn = i.querySelector('button');
      if (btn) btn.setAttribute('aria-expanded', i === item ? 'true' : 'false');
    });

    positionViewportToItem(item);
    showPanel(panel, direction);
    navViewport.classList.add('open');
    navViewport.setAttribute('aria-hidden', 'false');
    activeMenu = menu;
    prevIndex = index;
  }

  function closeMenu(){
    clearTimeout(closeTimer);
    menuItems.forEach(i => {
      i.classList.remove('open');
      const btn = i.querySelector('button');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    });
    navViewport.classList.remove('open');
    navViewport.setAttribute('aria-hidden', 'true');
    activeMenu = null;
    prevIndex = null;
    closeTimer = setTimeout(() => {
      panels.forEach(p => p.classList.remove('is-active','from-start','from-end'));
      navViewport.style.width = '';
      navViewport.style.minHeight = '';
    }, 160);
  }

  function scheduleClose(){
    clearTimeout(closeTimer);
    closeTimer = setTimeout(closeMenu, 220);
  }

  headerWrap.addEventListener('mouseleave', scheduleClose);
  headerWrap.addEventListener('focusout', e => {
    if (!headerWrap.contains(e.relatedTarget)) scheduleClose();
  });
  dropdownAnchor.addEventListener('mouseenter', () => clearTimeout(closeTimer));

  // Header content is now static in _Header.cshtml; JS handles behavior only.
  menuItems = [...desktopNav.querySelectorAll('.nav-item[data-menu]')];
  bindDesktopMenuEvents();
  wireMobileAccordions();

function updateScrolledState(){
    const isScrolled = window.scrollY > 8;
    navBar.classList.toggle('elevated', isScrolled);
    headerWrap.classList.toggle('scrolled', isScrolled);
  }

  window.addEventListener('scroll', updateScrolledState);
  updateScrolledState(); // set correct state immediately on page load

  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const drawer = document.getElementById('drawer');
  const overlay = document.getElementById('overlay');
  const drawerClose = document.getElementById('drawerClose');

  function openDrawer(){
    drawer.classList.add('active');
    overlay.classList.add('active');
    overlay.setAttribute('aria-hidden', 'false');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  function closeDrawer(){
    drawer.classList.remove('active');
    overlay.classList.remove('active');
    overlay.setAttribute('aria-hidden', 'true');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburgerBtn.addEventListener('click', openDrawer);
  drawerClose.addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);

  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if (drawer.classList.contains('active')) closeDrawer();
    else closeMenu();
  });

  window.addEventListener('resize', () => {
    const p = panels.find(x => x.classList.contains('is-active'));
    if (p && navViewport.classList.contains('open')) applySize(p);
    if (activeMenu) {
      const activeItem = menuItems.find(i => i.dataset.menu === activeMenu);
      if (activeItem) positionViewportToItem(activeItem);
    }
    document.querySelectorAll('[data-accordion].open').forEach(row => {
      const panel = row.querySelector('.accordion-panel');
      const inner = row.querySelector('.accordion-panel-inner');
      if (!panel || !inner) return;
      panel.style.maxHeight = inner.scrollHeight + 'px';
    });
  });


// --------------------------------------------
// FOOTER YEAR
// --------------------------------------------
document.getElementById("year-foot").innerHTML = (new Date().getFullYear());

  // --------------------------------------------
  // GSAP + ScrollTrigger + Lenis Setup
  // --------------------------------------------
  gsap.registerPlugin(ScrollTrigger);
  
  const isMobile = window.matchMedia("(max-width: 992px)").matches;
  
  /** Same scroll root as Lenis default (wrapper: window Ã¢â€ â€™ classes + scroll on documentElement). */
  const scrollRootEl = document.documentElement;
  
  let lenis;
  
  if (!isMobile) {
  
    lenis = new Lenis({
      smoothWheel: true,
      smoothTouch: false,
  
      // PERFECT NO-LAG SETTINGS
      lerp: 0.05,              // fast response, no delay
      wheelMultiplier: 1.02,   // mouse feels natural
      normalizeWheel: true,
      syncTouch: false,
        prevent: (node) => {
        if (document.body.classList.contains('modal-open')) return true;
        return node.closest('.testimonial-content, #contactModal, .modal-scroll, .modal-panel');
      }
    });
  
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  
    window.lenis = lenis;
  
    // ---- GSAP SYNC ----
    ScrollTrigger.scrollerProxy(scrollRootEl, {
      scrollTop(value) {
        return arguments.length
          ? lenis.scrollTo(value, { immediate: true })
          : lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: scrollRootEl.clientWidth,
          height: scrollRootEl.clientHeight
        };
      }
    });
  
    // ScrollTriggers must use the same element Lenis proxies Ã¢â‚¬â€ otherwise scrub/toggle use native scroll and wonÃ¢â‚¬â„¢t match smooth scroll.
    ScrollTrigger.defaults({ scroller: scrollRootEl });
  
    lenis.on("scroll", ScrollTrigger.update);
    ScrollTrigger.addEventListener("refresh", () => lenis.resize());
    ScrollTrigger.refresh();
  
  } else {
    document.body.classList.add("native-scroll");
    // Mobile: keep true native window/document scroll (no scrollerProxy).
    // Proxying documentElement can interfere with touch scrolling on some mobile browsers.
    ScrollTrigger.defaults({ scroller: window });
    ScrollTrigger.refresh();
  }

  // --------------------------------------------
  // BACK TO TOP
  // --------------------------------------------
  (function initBackToTop() {
    const btn = document.querySelector(".back-to-top");
    const circle = document.querySelector(".progress-ring-circle");
    if (!btn) return;

    const radius = circle ? Number(circle.getAttribute("r")) || 45 : 45;
    const circumference = 2 * Math.PI * radius;
    if (circle) {
      circle.style.strokeDasharray = String(circumference);
      circle.style.strokeDashoffset = String(circumference);
    }

    function getY() {
      if (window.lenis && typeof window.lenis.scroll === "number") return window.lenis.scroll;
      return window.scrollY || document.documentElement.scrollTop || 0;
    }

    function getMax() {
      if (window.lenis && typeof window.lenis.limit === "number") return Math.max(1, window.lenis.limit);
      return Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    }

    function update() {
      const y = getY();
      const progress = Math.min(1, Math.max(0, y / getMax()));
      if (circle) circle.style.strokeDashoffset = String(circumference - progress * circumference);
      btn.classList.toggle("active", y > 240);
    }

    btn.addEventListener("click", function () {
      if (window.lenis) window.lenis.scrollTo(0, { duration: 1.1 });
      else window.scrollTo({ top: 0, behavior: "smooth" });
    });

    if (window.lenis) window.lenis.on("scroll", update);
    window.addEventListener("scroll", update, { passive: true });
    update();
  })();
  

/* ======================
   FOOTER SECTION
====================== */
document.addEventListener("DOMContentLoaded", () => {

const footer =
document.querySelector("footer");

if(!footer) return;

function initFooterAccordions(){
  const sections = [...footer.querySelectorAll('.footer-quick-link-click')];
  if (!sections.length) return;

  const desktopMq = window.matchMedia('(min-width: 768px)');

  function closeAll(){
    sections.forEach(section => {
      section.classList.remove('open');
      const list = section.querySelector('.footer-nav-list');
      const heading = section.querySelector('h4');
      if (list) list.style.maxHeight = '0';
      if (heading) heading.setAttribute('aria-expanded', 'false');
    });
  }

  function resetForDesktop(){
    if (!desktopMq.matches) return;
    sections.forEach(section => {
      section.classList.remove('open');
      const list = section.querySelector('.footer-nav-list');
      if (list) list.style.maxHeight = '';
    });
  }

  sections.forEach(section => {
    const heading = section.querySelector('h4');
    const list = section.querySelector('.footer-nav-list');
    if (!heading || !list) return;

    heading.setAttribute('role', 'button');
    heading.setAttribute('tabindex', '0');
    heading.setAttribute('aria-expanded', 'false');

    const toggle = () => {
      if (desktopMq.matches) return;

      const isOpen = section.classList.contains('open');
      closeAll();

      if (!isOpen) {
        section.classList.add('open');
        list.style.maxHeight = list.scrollHeight + 'px';
        heading.setAttribute('aria-expanded', 'true');
      }
    };

    heading.addEventListener('click', toggle);
    heading.addEventListener('keydown', e => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      e.preventDefault();
      toggle();
    });
  });

  desktopMq.addEventListener('change', resetForDesktop);
  resetForDesktop();
}

initFooterAccordions();

gsap.registerPlugin(ScrollTrigger);


/* reset */

gsap.set(
[
".footer-link",
".social-link",
".legal-link"
],
{
clearProps:"all"
}
);


const tl =
gsap.timeline({

scrollTrigger:{

trigger:footer,

start:"top 90%",

once:true

}

});



/* columns */

tl.from(

footer.querySelectorAll(
".md\\:col-span-4, .footer-quick-links, .md\\:col-span-3, .md\\:col-span-2"
),

{

opacity:0,

y:32,

duration:.55,

stagger:.08,

ease:"power2.out"

}

);



/* links */

tl.from(

".footer-link",

{

opacity:0,

y:12,

duration:.3,

stagger:.02,

ease:"power2.out"

},

"-=.35"

);



/* social */

tl.from(

".social-link",

{

opacity:0,

scale:.85,

duration:.28,

stagger:.03,

ease:"power2.out"

},

"-=.25"

);



/* bottom */

tl.from(

".footer-bottom",

{

opacity:0,

y:16,

duration:.35,

ease:"power2.out"

},

"-=.2"

);

});


// Read More functionality for the last section of the Daily Pour page
// Read More functionality — works regardless of whether the button is wrapped
(function () {
  var buttons = document.querySelectorAll('.read-more-btn');

  buttons.forEach(function (btn) {
    // Walk up from the button to find the nearest .read-more-fade that appears before it,
    // searching within the closest shared container rather than assuming direct siblings.
    var container = btn.closest('.container') || btn.parentElement.parentElement || btn.parentElement;
    var fadeBlock = container ? container.querySelector('.read-more-fade') : null;
    var label = btn.querySelector('.read-more-label');

    if (!fadeBlock) return;

    btn.addEventListener('click', function () {
      var expanded = fadeBlock.classList.toggle('is-expanded');
      btn.classList.toggle('is-expanded', expanded);
      btn.setAttribute('aria-expanded', String(expanded));
      if (label) label.textContent = expanded ? 'Read Less' : 'Read More';
    });
  });
})();

// Page intro: hide 3rd+ paragraphs behind Read More
(function () {
  function meaningfulParas(wrap) {
    var direct = Array.prototype.filter.call(wrap.children, function (el) {
      return el.tagName === 'P' && el.textContent.replace(/\u00a0/g, ' ').trim();
    });
    if (direct.length) return direct;
    return Array.prototype.filter.call(wrap.querySelectorAll('p'), function (p) {
      return p.textContent.replace(/\u00a0/g, ' ').trim();
    });
  }

  document.querySelectorAll('.page-intro-section .intro-outer-wrapper').forEach(function (wrap) {
    if (wrap.getAttribute('data-intro-readmore') === 'ready') return;

    var paras = meaningfulParas(wrap);
    if (paras.length < 3) return;

    wrap.setAttribute('data-intro-readmore', 'ready');

    var extra = document.createElement('div');
    extra.className = 'intro-readmore-extra';
    var inner = document.createElement('div');
    inner.className = 'intro-readmore-extra-inner';
    paras.slice(2).forEach(function (p) {
      inner.appendChild(p);
    });
    extra.appendChild(inner);
    paras[1].after(extra);

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'read-more-btn intro-readmore-btn';
    btn.setAttribute('aria-expanded', 'false');
    btn.innerHTML = '<span class="read-more-label">Read More</span> <span class="read-more-plus">+</span>';
    extra.after(btn);

    var label = btn.querySelector('.read-more-label');
    btn.addEventListener('click', function () {
      var expanded = extra.classList.toggle('is-expanded');
      btn.classList.toggle('is-expanded', expanded);
      btn.setAttribute('aria-expanded', String(expanded));
      if (label) label.textContent = expanded ? 'Read Less' : 'Read More';
    });
  });
})();



// Search popup functionality
(function () {
  const trigger    = document.getElementById('searchTrigger');
  const popup      = document.getElementById('searchPopup');
  const overlay    = document.getElementById('searchOverlay');
  const closeBtn    = document.getElementById('searchClose');
  const input       = document.getElementById('searchInput');
  const form        = document.getElementById('searchForm');

  function openSearch() {
    popup.classList.add('active');
    overlay.classList.add('active');
    popup.setAttribute('aria-hidden', 'false');
    trigger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    setTimeout(() => input.focus(), 200);
  }

  function closeSearch() {
    popup.classList.remove('active');
    overlay.classList.remove('active');
    popup.setAttribute('aria-hidden', 'true');
    trigger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    input.value = '';
  }

  trigger.addEventListener('click', openSearch);
  closeBtn.addEventListener('click', closeSearch);
  overlay.addEventListener('click', closeSearch);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && popup.classList.contains('active')) closeSearch();
    // Optional: Ctrl/Cmd + K to open search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      openSearch();
    }
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const query = input.value.trim();
    if (query) {
      // Replace with your actual search results route
      window.location.href = '/search?q=' + encodeURIComponent(query);
    }
  });
})();
