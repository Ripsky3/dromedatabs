const tabOwnerTitle = document.querySelector(".tab-owner-title");
const mainDisplay = document.querySelector(".main-display");

function getToken() {
    return window.location.href.split("/")[window.location.href.split("/").length - 1];
}

function getTab_id() {
    return window.location.href.split("/")[window.location.href.split("/").length - 2];
}

function createUserTab(userTab) {
    let userTabDiv = document.createElement("div");
    userTabDiv.classList.add("usertab-div");

    let userTabName = document.createElement("p");
    userTabName.innerHTML = userTab.name;
    let userTabCategory = document.createElement("p");
    userTabCategory.innerHTML = userTab.category;



    checkIfUserIsTabOwner().then(res => {
        console.log(res)
        if (res == true) {

        } else {
            let userTabBookmark = document.createElement("button");

    
            tabIsBookmarked(getTab_id()).then(res => {
                if (res.error) {
                    alert(res.error);
                }
                if (res == true) {
                    userTabBookmark.innerHTML = "Unbookmark";
                } else if (res == false) {
                    userTabBookmark.innerHTML = "Bookmark";
                }
            })
            userTabBookmark.addEventListener("click", (e) => {
                e.preventDefault();
                if (userTabBookmark.innerHTML == "Bookmark") {
                    bookmarkTab(getTab_id()).then(res => {
                        if (res.error) {
                            alert(res.error);
                        }
                    })
                    userTabBookmark.innerHTML = "Unbookmark";
                } else if (userTabBookmark.innerHTML == "Unbookmark") {
                    unbookmarkTab(getTab_id()).then(res => {
                        if (res.error) {
                            alert(res.error);
                        }
                    })
                    userTabBookmark.innerHTML = "Bookmark";
                } 
            });
            userTabBookmark.classList.add("user-tab-bookmark-button");
            userTabDiv.appendChild(userTabBookmark);
        }
    })
    

    userTabDiv.appendChild(userTabName);
    userTabDiv.appendChild(userTabCategory);
    


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

async function getTabByID(tab_id) {
    const response = await fetch("/gettabbyid/" + tab_id + "/" + getToken(), {
        method: 'GET',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json());
    return response
}

getTabByID(getTab_id()).then(userTab => {
    getUserByTabOwner_id(userTab.owner).then(async (res) => {
        if (res.error) {
            alert(res.error);
        } else {
            tabOwnerTitle.innerHTML = "Owner: " + res.name;
            let owner = await getUser(getToken());
            if (owner.name == res.name) {
                tabOwnerTitle.href = "/userpublicprofile/"  + getToken();
            } else {
                tabOwnerTitle.href = "/publicprofile/" + res.name + "/" + getToken();
            }
            

            
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

async function getUserByTabOwner_id(tab_id) {
    const response = await fetch("/getuserbytabowner_id/" + tab_id + "/" + getToken(), {
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

async function getUser() {
    const response = await fetch("/user/" + getToken(), { 
        method: 'GET',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json());
    return response
}