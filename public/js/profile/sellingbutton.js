const sellingButton = document.querySelector(".main-option-selling");
sellingButton.href = "/profile/activity/selling/" + getToken();

function getToken() {
    return window.location.href.split("/")[window.location.href.split("/").length - 1];
}
