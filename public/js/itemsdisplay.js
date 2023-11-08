const itemDisplay = document.querySelector(".items-display");

function getToken() {
    return window.location.href.split("/")[window.location.href.split("/").length - 1];
}

async function getUserItems() {
    const response = await fetch("/getuseritems/" + getToken(), {
        method: 'GET',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json());
    return response
}

function createUserItemsTags(userItems) {
    for (let i = 0; i < userItems.length; i++) {
        let userItemDiv = document.createElement("div");

        //Beginning
        let userItemImage = document.createElement("img");

        //Middle
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

        //End
        let userItemDeleteButton = document.createElement("button");
        userItemDeleteButton.innerHTML = "Delete Item";
        userItemDeleteButton.classList.add("useritem-delete-button");
        userItemDeleteButton.addEventListener("click", () => {
            itemDisplay.removeChild(userItemDeleteButton.parentElement);
            deleteUserItem(userItems[i].name);
        })


        userItemDiv.appendChild(userItemImage);
        userItemDiv.appendChild(userItemsWrapper);
        userItemDiv.appendChild(userItemDeleteButton);
        userItemDiv.classList.add("useritem-div");

        displayUserItems(userItemDiv);
    }
}

function displayUserItems(userItemsDiv) {
    itemDisplay.appendChild(userItemsDiv);
}


async function deleteUserItem(itemName) {
    const response = await fetch("/deleteuseritem/" + itemName + "/" + getToken(), {
        method: 'DELETE',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json());
    return response
}

getUserItems().then(userItems => {
    createUserItemsTags(userItems);
}).catch(e => {
    console.log(e)
})