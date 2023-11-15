const deleteAccountLink = document.querySelector(".main-option-delete-account");
deleteAccountLink.href = "/userpublicprofiledeleteaccount/" + getToken();

function getToken() {
    return window.location.href.split("/")[window.location.href.split("/").length - 1];
}