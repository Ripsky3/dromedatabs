const popularItemsDisplayGrid = document.querySelector(".popular-items-display-grid");
const popularItemsDisplay = document.querySelector(".popular-items-display");
const popularItemDisplayTitle = document.querySelector(".popular-items-display-title");

function getToken() {
    return window.location.href.split("/")[window.location.href.split("/").length - 1];
}

async function createPopularItemsTags(popularItems) {

    for (let i = 0; i < popularItems.length; i++) {

        let popularItemDiv = document.createElement("div");
        popularItemDiv.classList.add("popularitems-div");

        // Top
        let popularItemImage = document.createElement("img");
        popularItemImage = await getItemImage(popularItems[i]._id).then(res => {
            popularItemImage.src = "data:image/jpg;base64," + res;
            popularItemImage.classList.add("popularitem-image");
            popularItemDiv.appendChild(popularItemImage);
        })
        //Bottom
        let popularItemWrapper = document.createElement("div");
        let popularItemName = document.createElement("a");
        popularItemName.innerHTML = popularItems[i].name;
        if (getToken().length > 30) {
            popularItemName.href = "/item/" + popularItems[i]._id + "/" + getToken();
        } else {
            popularItemName.href = "/item/" + popularItems[i]._id;
        }
        let popularItemDescription = document.createElement("p");
        popularItemDescription.innerHTML = popularItems[i].description;
        let popularItemPrice = document.createElement("h3");
        popularItemPrice.innerHTML = popularItems[i].price;
        popularItemWrapper.appendChild(popularItemName);
        popularItemWrapper.appendChild(popularItemDescription);
        popularItemWrapper.appendChild(popularItemPrice);
        popularItemWrapper.classList.add("popularitem-wrapper");
        
        popularItemDiv.appendChild(popularItemWrapper);

        displayPopularItem(popularItemDiv);
    }
}

function displayPopularItem(popularItemsDiv) {
    popularItemsDisplayGrid.appendChild(popularItemsDiv);
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

async function getPopularItems() {
    const response = await fetch("/getpopularitems", {
        method: 'GET',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json());
    return response
}

getPopularItems().then(popularItems => {
    popularItemDisplayTitle.classList.remove("invisible");
    createPopularItemsTags(popularItems);
})