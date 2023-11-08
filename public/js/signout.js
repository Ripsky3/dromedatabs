let signoutButton = document.querySelector(".signout-button");

signoutButton.addEventListener("click", () => {
    window.location.href = "/signoutuser/" + getToken();
})

function getToken() {
    return window.location.href.split("/")[window.location.href.split("/").length - 1];
}