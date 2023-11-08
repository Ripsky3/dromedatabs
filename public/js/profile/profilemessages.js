const mainDisplay = document.querySelector(".main-display");
const activityLink = document.querySelector(".profile-option-activity");
const messageLink = document.querySelector(".profile-option-messages");
const accountLink = document.querySelector(".profile-option-account");
const allMessagesLink = document.querySelector(".main-option-all-messages");
const sentMessagesLink = document.querySelector(".main-option-sent-messages");
const receivedMessagesLink = document.querySelector(".main-option-received-messages");
const trashLink = document.querySelector(".main-option-trash");

activityLink.href = "/profile/activity/summary/" + getToken();
messageLink.href = "/profile/messages/" + getToken();
accountLink.href = "/profile/account/" + getToken();

allMessagesLink.href = "/profile/messages/" + getToken();
sentMessagesLink.href = "/profile/messages/sent/" + getToken();
receivedMessagesLink.href = "/profile/messages/received/" + getToken();
trashLink.href = "/profile/messages/trash/" + getToken();

function getToken() {
    return window.location.href.split("/")[window.location.href.split("/").length - 1];
}