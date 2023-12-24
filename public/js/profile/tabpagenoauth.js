const tabOwnerTitle = document.querySelector(".tab-owner-title");
const mainDisplay = document.querySelector(".main-display");

function getTab_id() {
    return window.location.href.split("/")[window.location.href.split("/").length - 1];
}

function createUserTab(userTab) {
    let userTabDiv = document.createElement("div");
    userTabDiv.classList.add("usertab-div");

    let userTabName = document.createElement("p");
    userTabName.innerHTML = userTab.name;
    let userTabCategory = document.createElement("p");
    userTabCategory.innerHTML = userTab.category;

    let userTabBookmark = document.createElement("a");
    userTabBookmark.classList.add("user-tab-bookmark-link");
    userTabBookmark.innerHTML = "Bookmark";
    userTabBookmark.href = "/signup";

    userTabDiv.appendChild(userTabName);
    userTabDiv.appendChild(userTabCategory);
    userTabDiv.appendChild(userTabBookmark);


    displayUserTabs(userTabDiv);
    displayUserTabSections(userTab);
}

function displayUserTabs(userTabsDiv) {
    mainDisplay.appendChild(userTabsDiv);
}

function displayUserTabSections(userTab) {
    let userTabContainer = document.createElement("div");
    for (let i = 0; i < userTab.tabarray.length; i++) {
        
        userTabContainer.appendChild(createTabStringSection(userTab.tabarray[i]));
    }
    mainDisplay.appendChild(userTabContainer);
}

function createTabStringSection(tabArray) {

    const tabDisplayRow = document.createElement("div");
    tabDisplayRow.classList.add("tab-display-row");

    for (let i = 0; i < tabArray.tabrow.length; i++) {
        if (i == 0) {
            const firstTabStringSection = document.createElement("textarea");
            firstTabStringSection.setAttribute("readonly", true);
            firstTabStringSection.classList.add("tab-string-section");
            firstTabStringSection.innerHTML = tabArray.tabrow[i];
            tabDisplayRow.appendChild(firstTabStringSection);
        } else {
            const tabStringSection = document.createElement("textarea");
            tabStringSection.setAttribute("readonly", true);
            tabStringSection.setAttribute( "autocomplete", "off" ); 
            tabStringSection.classList.add("tab-string-section");
            tabStringSection.innerHTML = tabArray.tabrow[i];
            tabDisplayRow.appendChild(tabStringSection);
        }
    }
    return tabDisplayRow;
}

async function getTabByIDNoAuth(tab_id) {
    const response = await fetch("/gettabbyidnoauth/" + tab_id, {
        method: 'GET',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json());
    return response
}

getTabByIDNoAuth(getTab_id()).then(userTab => {
    console.log(userTab)
    getUserByTabOwner_idNoAuth(userTab.owner).then(res => {
        if (res.error) {
            alert(res.error);
        } else {
            tabOwnerTitle.innerHTML = "Owner: " + res.name;
            tabOwnerTitle.href = "/publicprofilenoauth/" + res.name
        }
    })
    createUserTab(userTab);
}).catch(e => {
    console.log(e)
})

async function bookmarkTab(tab_id) {
    const response = await fetch("/bookmarktab/" + tab_id + "/" + getToken(), {
        method: 'PATCH',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json());
    return response
}

async function unbookmarkTab(tab_id) {
    const response = await fetch("/unbookmarktab/" + tab_id + "/" + getToken(), {
        method: 'PATCH',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json());
    return response
}

async function tabIsBookmarked(tab_id) {
    const response = await fetch("/tabisbookmarked/" + tab_id + "/" + getToken(), {
        method: 'GET',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json());
    return response
}

async function getUserByTabOwner_idNoAuth(tab_id) {
    const response = await fetch("/getuserbytabowner_idnoauth/" + tab_id, {
        method: 'GET',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json());
    return response
}

async function checkIfUserIsTabOwner() {
    const response = await fetch("/checkifuseristabowner/" + getTab_id() + "/" + getToken(), {
        method: 'GET',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json());
    return response
}