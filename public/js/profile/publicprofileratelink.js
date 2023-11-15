const rateProfileLink = document.querySelector(".main-option-rate-profile");

rateProfileLink.href = "/publicprofilerate/" + getPublicProfileName() + "/" + getToken();
console.log(rateProfileLink);

function getToken() {
    return window.location.href.split("/")[window.location.href.split("/").length - 1];
}


function getPublicProfileName() {
    return window.location.href.split("/")[window.location.href.split("/").length - 2];
}