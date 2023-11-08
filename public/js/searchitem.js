const itemSearchDisplay = document.querySelector(".items-search-display");
const searchInput = document.querySelector(".header-search-box-input");
const searchButton = document.querySelector(".header-search-box-search-button");

searchInput.addEventListener("keyup", () => {
    searchButton.href = "/itemsearch/" + searchInput.value + "/" + getToken();
})

searchButton.addEventListener("click", () => {
    if (!searchInput.value.length > 0) {
        return alert("You must search something");
    }
})


async function getNonPurchasedItems() {
    const response = await fetch("/getnonpurchaseditems/" + getToken(), {
        method: 'GET',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json());
    return response
}

function getToken() {
    return window.location.href.split("/")[window.location.href.split("/").length - 1];
}

function getSearchedInput() {
    return window.location.href.split("/")[window.location.href.split("/").length - 2];
}

function sortItems(items) {
    let sortedItems = [];
    let count = 0;
    for (let i = 0; i < items.length; i++) {
        count += countSimilarWords(items[i], getSearchedInput());
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

async function createItemsTags(items) {
    for (let i = 0; i < items.length; i++) {
        let itemDiv = document.createElement("div");
        itemDiv.classList.add("item-div");

        //Beginning
        let itemImage = document.createElement("img");
        itemImage = await getItemImage(items[i]._id).then(res => {
            itemImage.src = "data:image/jpg;base64," + res;
            itemImage.classList.add("item-image");
            itemDiv.appendChild(itemImage);
        })

        //Middle
        let itemsWrapper = document.createElement("div");
        let itemName = document.createElement("a");
        itemName.innerHTML = items[i].name;
        itemName.classList.add("item-name")
        itemName.href = "/item/" + items[i]._id + "/" + getToken();
        let itemDescription = document.createElement("p");
        itemDescription.innerHTML = items[i].description;
        let itemPrice = document.createElement("h3");
        itemPrice.innerHTML = items[i].price;
        itemsWrapper.appendChild(itemName);
        itemsWrapper.appendChild(itemDescription);
        itemsWrapper.appendChild(itemPrice);

        itemDiv.appendChild(itemsWrapper);
        itemsWrapper.classList.add("item-wrapper");

        displayItems(itemDiv);
    }
}

function displayItems(itemsDiv) {
    itemSearchDisplay.appendChild(itemsDiv);
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

getNonPurchasedItems().then(items => {
    createItemsTags(sortItems(items));
}).catch(e => {
    alert(e.message);
})

async function updateRecentSearch(recentSearch) {
    const response = await fetch("/updaterecentsearch/" + recentSearch + "/" + getToken(), {
        method: 'GET',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json());
    return response
}

updateRecentSearch(getSearchedInput()).then(res => {
    if (res.error) {
        alert(res.error);
    }
})