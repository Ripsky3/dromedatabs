const summaryButton = document.querySelector(".main-option-summary");
summaryButton.href = "/profile/activity/summary/" + getToken();

function getToken() {
    return window.location.href.split("/")[window.location.href.split("/").length - 1];
}