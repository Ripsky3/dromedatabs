const itemForm = document.querySelector(".item-form");
const summaryButton = document.querySelector(".main-option-summary");

const itemImageInput = document.querySelector(".item-image-input");
const itemNameInput = document.querySelector(".item-name-input");
const itemDescriptionInput = document.querySelector(".item-description-input");
const itemPriceInput = document.querySelector(".item-price-input");
const itemListButton = document.querySelector(".item-list-button");

summaryButton.href = "/profile/activity/summary/" + getToken();

itemForm.action = "/createitem/" + getToken();

function getToken() {
    return window.location.href.split("/")[window.location.href.split("/").length - 1];
}

/*async function createItem() {



    const file = itemImageInput.files[0];
    console.log(file)
    const base64 = await convertToBase64(file);

    const response = await fetch("/createitem/" + getToken(), {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            itemName:itemNameInput.value,
            itemDescription: itemDescriptionInput.value,
            itemPrice: itemPriceInput.value,
            itemFile: window.btoa(file)
        })
    }).then(res => res.json())
    return response;
}

function convertToBase64(file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file)
        fileReader.onload = () => {
            resolve(fileReader.result);
        };
        fileReader.onerror = (error) => {
            reject(error);
        }
    })
}

itemListButton.addEventListener("click", (e) => {
    e.preventDefault();
    createItem().then(res => {
        if (res.error) {
            alert(res.error);
        } else if (res.message == "good") {
            window.location.href = "/profile/activity/summary/" + getToken();
        }
    });
})*/