const listItemLink = document.querySelector(".list-item-link");
const sellingInfoLinkActive = document.querySelector(".selling-info-link-active");
const sellingInfoLinkSold = document.querySelector(".selling-info-link-sold");
const activityLink = document.querySelector(".profile-option-activity");
const messageLink = document.querySelector(".profile-option-messages");
const accountLink = document.querySelector(".profile-option-account");

let activeNum = document.querySelector(".selling-info-active-num");
let soldNum = document.querySelector(".selling-info-sold-num");
let totalNum = document.querySelector(".selling-info-90daytotal");

activityLink.href = "/profile/activity/summary/" + getToken();
messageLink.href = "/profile/messages/" + getToken();
accountLink.href = "/profile/account/" + getToken();


sellingInfoLinkActive.href = "/profile/activity/selling/active/" + getToken();
sellingInfoLinkSold.href = "/profile/activity/selling/sold/" + getToken();

sellingInfoLinkActive.href = "/profile/activity/selling/active/" + getToken();
sellingInfoLinkSold.href = "/profile/activity/selling/sold/" + getToken();

listItemLink.href = "/profile/activity/selling/listitemform/" + getToken();

function getToken() {
    return window.location.href.split("/")[window.location.href.split("/").length - 1];
}

const itemDisplay = document.querySelector(".items-display");

async function getUserItems() {
    const response = await fetch("/getuseritems/" + getToken(), {
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
    itemDisplay.appendChild(userItemsDiv);
}

function setSellingInfoNumber(userItems) {
    let activeNumCount = 0;
    let soldNumCount = 0;
    let totalNumCount = parseFloat("0");
    for (let i = 0; i < userItems.length; i++) {
        if (userItems[i].purchased == true) {
            totalNumCount += getPrice(userItems[i].price.split(""));
            soldNumCount += 1;
        } else {
            activeNumCount += 1;
        }
    }
    activeNum.innerHTML = `${activeNumCount}`;
    soldNum.innerHTML = `${soldNumCount}`;
    totalNum.innerHTML = "$" + `${totalNumCount.toString().slice(0, totalNumCount.toString().indexOf(".") + 3)}`;
}

function getPrice(arr) {
    let dollarIndex;
    let periodIndex;
    let price = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == "$") {
            dollarIndex = i;
        }
        if (arr[i] == ".") {
            periodIndex = i;
        }
    }
    price += parseFloat(arr.slice(dollarIndex + 1, periodIndex).join(""));
    price += parseFloat(arr.slice(periodIndex + 1).join("")) * .01;
    return price;
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
    setSellingInfoNumber(userItems);
}).catch(e => {
    console.log(e)
})