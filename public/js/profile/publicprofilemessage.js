const sellerMessageForm = document.querySelector(".seller-message-form");
sellerMessageForm.action = "/seller/messagewithusername/" + getUsername() + "/" + getToken();

function getToken() {
    return window.location.href.split("/")[window.location.href.split("/").length - 1];
}

function getUsername() {
    return window.location.href.split("/")[window.location.href.split("/").length - 2];
}