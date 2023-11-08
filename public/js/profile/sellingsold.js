const itemsDisplay = document.querySelector(".items-display");
const activityLink = document.querySelector(".profile-option-activity");
const messageLink = document.querySelector(".profile-option-messages");
const accountLink = document.querySelector(".profile-option-account");

activityLink.href = "/profile/activity/summary/" + getToken();
messageLink.href = "/profile/messages/" + getToken();
accountLink.href = "/profile/account/" + getToken();

function getToken() {
    return window.location.href.split("/")[window.location.href.split("/").length - 1];
}

async function getUserSoldItems() {
    const response = await fetch("/getusersolditems/" + getToken(), {
        method: 'GET',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json());
    return response
}

async function createUserItemsTags(userItems) {
    for (let i = 0; i < userItems.length; i++) {
        let userItemDiv = document.createElement("div");
        userItemDiv.classList.add("useritem-div");

        let userItemImage = document.createElement("img");
        userItemImage = await getItemImage(userItems[i]._id).then(res => {
            userItemImage.src = "data:image/jpg;base64," + res;
            userItemImage.classList.add("item-image");
            userItemDiv.appendChild(userItemImage);
        })

        let userItemsWrapper = document.createElement("div");
        let userItemName = document.createElement("h3");
        userItemName.innerHTML = userItems[i].name;
        let userItemDescription = document.createElement("p");
        userItemDescription.innerHTML = userItems[i].description;
        let userItemPrice = document.createElement("h3");
        userItemPrice.innerHTML = userItems[i].price;
        userItemsWrapper.appendChild(userItemName);
        userItemsWrapper.appendChild(userItemDescription);
        userItemsWrapper.appendChild(userItemPrice);
        userItemsWrapper.classList.add("useritem-wrapper");

        userItemDiv.appendChild(userItemsWrapper);

        displayUserItems(userItemDiv);
    }
}

function displayUserItems(userItemsDiv) {
    itemsDisplay.appendChild(userItemsDiv);
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

async function deleteUserItem(itemName) {
    const response = await fetch("/deleteuseritem/" + itemName + "/" + getToken(), {
        method: 'DELETE',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json());
    return response
}

getUserSoldItems().then(soldItems => {
    createUserItemsTags(soldItems);
}).catch(e => {
    console.log(e)
})