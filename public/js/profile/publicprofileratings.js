const ratingsDisplay = document.querySelector(".ratings-display");
const sellingLink = document.querySelector(".main-option-selling");
const publicProfileTitle = document.querySelector(".public-profile-title");

sellingLink.href = "/publicprofile/" + getPublicProfileName() + "/" + getToken();
publicProfileTitle.innerHTML = "Public profile: " + getPublicProfileName();

function getToken() {
    return window.location.href.split("/")[window.location.href.split("/").length - 1];
}


function getPublicProfileName() {
    return window.location.href.split("/")[window.location.href.split("/").length - 2];
}

async function getUserRatings() {
    const response = await fetch("/getuserratings/" + getPublicProfileName() + "/" + getToken(), {
        method: 'GET',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json());
    return response
}

function createUserRatingsTags(userRatings) {
    for (let i = 0; i < userRatings.length; i++) {
        let userRatingsDiv = document.createElement("div");
        let userRatingsWrapper = document.createElement("div");

        let starWrapper = document.createElement("div");
        for (let j = 0; j < userRatings[i].rating; j++) {
            let starOne = document.createElement("img")
            starOne.setAttribute("src", "/images/yellowstar.png");
            starOne.setAttribute("width", "20px")
            starWrapper.appendChild(starOne);
        }
        

        let userRatingsMessage = document.createElement("p");
        userRatingsMessage.innerHTML = userRatings[i].message;

        let userRatingsRater = document.createElement("a");
        userRatingsRater.innerHTML = userRatings[i].rater;
        userRatingsRater.href = "/profileother/" + userRatings[i].rater + "/" + getToken();

        userRatingsWrapper.appendChild(starWrapper);
        userRatingsWrapper.appendChild(userRatingsMessage);
        userRatingsWrapper.appendChild(userRatingsRater);

        userRatingsDiv.appendChild(userRatingsWrapper);

        userRatingsDiv.classList.add("useritem-div");

        displayUserRatings(userRatingsDiv);
    }
}

function displayUserRatings(userRatingsDiv) {
    ratingsDisplay.appendChild(userRatingsDiv);
}

getUserRatings().then(ratings => {
    createUserRatingsTags(ratings);
}).catch(e => {
    alert(e.error)
})