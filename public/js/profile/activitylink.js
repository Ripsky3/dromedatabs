const accountLink = document.querySelector(".profile-option-account");
accountLink.href = "/profile/account/" + getToken();

function getToken() {
    return window.location.href.split("/")[window.location.href.split("/").length - 1];
}