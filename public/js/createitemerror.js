alert(getError().split("%20").join(" "));
window.location.href = "/profile/activity/selling/listitemform/" + getToken();

function getToken() {
    return window.location.href.split("/")[window.location.href.split("/").length - 1];
}

function getError() {
    return window.location.href.split("/")[window.location.href.split("/").length - 2];
}