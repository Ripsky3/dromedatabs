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

function getToken() {
    return window.location.href.split("/")[window.location.href.split("/").length - 1];
}

function getItemName() {
    return window.location.href.split("/")[window.location.href.split("/").length - 2];
}

function nameItemTags(item) {
    itemName.innerHTML = item[0].name;
    itemDescription.innerHTML = item[0].description;
    itemPrice.innerHTML = item[0].price;
    itemUserLink.innerHTML = item[0].username
    itemUserLink.href = "/seller/" + getItemName() + "/" + getToken();
}

itemBuy.addEventListener("click", (e) => {
    e.preventDefault();
    getItemInfo();
})

if (getToken().length > 30) {
    console.log("GetToken greater than 30")
    getItem().then(item => {
        nameItemTags(item);
    })
} else {
    getItemGuest().then(item => {
        nameItemTags(item);
    }).catch(e => {
        alert(e.message);
    })
    itemBuy.href = "/signin"
}

async function getItemInfo() {
    const item = await getItem();
    const user = await getUser();
    if (item[0].username == user.name) {
        alert("You can't buy your own item");
    } else {
        window.location.href = "/itembuy/" + getItemName() + "/" + getToken();
    }
}

async function getUser() {
    const response = await fetch("/user/" + getToken(), {
        method: 'GET',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json());
    return response
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