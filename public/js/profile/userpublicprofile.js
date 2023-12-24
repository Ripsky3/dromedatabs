const itemDisplay = document.querySelector(".items-display");
const postedTabsLink = document.querySelector(".main-option-posted-tabs");
const ratingsLink = document.querySelector(".main-option-ratings");

ratingsLink.href = "/userpublicprofileratings/" + getToken();
postedTabsLink.href = "/userpublicprofile/" + getToken();

function getToken() {
    return window.location.href.split("/")[window.location.href.split("/").length - 1];
}

async function getUserTabsPosted() {
    const response = await fetch("/getusertabsposted/" + getToken(), {
        method: 'GET',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json());
    return response
}

async function createUserTabsTags(userTabs) {
    console.log(userTabs)
    for (let i = 0; i < userTabs.length; i++) {
        let userTabDiv = document.createElement("div");
        userTabDiv.classList.add("usertab-div");

        let userTabName = document.createElement("a");
        userTabName.innerHTML = userTabs[i].name;
        userTabName.href = "/profiletabpage/" + userTabs[i]._id + "/" + getToken();
        let userTabCategory = document.createElement("p");
        userTabCategory.innerHTML = userTabs[i].category;

        userTabDiv.appendChild(userTabName);
        userTabDiv.appendChild(userTabCategory);

        displayUserTabs(userTabDiv);
    }
}

function displayUserTabs(userTabDiv) {
    itemDisplay.appendChild(userTabDiv);
}

getUserTabsPosted().then(userTabs => {
    createUserTabsTags(userTabs);
}).catch(e => {
    console.log(e)
})