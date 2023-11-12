const itemsDisplay = document.querySelector(".items-display");

function getToken() {
    return window.location.href.split("/")[window.location.href.split("/").length - 1];
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

        let cartItemRemoveButton = document.createElement("button");
        cartItemRemoveButton.innerHTML = "Remove from Cart";
        cartItemRemoveButton.addEventListener("click", () => {
            itemsDisplay.removeChild(cartItemRemoveButton.parentElement);
            removeItemFromCart(userItems[i]._id);
        });
        userItemDiv.appendChild(cartItemRemoveButton);
        

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

async function getUserCartItems() {
    const response = await fetch("/getusercartitems/" + getToken(), {
        method: 'GET',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json());
    return response
}

async function removeItemFromCart(item_id) {
    const response = await fetch("/removeitemfromcart/" + item_id + "/" + getToken(), {
        method: 'PATCH',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json());
    return response
}

getUserCartItems().then(userCartItems => {
    createUserItemsTags(userCartItems);
}).catch(e => {
    alert(e.error);
})