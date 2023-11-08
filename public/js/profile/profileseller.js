const sellerName = document.querySelector(".seller-name");
const publicProfileLink = document.querySelector(".public-profile-link");
const rateLink = document.querySelector(".rate-link");
const messageLink = document.querySelector(".message-link");


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

async function nameItemTags(item) {
    sellerName.innerHTML = item[0].username;
    publicProfileLink.innerHTML = item[0].username;
    publicProfileLink.href = "/publicprofile/" + item[0].username + "/" + getToken();
    const user = await getUser();
    if (user.name == item[0].username) {
        rateLink.addEventListener("click", () => {
            alert("You can't rate yourself");
        })
        messageLink.addEventListener("click", () => {
            alert("You can't message yourself");
        })
    } else {
        rateLink.href = "/seller/rate/" + getItemName() + "/" + getToken();
        messageLink.href = "/seller/message/" + getItemName() + "/" + getToken();
    }
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

async function getUser() {
    const response = await fetch("/user/" + getToken(), {
        method: 'GET',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json());
    return response
}