const itemsDisplay = document.querySelector(".items-display");
const activityLink = document.querySelector(".profile-option-activity");
const messageLink = document.querySelector(".profile-option-messages");
const accountLink = document.querySelector(".profile-option-account");

activityLink.href = "/profile/activity/summary/" + getToken();
messageLink.href = "/profile/messages/" + getToken();
accountLink.href = "/profile/account/" + getToken();

function getToken() {
    return window.location.href.split("/")[window.location.href.split("/").length - 1];
}

async function getUserSoldItems() {
    const response = await fetch("/getusersolditems/" + getToken(), {
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

        let userItemImage = document.createElement("img");
        userItemImage = await getItemImage(userItems[i]._id).then(res => {
            userItemImage.src = "data:image/jpg;base64," + res;
            userItemImage.classList.add("item-image");
            userItemDiv.appendChild(userItemImage);
        })

        let userItemsWrapper = document.createElement("div");
        let userItemName = document.createElement("h3");
        userItemName.innerHTML = userItems[i].name;
        let userItemDescription = document.createElement("p");
        userItemDescription.innerHTML = userItems[i].description;
        let userItemPrice = document.createElement("h3");
        userItemPrice.innerHTML = userItems[i].price;
        let shippingLabelButton = document.createElement("button");
        shippingLabelButton.innerHTML = "Print shipping label example template";
        shippingLabelButton.addEventListener("click", () => {
            generateShippingLabelPDF(userItems[i]._id);
        })

        userItemsWrapper.appendChild(userItemName);
        userItemsWrapper.appendChild(userItemDescription);
        userItemsWrapper.appendChild(userItemPrice);
        userItemsWrapper.appendChild(shippingLabelButton);
        userItemsWrapper.classList.add("useritem-wrapper");

        userItemDiv.appendChild(userItemsWrapper);

        displayUserItems(userItemDiv);
    }
}

function displayUserItems(userItemsDiv) {
    itemsDisplay.appendChild(userItemsDiv);
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

async function generateShippingLabelPDF(item_id) {
    const seller = await getSeller(item_id);
    const buyer = await getUser();
    let printWindow = window.open('', '', 'height=600,width=800');

    const winHtml = `<!DOCTYPE html>
    <html>
        <head>
            <link rel="stylesheet" type='text/css' href="/css/shippinglabel.css">
            <title>Shipping Label</title>
        </head>
        <body>
            <div class="shipping-label-container">
                <div class="shipping-label-divider shipping-label-company">
                    <div class="shipping-label-divider-divider">
                        <h1 class="shipping-label-p">P</h1>
                    </div>
                    <div class="shipping-label-divider-divider shipping-label-divider-divider-p">
                        <p class="shipping-label-company-info">US POSTAGE AND FEES PAID</p>
                        <p class="shipping-label-company-info">No date required</p>
                        <p class="shipping-label-company-info">1 lb Priority Mail Rate Local</p>
                        <p class="shipping-label-company-info">Commercial Base Pricing</p>
                        <p class="shipping-label-company-info">* FAKE SHIPPING LABEL *</p>
                    </div>
                    <div class="shipping-label-divider-divider shipping-label-divider-divider-mail">
                        <h4 class="shipping-label-company-mail">USPS PRIORITY MAIL</h4>
                    </div>
                </div>
                <div class="shipping-label-divider shipping-label-seller-info">
                    <div class="shipping-label-item-seller-info">
                        <div class="shipping-label-item-buyer-info-left">
                            <h4 class="shipping-label-item-buyer-ship-to">SHIPPED BY:</h4>
                        </div>
                        <div class="shipping-label-item-buyer-info-right">
                            <p class="shipping-label-item-seller-info-name">${seller.name}</p>
                            <p class="shipping-label-item-seller-info-postage"></p>
                            <p class="shipping-label-item-seller-info-address">${seller.address.latitude} + ${seller.address.longitude}</p>
                        </div>
                    </div>
                    <div class="shipping-label-item-buyer-info">
                        <div class="shipping-label-item-buyer-info-left">
                            <h4 class="shipping-label-item-buyer-ship-to">SHIP TO:</h4>
                        </div>
                        <div class="shipping-label-item-buyer-info-right">
                            <h4 class="shipping-label-item-buyer-message">NO POSTAGE NECCESSARY</h4>
                            <h4 class="shipping-label-item-buyer-message">POSTAGE HAS BEEN PREPAID BY</h4>
                            <p class="shipping-label-item-buyer-info-postage">Department</p>
                            <p class="shipping-label-item-buyer-info-name">${buyer.name}</p>
                            <p class="shipping-label-item-buyer-info-address">${buyer.address.latitude} + ${buyer.address.longitude}</p>
                        </div>
                    </div>
                </div>
                <div class="shipping-label-divider shipping-label-barcode c">
                    <h1 class="">Barcode:</h1>
                    <img src="/images/barcode.png" width=250px>
                </div>
            </div>
        </body>
    </html>`;
    
    printWindow.document.write(winHtml);
    
    setTimeout(() => {
        printWindow.print();
    }, 10);
    
}

async function getSeller(item_id) {
    const itemPurchasedUser = await getItemPurchasedUser(item_id);
    return itemPurchasedUser;
}

async function getItemPurchasedUser(item_id) {
    const response = await fetch("/getitempurchaseduser/" + item_id + "/" + getToken(), {
        method: 'GET',
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

getUserSoldItems().then(soldItems => {
    createUserItemsTags(soldItems);
}).catch(e => {
    console.log(e)
})