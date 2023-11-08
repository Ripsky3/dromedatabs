const personalizedItemsDisplayGrid = document.querySelector(".personalized-items-display-grid");
const personalizedItemsDisplay = document.querySelector(".personalized-items-display");
const personalizedItemDisplayTitle = document.querySelector(".personalized-items-display-title");

function getToken() {
    return window.location.href.split("/")[window.location.href.split("/").length - 1];
}

async function getUserPersonalizedItems() {
    const response = await fetch("/getuserpersonalizeditems/" + getToken(), {
        method: 'GET',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json());
    return response
}

async function createUserItemsTags(personalizedItems) {

    for (let i = 0; i < 4; i++) {

        let personalizedItemsDiv = document.createElement("div");
        personalizedItemsDiv.classList.add("personalizeditems-div");

        // Top
        let personalizedItemImage = document.createElement("img");
        personalizedItemImage = await getItemImage(personalizedItems[i]._id).then(res => {
            personalizedItemImage.src = "data:image/jpg;base64," + res;
            personalizedItemImage.classList.add("personalizeditem-image");
            personalizedItemsDiv.appendChild(personalizedItemImage);
        })
        //Bottom
        let personalizedItemWrapper = document.createElement("div");
        let personalizedItemName = document.createElement("a");
        personalizedItemName.innerHTML = personalizedItems[i].name;
        personalizedItemName.href = "/item/" + personalizedItems[i]._id + "/" + getToken();
        let personalizedItemDescription = document.createElement("p");
        personalizedItemDescription.innerHTML = personalizedItems[i].description;
        let personalizedItemPrice = document.createElement("h3");
        personalizedItemPrice.innerHTML = personalizedItems[i].price;
        personalizedItemWrapper.appendChild(personalizedItemName);
        personalizedItemWrapper.appendChild(personalizedItemDescription);
        personalizedItemWrapper.appendChild(personalizedItemPrice);
        personalizedItemWrapper.classList.add("personalizeditem-wrapper");
        
        personalizedItemsDiv.appendChild(personalizedItemWrapper);

        displayPersonalizedItem(personalizedItemsDiv);
    }
}

function displayPersonalizedItem(personalizedItemsDiv) {
    personalizedItemsDisplayGrid.appendChild(personalizedItemsDiv);
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
            description: items[i].description,
            price: items[i].price,
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
    let splitItemDescription = item.description.split(" ");
    let splitItemName = item.name.split(" ");

    for (let i = 0; i < splitItemDescription.length; i++) {
        for (let j = 0; j < splitSearchInput.length; j++) {
            count += countSimilarDescriptionCharacters(splitItemDescription[i], splitSearchInput[j]);
        }
    }

    for (let i = 0; i < splitItemName.length; i++) {
        for (let j = 0; j < splitSearchInput.length; j++) {
            count += countSimilarNameCharacters(splitItemName[i], splitSearchInput[j]);
        }
    }
    return count;
}

function countSimilarDescriptionCharacters(itemDescription, searchInput) {
    let count = 0;
    for (let i = 0; i < itemDescription.length; i++) {
        for (let j = 0; j < searchInput.length; j++) {
            if (itemDescription.slice(i, i + 1).toLowerCase() == searchInput.slice(j, j + 1).toLowerCase()) {
                count++;
            }
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
    personalizedItemDisplayTitle.classList.remove("invisible");
    personalizedItems();
}

async function getNonPurchasedItems() {
    const response = await fetch("/getnonpurchaseditems/" + getToken(), {
        method: 'GET',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json());
    return response
}

async function personalizedItems() {
    const nonPurchasedItems = await getNonPurchasedItems();
    const user = await getUser();

    createUserItemsTags(sortItems(nonPurchasedItems, user.recentsearch));
}