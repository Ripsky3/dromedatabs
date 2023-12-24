const bookmarkedLink = document.querySelector(".main-option-bookmarked-tabs");
bookmarkedLink.href = "/profile/activity/bookmarkedtabs/" + getToken();

function getToken() {
    return window.location.href.split("/")[window.location.href.split("/").length - 1];
}