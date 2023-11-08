const itemName = document.querySelector(".item-name");
const itemPrice = document.querySelector(".item-price");
const itemDescription = document.querySelector(".item-description");
const itemUser = document.querySelector(".item-user");

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
    itemUser.innerHTML = item[0].username;
    itemUser.href = "/seller/" + getItemName() + '/' + getToken();
}


getItem().then(item => {
    nameItemTags(item);
}).catch(e => {
    alert(e.message);
})






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