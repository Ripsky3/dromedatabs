const sellingLink = document.querySelector(".main-option-selling");

sellingLink.href = "/publicprofile/" + getPublicProfileName() + "/" + getToken();
console.log(sellingLink);

function getToken() {
    return window.location.href.split("/")[window.location.href.split("/").length - 1];
}


function getPublicProfileName() {
    return window.location.href.split("/")[window.location.href.split("/").length - 2];
}