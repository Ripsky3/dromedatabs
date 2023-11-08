const itemDisplay = document.querySelector(".items-display");
const publicProfileTitle = document.querySelector(".public-profile-title");
const ratingsLink = document.querySelector(".main-option-ratings");

publicProfileTitle.innerHTML = "Public profile: " + getPublicProfileName();
ratingsLink.href = "/publicprofileratings/" + getPublicProfileName() + "/" + getToken();


function getToken() {
    return window.location.href.split("/")[window.location.href.split("/").length - 1];
}


function getPublicProfileName() {
    return window.location.href.split("/")[window.location.href.split("/").length - 2];
}

async function getUserItems() {
    const response = await fetch("/getpublicuseritems/" + getPublicProfileName(), {
        method: 'GET',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json());
    return response
}

async function createUserItemsTags(userItems) {
    for (let i = 0; i < userItems.length; i++) {
        if (userItems[i].purchased == false) {
            let userItemDiv = document.createElement("div");

            let itemImage = document.createElement("img");
            itemImage = await getItemImage(userItems[i]._id).then(res => {
                itemImage.src = "data:image/jpg;base64," + res;
                itemImage.classList.add("item-image");
                userItemDiv.appendChild(itemImage);
            })

            //Middle
            let userItemsWrapper = document.createElement("div");
            let userItemName = document.createElement("a");
            userItemName.innerHTML = userItems[i].name;
            userItemName.href = "/item/" + userItems[i]._id + "/" + getToken();
            let userItemDescription = document.createElement("p");
            userItemDescription.innerHTML = userItems[i].description;
            let userItemPrice = document.createElement("h3");
            userItemPrice.innerHTML = userItems[i].price;
            userItemsWrapper.appendChild(userItemName);
            userItemsWrapper.appendChild(userItemDescription);
            userItemsWrapper.appendChild(userItemPrice);
            userItemsWrapper.classList.add("useritem-wrapper");


            userItemDiv.appendChild(userItemsWrapper);

            userItemDiv.classList.add("useritem-div");

            displayUserItems(userItemDiv);
        }
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

getUserItems().then(userItems => {
    createUserItemsTags(userItems);
}).catch(e => {
    console.log(e)
})