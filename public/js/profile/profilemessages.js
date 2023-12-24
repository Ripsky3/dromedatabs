const mainDisplay = document.querySelector(".main-display");
const messageLink = document.querySelector(".profile-option-messages");
const allMessagesLink = document.querySelector(".main-option-all-messages");
const sentMessagesLink = document.querySelector(".main-option-sent-messages");
const receivedMessagesLink = document.querySelector(".main-option-received-messages");
const trashLink = document.querySelector(".main-option-trash");


messageLink.href = "/profile/messages/" + getToken();

allMessagesLink.href = "/profile/messages/" + getToken();
sentMessagesLink.href = "/profile/messages/sent/" + getToken();
receivedMessagesLink.href = "/profile/messages/received/" + getToken();
trashLink.href = "/profile/messages/trash/" + getToken();

function getToken() {
    return window.location.href.split("/")[window.location.href.split("/").length - 1];
}