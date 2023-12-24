let signoutLink = document.querySelector(".signout-link");

signoutLink.addEventListener("click", () => {
    window.location.href = "/signoutuser/" + getToken();
})

function getToken() {
    return window.location.href.split("/")[window.location.href.split("/").length - 1];
}