const activityLink = document.querySelector(".profile-option-activity");
activityLink.href = "/profile/activity/createnewtab/" + getToken();

function getToken() {
    return window.location.href.split("/")[window.location.href.split("/").length - 1];
}