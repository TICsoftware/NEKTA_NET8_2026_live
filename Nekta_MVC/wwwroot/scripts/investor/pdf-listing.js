$(document).ready(function () {
    initInvestorTabs();

    $(document).on("click", ".ir-tab", function (e) {
        e.preventDefault();
        activateInvestorTab($(this).data("tab"));
    });

    $(window).on("hashchange", function () {
        initInvestorTabs();
    });

    $(document).on("change", ".ir-year-select", function () {
        var $select = $(this);
        var contentId = $select.data("content-id");
        var year = parseInt($select.val(), 10) || 0;
        var listSelector = $select.data("list");
        var loadMoreSelector = $select.data("load-more");
        var pageSize = parseInt($select.data("page-size"), 10) || 12;

        $.ajax({
            url: "/InvestorRelations/PdfFilterByYear",
            type: "GET",
            data: {
                contentId: contentId,
                displayYear: year,
                pageSize: pageSize
            },
            success: function (html, status, xhr) {
                $(listSelector).html(html || "");

                var total = parseInt(xhr.getResponseHeader("X-Total-Count"), 10);
                if (isNaN(total)) total = $(listSelector).find(".pdf-item").length;

                var $loadMore = $(loadMoreSelector).find(".btn-pdf-load-more");
                $loadMore.data("year", year);
                $loadMore.data("page", 2);
                $loadMore.data("total", total);

                var loadedCount = $(listSelector).find(".pdf-item").length;
                if (loadedCount === 0 || loadedCount >= total) {
                    $(loadMoreSelector).hide();
                } else {
                    $(loadMoreSelector).show();
                }
            }
        });
    });

    $(document).on("click", ".btn-pdf-load-more", function (e) {
        e.preventDefault();

        var $btn = $(this);
        var page = parseInt($btn.data("page"), 10) || 2;
        var contentId = $btn.data("content-id");
        var totalCount = parseInt($btn.data("total"), 10) || 0;
        var pageSize = parseInt($btn.data("page-size"), 10) || 12;
        var displayYear = parseInt($btn.data("year"), 10) || 0;
        var listSelector = $btn.data("list");

        $.ajax({
            url: "/InvestorRelations/PdfLoadMore",
            type: "GET",
            data: {
                contentId: contentId,
                page: page,
                pageSize: pageSize,
                displayYear: displayYear
            },
            success: function (html) {
                if (!html || html.trim() === "") {
                    $btn.closest(".view-all-wrap").hide();
                    return;
                }

                $(listSelector).append(html);
                $btn.data("page", page + 1);

                var loadedCount = $(listSelector).find(".pdf-item").length;
                if (loadedCount >= totalCount) {
                    $btn.closest(".view-all-wrap").hide();
                }
            },
            error: function () {
                $btn.closest(".view-all-wrap").hide();
            }
        });
    });
});

function initInvestorTabs() {
    if (!$(".ir-tab").length) return;

    var hash = (window.location.hash || "").replace("#", "");
    var $match = hash ? $('.ir-tab[data-tab="' + hash + '"]') : $();

    if ($match.length) {
        activateInvestorTab(hash, true);
    } else {
        activateInvestorTab($(".ir-tab").first().data("tab"), true);
    }
}

function activateInvestorTab(tabKey, skipHistory) {
    if (!tabKey) return;

    $(".ir-tab").removeClass("is-active").attr("aria-selected", "false");
    $(".ir-tab-panel").attr("hidden", true);

    $('.ir-tab[data-tab="' + tabKey + '"]').addClass("is-active").attr("aria-selected", "true");
    $('.ir-tab-panel[data-tab="' + tabKey + '"]').removeAttr("hidden");

    if (!skipHistory) {
        if (history.replaceState) {
            history.replaceState(null, "", "#" + tabKey);
        } else {
            window.location.hash = tabKey;
        }
    }
}
