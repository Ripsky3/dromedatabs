const tabsSearchDisplay = document.querySelector(".tabs-search-display");
const searchInput = document.querySelector(".header-search-box-input");
const searchButton = document.querySelector(".header-search-box-search-button");

searchInput.addEventListener("keyup", () => {
    searchButton.href = "/tabsearchguest/" + searchInput.value;
})

searchButton.addEventListener("click", () => {
    if (!searchInput.value.length > 0) {
        return alert("You must search something");
    }
})


async function getAllPostedTabs() {
    const response = await fetch("/getAllPostedTabsNoToken/", {
        method: 'GET',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json());
    return response
}

function getSearchedInput() {
    return window.location.href.split("/")[window.location.href.split("/").length - 2];
}

function sortTabs(items) {
    let sortedItems = [];
    let count = 0;
    for (let i = 0; i < items.length; i++) {
        count += countSimilarWords(items[i], getSearchedInput());
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

async function createTabsTags(tabs) {
    for (let i = 0; i < tabs.length; i++) {
        let tabDiv = document.createElement("div");
        tabDiv.classList.add("tab-div");

        // Middle
        let tabName = document.createElement("a");
        tabName.innerHTML = tabs[i].name;
        tabName.classList.add("tab-name")
        tabName.href = "/gettabpagenoauth/" + tabs[i]._id
        let tabCategory = document.createElement("p");
        tabCategory.innerHTML = tabs[i].category;

        tabDiv.appendChild(tabName);
        tabDiv.appendChild(tabCategory);
        
        displayTab(tabDiv);
    }
}

function displayTab(tabDiv) {
    tabsSearchDisplay.appendChild(tabDiv);
}

async function updateTopSearch(tab_id) {
    const response = await fetch("/updatetopsearch/" + tab_id, {
        method: 'PATCH',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json());
    return response
}

function sortTabsAndUpdateTopSearch(sortedTabs) {
    for (let i = 0; i < 4; i++) {
        if (sortedTabs[i]) {
            updateTopSearch(sortedTabs[i]._id).then(res => {
                if (res.error) {
                    alert(res.error);
                }
            })
        }
    }
}

getAllPostedTabs().then(tabs => {
    createTabsTags(sortTabs(tabs));
    sortTabsAndUpdateTopSearch(sortTabs(tabs));
}).catch(e => {
    alert(e.message);
})

/*updateTopSearch(getSearchedInput()).then(res => {
    if (res.error) {
        alert(res.error);
    }
})*/