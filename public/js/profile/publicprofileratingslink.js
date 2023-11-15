const ratingsLink = document.querySelector(".main-option-ratings");


ratingsLink.href = "/publicprofileratings/" + getPublicProfileName() + "/" + getToken();
console.log(ratingsLink);

function getToken() {
    return window.location.href.split("/")[window.location.href.split("/").length - 1];
}


function getPublicProfileName() {
    return window.location.href.split("/")[window.location.href.split("/").length - 2];
}