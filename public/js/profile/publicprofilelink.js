const publicProfileLink = document.querySelector(".public-profile-link");
publicProfileLink.href = "/userpublicprofile/" + getToken();

async function addPublicPortfolioInnerHTML() {
    const username = await getUser().then(user => {
        return user.name
    })
    publicProfileLink.innerHTML = username;

}

addPublicPortfolioInnerHTML();

function getToken() {
    return window.location.href.split("/")[window.location.href.split("/").length - 1];
}

async function getUser() {
    const response = await fetch("/user/" + getToken(), {
        method: 'GET',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json());
    return response
}