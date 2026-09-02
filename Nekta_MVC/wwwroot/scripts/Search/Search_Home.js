
$(document).on("submit", "#searchForm", function (e) {
    e.preventDefault();

    var keyword = $("#searchInput").val().trim();

    if (keyword === "") {
        alert("Please enter search keyword.");
        $("#searchInput").focus();
        return false;
    }

    window.location.href = "/search/" + encodeURIComponent(keyword);
});
