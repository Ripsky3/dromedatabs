const itemUserLink = document.querySelector(".item-user-link");
const itemName = document.querySelector(".item-name");
const itemPrice = document.querySelector(".item-price");
const itemDescription = document.querySelector(".item-description");
const itemBuy = document.querySelector(".item-buy");

async function getItem() {
    const response = await fetch("/getitem/" + getItemName() + "/" + getToken(), {
        method: 'GET',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json());
    return response;
}

function getItemName() {
    return window.location.href.split("/")[window.location.href.split("/").length - 1]
    
}

function nameItemTags(item) {
    itemName.innerHTML = item[0].name;
    itemDescription.innerHTML = item[0].description;
    itemPrice.innerHTML = item[0].price;
    itemUserLink.innerHTML = item[0].username
    itemUserLink.href = "/seller/" + getItemName();
}

if (getToken().length > 30) {
    getItem().then(item => {
        nameItemTags(item);
    }).catch(e => {
        alert(e.message);
    })
    itemBuy.href = "/itembuy/" + getItemName() + "/" + getToken();
} else {
    getItemGuest().then(item => {
        nameItemTags(item);
    }).catch(e => {
        alert(e.message);
    })
    itemBuy.href = "/signin"
}




async function getItemGuest() {
    const response = await fetch("/getitem/" + getItemNameGuest(), {
        method: 'GET',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json());
    return response;
}

function getItemNameGuest() {
    return window.location.href.split("/")[window.location.href.split("/").length - 1];
}