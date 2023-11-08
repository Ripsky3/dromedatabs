const sellerName = document.querySelector(".seller-name");
const publicProfileLink = document.querySelector(".public-profile-link");
const rateLink = document.querySelector(".rate-link");
const messageLink = document.querySelector(".message-link");


async function getItem() {
    const response = await fetch("/getitem/" + getItemName(), {
        method: 'GET',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json());
    return response;
}

function getItemName() {
    return window.location.href.split("/")[window.location.href.split("/").length - 1];
}

function nameItemTags(item) {
    sellerName.innerHTML = item[0].username;
    publicProfileLink.innerHTML = item[0].username;
    publicProfileLink.href = "/publicprofilenoauth/" + item[0].username;
    rateLink.href = "/signup";
    messageLink.href = "/signup";
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