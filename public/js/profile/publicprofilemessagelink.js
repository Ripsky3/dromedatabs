const messageProfileLink = document.querySelector(".main-option-message-profile");
messageProfileLink.href = "/publicprofilemessage/" + getPublicProfileName() + "/" + getToken();
console.log(messageProfileLink);

function getToken() {
    return window.location.href.split("/")[window.location.href.split("/").length - 1];
}


function getPublicProfileName() {
    return window.location.href.split("/")[window.location.href.split("/").length - 2];
}