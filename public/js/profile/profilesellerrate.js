const starOne = document.querySelector(".star-one");
const starTwo = document.querySelector(".star-two");
const starThree = document.querySelector(".star-three");
const starFour = document.querySelector(".star-four");
const starFive = document.querySelector(".star-five");

const ratingMessageTextbox = document.querySelector(".rating-message-textbox");
const ratingSubmitButton = document.querySelector(".rating-submit-button");

let rating = 0;

starOne.addEventListener("click", () => {
    starOne.style.color = "#fff152";
    starTwo.removeAttribute("style");
    starThree.removeAttribute("style");
    starFour.removeAttribute("style");
    starFive.removeAttribute("style");
    rating = 1;
})

starTwo.addEventListener("click", () => {
    starOne.style.color = "#fff152";
    starTwo.style.color = "#fff152";
    starThree.removeAttribute("style");
    starFour.removeAttribute("style");
    starFive.removeAttribute("style");
    rating = 2;
})

starThree.addEventListener("click", () => {
    starOne.style.color = "#fff152";
    starTwo.style.color = "#fff152";
    starThree.style.color = "#fff152";
    starFour.removeAttribute("style");
    starFive.removeAttribute("style");
    rating = 3;
})

starFour.addEventListener("click", () => {
    starOne.style.color = "#fff152";
    starTwo.style.color = "#fff152";
    starThree.style.color = "#fff152";
    starFour.style.color = "#fff152";
    starFive.removeAttribute("style");
    rating = 4;
})

starFive.addEventListener("click", () => {
    starOne.style.color = "#fff152";
    starTwo.style.color = "#fff152";
    starThree.style.color = "#fff152";
    starFour.style.color = "#fff152";
    starFive.style.color = "#fff152";
    rating = 5;
})

ratingSubmitButton.addEventListener("click", (e) => {
    e.preventDefault();
    ratePublicProfile().then(res => {
        window.location.href = "/profile/activity/summary/" + getToken();
    }).catch(e => {
        alert(e.error);
    })
})

function getToken() {
    return window.location.href.split("/")[window.location.href.split("/").length - 1];
}

function getItemName() {
    return window.location.href.split("/")[window.location.href.split("/").length - 2];
}

async function ratePublicProfile() {
    const item = await getItem();
    const user = await getUser();

    const response = await fetch("/ratepublicprofile/" + getToken(), {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            profile: item[0].username,
            rating,
            message: ratingMessageTextbox.value,
            rater: user.name
        })
    })
    return response
}

async function getItem() {
    const response = await fetch("/getitem/" + getItemName() + "/" + getToken(), {
        method: 'GET',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json());
    return response;
}

async function getUser() {
    const response = await fetch("/user/" + getToken(), {
        method: 'GET',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json());
    return response
}


