let headerListLinkSignUp = document.querySelector(".header-option-sign-up");
let headerListLinkSignIn = document.querySelector(".header-option-sign-in");
let signoutButton = document.querySelector(".signout-button");
let profileLink = document.querySelector(".profile-link");


function getToken() {
    return window.location.href.split("/")[window.location.href.split("/").length - 1];
}

// Initial access
if (getToken().length > 30) {
    // User is logged in
    headerListLinkSignUp.classList.add("invisible");
    headerListLinkSignIn.classList.add("invisible");
    signoutButton.classList.remove("invisible");
    profileLink.classList.remove("invisible");

    // Get User
    getUserName().then(name => {
        profileLink.innerHTML = name
        profileLink.href = "/profile/activity/summary/" + getToken();
    }).catch(e => {
        alert(e);
    })
} else {
    // User is logged out
    headerListLinkSignUp.classList.remove("invisible");
    headerListLinkSignIn.classList.remove("invisible");
    signoutButton.classList.add("invisible");
    profileLink.classList.add("invisible");
}

// Signout
signoutButton.addEventListener("click", () => {
    let token;

    let slashCount = 0;
    for (let i = 0; i < window.location.href.length; i++) {
        if (window.location.href[i] == "/") {
            slashCount += 1;
        }
        if (slashCount == 4) {
            token = window.location.href.slice(i + 1);
            break;
        }
    }
    console.log(token)
    window.location.href = "/signoutuser/" + token;
})

// Access user profile
async function getUserName() {
    const response = await fetch("/user/" + getToken(), {
        method: 'GET',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json());
    return response.name
}

