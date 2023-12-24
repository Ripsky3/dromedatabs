const createNewTabLink = document.querySelector(".create-new-tab-link");
const activityLink = document.querySelector(".profile-option-activity");
const messageLink = document.querySelector(".profile-option-messages");
const accountLink = document.querySelector(".profile-option-account");

let draftNum = document.querySelector(".tabs-info-link-draft");
let soldNum = document.querySelector(".tabs-info-sold-num");
let buyerReceivedNum = document.querySelector(".selling-info-buyer-received");
let totalNum = document.querySelector(".selling-info-total");

activityLink.href = "/profile/activity/summary/" + getToken();
messageLink.href = "/profile/messages/" + getToken();
accountLink.href = "/profile/account/" + getToken();


createNewTabLink.href = "/profile/activity/tabs/createnewtab/" + getToken();

function getToken() {
    return window.location.href.split("/")[window.location.href.split("/").length - 1];
}
