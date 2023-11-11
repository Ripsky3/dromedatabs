const buyCartButton = document.querySelector(".buy-cart-button");



buyCartButton.addEventListener("click", (e) => {
    e.preventDefault();
    buyCartItems();
})

async function buyCartItems() {
    const userCartItems = await jsonUserCartItems();
    const cartItemsForStripe = await jsonCartItemsForStripe();
    let cartItemsForStripeArray = [];
    cartItemsForStripe.forEach((value, key, map) => {
        cartItemsForStripeArray.push({key, value});
    })
    fetch("/buycartitems/" + getToken(), {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userCartItems,
            cartItemsForStripeArray
        })
    }).then(res => {
        if (res.ok) return res.json()
        return res.json().then(json => Promise.reject(json));
    }).then(({url}) => {
        window.location = url;
    }).catch(e => {
        alert(e.error);
    })
}

function getToken() {
    return window.location.href.split("/")[window.location.href.split("/").length - 1];
}

// Figure out how to get usercart items to checkout with stripe
async function getUserCartItems() {
    const response = await fetch("/getusercartitems/" + getToken(), {
        method: 'GET',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json());
    return response
}

async function jsonUserCartItems() {
    const userItems = await getUserCartItems();
    const userItemsArray = [];
    for (let i = 0; i < userItems.length; i++) {
        userItemsArray.push({
            id: userItems[i]._id,
            quantity: 1
        })
    }
    return userItemsArray;
}

async function getAllItems() {
    const response = await fetch("/getallitems/" + getToken(), {
        method: 'GET',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json());
    return response;
}

async function jsonCartItemsForStripe() {
    const allItems = await getAllItems() 
    const cartItemsForStripe = new Map([]);
    for (let i = 0; i < allItems.length; i++) {
        cartItemsForStripe.set(allItems[i]._id, {priceincents: allItems[i].priceincents, name: allItems[i].name});
    }
    return cartItemsForStripe;
}
