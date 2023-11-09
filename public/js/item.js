const itemUserLink = document.querySelector(".item-user-link");
const itemName = document.querySelector(".item-name");
const itemPrice = document.querySelector(".item-price");
const itemDescription = document.querySelector(".item-description");
const itemAddToCart = document.querySelector(".item-add-to-cart");

async function getItem() {
    const response = await fetch("/getitem/" + getItem_Id() + "/" + getToken(), {
        method: 'GET',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json());
    return response;
}

function getToken() {
    return window.location.href.split("/")[window.location.href.split("/").length - 1];
}

function getItem_Id() {
    return window.location.href.split("/")[window.location.href.split("/").length - 2];
}

function nameItemTags(item) {
    itemName.innerHTML = item[0].name;
    itemDescription.innerHTML = item[0].description;
    itemPrice.innerHTML = item[0].price;
    itemUserLink.innerHTML = item[0].username
    itemUserLink.href = "/seller/" + getItem_Id() + "/" + getToken();
}

itemAddToCart.addEventListener("click", (e) => {
    e.preventDefault();
    getItemInfo();
})

if (getToken().length > 30) {
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
        alert("You can't add your own item to your cart");
    } else {
        updateCartUser().then(res => {
            if (res.error) {
                alert(res.error);
            } else {
                window.location.href = "/profile/activity/summary/" + getToken();
            }
        })
    }
}

async function updateCartUser() {
    const response = await fetch("/itemaddtocart/" + getItem_Id() + "/" + getToken(), {
        method: 'PATCH',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json());
    return response
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