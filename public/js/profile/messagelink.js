const messageLink = document.querySelector(".profile-option-messages");
messageLink.href = "/profile/messages/" + getToken();

function getToken() {
    return window.location.href.split("/")[window.location.href.split("/").length - 1];
}