const mainDisplay = document.querySelector(".main-display");

function getToken() {
    return window.location.href.split("/")[window.location.href.split("/").length - 1];
}

const itemDisplay = document.querySelector(".items-display");

async function getUserTabsPosted() {
    const response = await fetch("/getusertabsposted/" + getToken(), {
        method: 'GET',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json());
    return response
}

async function createUserTabs(userTabs) {
    for (let i = 0; i < userTabs.length; i++) {
        let userTabDiv = document.createElement("div");
        userTabDiv.classList.add("usertab-div");

        let userTabName = document.createElement("a");
        userTabName.innerHTML = userTabs[i].name;
        userTabName.href = "/postedtabedit/" + userTabs[i]._id + "/" + getToken();
        let userTabCategory = document.createElement("p");
        userTabCategory.innerHTML = userTabs[i].category;

        userTabDiv.appendChild(userTabName);
        userTabDiv.appendChild(userTabCategory);

        displayUserTabs(userTabDiv);
    }
}

function displayUserTabs(userTabsDiv) {
    mainDisplay.appendChild(userTabsDiv);
}

getUserTabsPosted().then(userTabs => {
    createUserTabs(userTabs);
}).catch(e => {
    console.log(e)
})