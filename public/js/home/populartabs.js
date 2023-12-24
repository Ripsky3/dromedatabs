const popularTabsDisplay = document.querySelector(".popular-tabs-display");
const popularTabDisplayTitle = document.querySelector(".popular-tab-display-title");

function getToken() {
    return window.location.href.split("/")[window.location.href.split("/").length - 1];
}

async function createPopularTabsTags(popularTabs) {

    for (let i = 0; i < popularTabs.length; i++) {

        let tabDiv = document.createElement("div");
        tabDiv.classList.add("tab-div");

        // Middle
        let tabName = document.createElement("a");
        tabName.innerHTML = popularTabs[i].name;
        tabName.classList.add("tab-name")
        if (getToken().length > 40) {
            tabName.href = "/gettabpage/" + popularTabs[i]._id + "/" + getToken(); // Change this link
        } else {
            tabName.href = "/gettabpagenoauth/" + popularTabs[i]._id ; // Change this link
        }
        let tabCategory = document.createElement("p");
        tabCategory.innerHTML = popularTabs[i].category;

        tabDiv.appendChild(tabName);
        tabDiv.appendChild(tabCategory);
        
        displayTab(tabDiv);
    }
}

function displayTab(popularTabsDiv) {
    popularTabsDisplay.append(popularTabsDiv);
}

async function getItemImage(itemId) {
    const response = await fetch("/getitemimage/" + itemId , {
        method: 'GET',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' }
    }) // output the status and return response
    .then(response => response.text()) // send response body to next then chain
    .then(body => {
        return body;
    })
    return response
}

async function getPopularTabs() {
    const response = await fetch("/getpopulartabs", {
        method: 'GET',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json());
    return response
}


getPopularTabs().then(popularTabs => {
    if (popularTabs.length > 0) {
        popularTabDisplayTitle.classList.remove("invisible");
    }
        
    createPopularTabsTags(popularTabs);
})

