const cartLink = document.querySelector(".main-option-cart");
cartLink.href = "/profile/activity/cart/" + getToken();

function getToken() {
    return window.location.href.split("/")[window.location.href.split("/").length - 1];
}