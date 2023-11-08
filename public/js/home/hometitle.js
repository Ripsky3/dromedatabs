let headerTitle = document.querySelector(".header-title");
headerTitle.href = "/home/" + getToken();

function getToken() {
    return window.location.href.split("/")[window.location.href.split("/").length - 1];
}

if (getToken().length > 30) {
    headerTitle.href = "/home/" + getToken();
} else {
    headerTitle.href = "/home/";
}