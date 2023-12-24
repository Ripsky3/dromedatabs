let headerListLinkSignUp = document.querySelectorAll(".header-option-sign-up");
let headerListLinkSignIn = document.querySelectorAll(".header-option-sign-in");
let signoutLink = document.querySelectorAll(".signout-link");
let profileLink = document.querySelectorAll(".profile-link");

for (let i = 0; i < 2; i++) {
    // Initial access
    if (getToken().length > 30) {
        // User is logged in
        headerListLinkSignUp[i].classList.add("invisible");
        headerListLinkSignIn[i].classList.add("invisible");
        signoutLink[i].classList.remove("invisible");
        profileLink[i].classList.remove("invisible");

        profileLink[i].innerHTML = "PROFILE"
        profileLink[i].href = "/profile/activity/createnewtab/" + getToken();
    } else {
        // User is logged out
        headerListLinkSignUp[i].classList.remove("invisible");
        headerListLinkSignIn[i].classList.remove("invisible");
        signoutLink[i].classList.add("invisible");
        profileLink[i].classList.add("invisible");
    }

    // Signout
    signoutLink[i].addEventListener("click", () => {
        window.location.href = "/signoutuser/" + getToken();
    })
}



// Access user profile
async function getUserName() {
    const response = await fetch("/user/" + getToken(), {
        method: 'GET',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json());
    return response.name
}

function getToken() {
    return window.location.href.split("/")[window.location.href.split("/").length - 1];
}

// Hamburger

let hamburger = document.querySelector(".hamburger");
let headerOptions = document.querySelector(".header-options");
let headerOptionsMobile = document.querySelector(".header-options-mobile");
let headerOptionsMobileExit = document.querySelector(".header-options-mobile-exit");
const container = document.querySelector(".container");

hamburger.addEventListener("click", () => {
    headerOptionsMobile.classList.remove("invisible")
    headerOptionsMobile.classList.remove("hide");
})

headerOptionsMobileExit.addEventListener("click", () => {
    headerOptionsMobile.classList.add("invisible")
    headerOptionsMobile.classList.add("hide");
})

// Container client width

/*if (container.clientWidth <= 480) {
    headerOptions.classList.add("invisible");
    headerOptionsMobile.classList.remove("invisible")
    headerOptionsMobile.classList.add("hide")
}

if (container.clientWidth >= 1000) {
    headerOptions.classList.remove("invisible");
    headerOptionsMobile.classList.add("invisible")
    headerOptionsMobile.classList.remove("hide")
}*/