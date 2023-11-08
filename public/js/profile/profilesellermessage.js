const sellerMessageForm = document.querySelector(".seller-message-form");
sellerMessageForm.href = "/seller/message/" + getItemName() + "/" + getToken();

function getToken() {
    return window.location.href.split("/")[window.location.href.split("/").length - 1];
}

function getItemName() {
    return window.location.href.split("/")[window.location.href.split("/").length - 2];
}