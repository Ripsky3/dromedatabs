const mainDisplay = document.querySelector(".main-display");
const activityLink = document.querySelector(".profile-option-activity");
const messageLink = document.querySelector(".profile-option-messages");
const accountLink = document.querySelector(".profile-option-account");

activityLink.href = "/profile/activity/summary/" + getToken();
messageLink.href = "/profile/messages/" + getToken();
accountLink.href = "/profile/account/" + getToken();

function getToken() {
    return window.location.href.split("/")[window.location.href.split("/").length - 1];
}

const itemDisplay = document.querySelector(".items-display");

async function getPurchasedItems() {
    const response = await fetch("/getpurchaseditems/" + getToken(), {
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

        //Beginning
        let userItemImage = document.createElement("img");
        userItemImage = await getItemImage(userItems[i]._id).then(res => {
            userItemImage.src = "data:image/jpg;base64," + res;
            userItemImage.classList.add("item-image");
            userItemDiv.appendChild(userItemImage);
        })

        //Middle
        let userItemsWrapper = document.createElement("div");
        let userItemName = document.createElement("a");
        userItemName.innerHTML = userItems[i].name;
        userItemName.href = "/profileitem/" + userItems[i]._id + "/"+ getToken();
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
    mainDisplay.appendChild(userItemsDiv);
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

getPurchasedItems().then(purchasedItems => {
    console.log(purchasedItems)
    createUserItemsTags(purchasedItems);
}).catch(e => {
    console.log(e)
})