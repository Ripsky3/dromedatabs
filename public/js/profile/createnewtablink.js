const createNewTabLink = document.querySelector(".main-option-create-new-tab");
createNewTabLink.href = "/profile/activity/createnewtab/" + getToken();

function getToken() {
    return window.location.href.split("/")[window.location.href.split("/").length - 1];
}