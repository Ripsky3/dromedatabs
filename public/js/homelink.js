let homeLink = document.querySelector(".home-link");
homeLink.href = "/home/" + getToken();

function getToken() {
    return window.location.href.split("/")[window.location.href.split("/").length - 1];
}