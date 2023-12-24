alert(getError());
//window.location.href = "/profile/activity/tabs/createnewtab/" + getToken();

function getToken() {
    return window.location.href.split("/")[window.location.href.split("/").length - 1];
}

function getError() {
    return window.location.href.split("/")[window.location.href.split("/").length - 2];
}