const personalizedTabsDisplay = document.querySelector(".personalized-tabs-display");
const personalizedTabDisplayTitle = document.querySelector(".personalized-tab-display-title");

function getToken() {
    return window.location.href.split("/")[window.location.href.split("/").length - 1];
}

async function createUserItemsTags(tabs) {
    for (let i = 0; i < 4; i++) {
        let tabDiv = document.createElement("div");
        tabDiv.classList.add("tab-div");

        // Middle
        let tabName = document.createElement("a");
        tabName.innerHTML = tabs[i].name;
        tabName.classList.add("tab-name")
        tabName.href = "/gettabpage/" + tabs[i]._id + "/" + getToken(); // Change this link
        
        let tabCategory = document.createElement("p");
        tabCategory.innerHTML = tabs[i].category;

        tabDiv.appendChild(tabName);
        tabDiv.appendChild(tabCategory);
        
        console.log(tabDiv)
        displayPersonalizedTab(tabDiv);
    }
}


function displayPersonalizedTab(personalizedItemsDiv) { 
    personalizedTabsDisplay.append(personalizedItemsDiv);
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
    } )
    return response
}

async function getNonPurchasedItems() {
    const response = await fetch("/getnonpurchaseditems/" + getToken(), {
        method: 'GET',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json());
    return response
}

function sortItems(items, recentSearch) {
    let sortedItems = [];
    let count = 0;
    for (let i = 0; i < items.length; i++) {
        count += countSimilarWords(items[i], recentSearch);
        sortedItems.push({
            count,
            name: items[i].name,
            category: items[i].category,
            _id: items[i]._id
        })
        count = 0;
    }

    let currentMax;
    let currentMaxItem;
    for (let i = 0; i < sortedItems.length - 1; i++) {
        let jIndex;
        currentMax = sortedItems[i];
        for (let j = i + 1; j < sortedItems.length; j++) {
            if (sortedItems[j].count > currentMax.count) {
                currentMax = sortedItems[j];
                jIndex = j;
            }
        }
        
        let temp = sortedItems[i];
        sortedItems[i] = currentMax;
        sortedItems[jIndex ] = temp;

    }
    return sortedItems;
}

function countSimilarWords(item, searchInput) {
    let count = 0;
    let splitSearchInput = searchInput.split(" ");
    let splitItemName = item.name.split(" ");

    for (let i = 0; i < splitItemName.length; i++) {
        for (let j = 0; j < splitSearchInput.length; j++) {
            count += countSimilarNameCharacters(splitItemName[i], splitSearchInput[j]);
        }
    }
    return count;
}

function countSimilarNameCharacters(itemName, searchInput) {
    let count = 0;
    for (let i = 0; i < itemName.length; i++) {
        for (let j = 0; j < searchInput.length; j++) {
            if (itemName.slice(i, i + 1).toLowerCase() == searchInput.slice(j, j + 1).toLowerCase()) {
                count++;
            }
        }
    }
    return count;
}

async function getUser() {
    const response = await fetch("/user/" + getToken(), {
        method: 'GET',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json());
    return response
}

if (getToken().length > 40) {
    personalizedTabDisplayTitle.classList.remove("invisible");
    personalizedItems();
}

async function getAllPostedTabs() {
    const response = await fetch("/getAllPostedTabs/" + getToken(), {
        method: 'GET',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json());
    return response
}

async function personalizedItems() {
    const allPostedTabs = await getAllPostedTabs();
    const user = await getUser();
    personalizedTabDisplayTitle.classList.remove("invisible");
    if (allPostedTabs.length < 1 ||
        user.recentsearch == "") {
        personalizedTabsDisplay.classList.add("invisible");
        personalizedTabDisplayTitle.classList.add("invisible");
    } else {
        createUserItemsTags(sortItems(allPostedTabs, user.recentsearch));
    }
}