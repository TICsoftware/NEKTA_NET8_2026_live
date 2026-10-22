$(document).ready(function () {
  const popup = $("#popup-privacypolicy");
  const offscreen = "-400px";

  // Initial hidden state (prevent flash). Offset clears the styled bar.
  popup.css({
    position: "fixed",
    bottom: offscreen,
    left: "0",
    right: "0",
    zIndex: "9999"
  });

  // Check localStorage
  if (localStorage.getItem("popState") !== "shown") {

    // Show popup after delay
    setTimeout(function () {
      document.body.classList.add("cookie-banner-open");
      popup
        .css({ display: "flex", opacity: 0, pointerEvents: "auto" })
        .animate({ bottom: "0", opacity: 1 }, 600);
    }, 2000);

    $(".gcode-div").empty();

  } else {
    popup.hide();
    loadGAScript();
  }

  // ACCEPT BUTTON
  $("#acceptCookie, .privacy_close").on("click", function () {
    document.body.classList.remove("cookie-banner-open");
    popup.css({ pointerEvents: "none" });
    popup.animate({ bottom: offscreen, opacity: 0 }, 400, function () {
      popup.hide();
    });

    // Save state (IMPORTANT FIX)
    localStorage.setItem("popState", "shown");

    loadGAScript();
  });

  // Load GA script function
  function loadGAScript() {
    if (!document.querySelector('script[src*="GA_Header_Script.js"]')) {
      let script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "/Assets/js/GA_Header_Script.js";
      document.head.appendChild(script);
    }
  }
});