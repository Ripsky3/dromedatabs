const tabsDisplay = document.querySelector(".tabs-display");
const publicProfileTitle = document.querySelector(".public-profile-title");
const ratingsLink = document.querySelector(".main-option-ratings");

publicProfileTitle.innerHTML = "Public profile: " + getPublicProfileName();
ratingsLink.href = "/publicprofileratingsnoauth/" + getPublicProfileName();


function getPublicProfileName() {
    return window.location.href.split("/")[window.location.href.split("/").length - 1];
}

async function getPublicUserTabsPostedNoAuth() {
    const response = await fetch("/getpublicusertabspostednoauth/" + getPublicProfileName(), {
        method: 'GET',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json());
    return response
}

async function createUserTabsTags(userTabs) {
    for (let i = 0; i < userTabs.length; i++) {
        let userTabDiv = document.createElement("div");
        userTabDiv.classList.add("usertab-div");

        let userTabName = document.createElement("a");
        userTabName.innerHTML = userTabs[i].name;
        userTabName.href = "/gettabpagenoauth/" + userTabs[i]._id;
        let userTabCategory = document.createElement("p");
        userTabCategory.innerHTML = userTabs[i].category;

        userTabDiv.appendChild(userTabName);
        userTabDiv.appendChild(userTabCategory);

        displayUserTabs(userTabDiv);
    }
}

function displayUserTabs(userTabDiv) {
    tabsDisplay.appendChild(userTabDiv);
}

getPublicUserTabsPostedNoAuth().then(userTabs => {
    console.log(userTabs)
    createUserTabsTags(userTabs);
}).catch(e => {
    console.log(e)
})
