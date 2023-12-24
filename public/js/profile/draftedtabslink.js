const draftedTabsLink = document.querySelector(".main-option-drafted-tabs");
draftedTabsLink.href = "/profile/activity/draftedtabs/" + getToken();

function getToken() {
    return window.location.href.split("/")[window.location.href.split("/").length - 1];
}