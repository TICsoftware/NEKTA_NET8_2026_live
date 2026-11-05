(function () {
    var track = document.getElementById("articleContainer");
    var nav = document.querySelector(".blogs-mobile-nav");
    var prev = document.querySelector(".blogs-mobile-prev");
    var next = document.querySelector(".blogs-mobile-next");
    if (!track || !nav || !prev || !next) return;

    var mq = window.matchMedia("(max-width: 640px)");

    function cardStep() {
        var card = track.querySelector(".insight-card");
        if (!card) return track.clientWidth;
        var styles = window.getComputedStyle(track);
        var gap = parseFloat(styles.columnGap || styles.gap) || 16;
        return card.getBoundingClientRect().width + gap;
    }

    function updateNav() {
        var count = track.querySelectorAll(".insight-card").length;
        var isMobile = mq.matches && count > 1;
        nav.hidden = !isMobile;
        if (!isMobile) return;

        var maxScroll = track.scrollWidth - track.clientWidth - 2;
        prev.disabled = track.scrollLeft <= 2;
        next.disabled = track.scrollLeft >= maxScroll;
    }

    prev.addEventListener("click", function () {
        track.scrollBy({ left: -cardStep(), behavior: "smooth" });
    });
    next.addEventListener("click", function () {
        track.scrollBy({ left: cardStep(), behavior: "smooth" });
    });

    track.addEventListener("scroll", updateNav, { passive: true });
    window.addEventListener("resize", updateNav);
    if (mq.addEventListener) {
        mq.addEventListener("change", updateNav);
    } else if (mq.addListener) {
        mq.addListener(updateNav);
    }

    new MutationObserver(updateNav).observe(track, { childList: true });
    updateNav();
})();

$(document).on("click", "#btnLoadMore", function (e) {
    e.preventDefault();

    var page = parseInt($("#hdnPage").val());
    var contentId = $("#hdnContentId").val();
    var totalCount = parseInt($("#hdnTotalCount").val());

    $.ajax({
        url: '/Blogs/BlogLoadMore',
        type: 'GET',
        data: {
            contentId: contentId,
            page: page,
            pageSize: 1
        },
        success: function (html) {

            if (!html || html.trim() === "") {
                $("#DivLoad").hide();
                return;
            }

            $("#articleContainer").append(html);

            var loadedCount = $("#articleContainer .blog-item").length;

            $("#hdnPage").val(page + 1);

            if (loadedCount >= totalCount) {
                $("#DivLoad").hide();
            }
        },
        error: function (xhr, status, error) {
            console.log(xhr.status);
            console.log(xhr.responseText);
            console.log(error);
            alert("Error: " + xhr.status);
        }
    });

});