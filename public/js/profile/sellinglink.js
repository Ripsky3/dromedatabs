const sellingLink = document.querySelector(".main-option-selling");
sellingLink.href = "/profile/activity/selling/" + getToken();

function getToken() {
    return window.location.href.split("/")[window.location.href.split("/").length - 1];
}