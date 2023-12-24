const postedTabsLink = document.querySelector(".main-option-posted-tabs");
postedTabsLink.href = "/profile/activity/postedtabs/" + getToken();

function getToken() {
    return window.location.href.split("/")[window.location.href.split("/").length - 1];
}