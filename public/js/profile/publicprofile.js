const itemDisplay = document.querySelector(".items-display");
const publicProfileTitle = document.querySelector(".public-profile-title");

publicProfileTitle.innerHTML = "Public profile: " + getPublicProfileName();

function getToken() {
    return window.location.href.split("/")[window.location.href.split("/").length - 1];
}

function getPublicProfileName() {
    return window.location.href.split("/")[window.location.href.split("/").length - 2];
}



function getToken() {
    return window.location.href.split("/")[window.location.href.split("/").length - 1];
}

async function getPublicUserTabsPosted() {
    const response = await fetch("/getpublicusertabsposted/" + getPublicProfileName() + "/" + getToken(), {
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
        userTabName.href = "/publicprofiletabpage/" + userTabs[i]._id + "/" + getToken();
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

getPublicUserTabsPosted().then(userTabs => {
    createUserTabsTags(userTabs);
}).catch(e => {
    console.log(e)
})