const mainDisplay = document.querySelector(".main-display");

const username = document.querySelector(".username");
const usernameEditButton = document.querySelector(".edit-username-info-button");
const email  = document.querySelector(".email");
const emailEditButton = document.querySelector(".edit-email-info-button");
const password = document.querySelector(".password");
const passwordEditButton = document.querySelector(".edit-password-info-button");
const addressLink = document.querySelector(".address-link");

const usernameForm = document.querySelector(".username-form");
const usernameCancelButton = document.querySelector(".username-cancel-button");
const emailForm = document.querySelector(".email-form");
const emailCancelButton = document.querySelector(".email-cancel-button");
const passwordForm = document.querySelector(".password-form");
const passwordCancelButton = document.querySelector(".password-cancel-button");

const usernameInput = document.querySelector(".username-input");
const usernameFormButton = document.querySelector(".username-form-button");
const emailInput = document.querySelector(".email-input");
const emailFormButton = document.querySelector(".email-form-button");
const oldPasswordInput = document.querySelector(".old-password-input");
const newPasswordInput = document.querySelector(".new-password-input");
const passwordFormButton = document.querySelector(".password-form-button");
const updateAddressButton = document.querySelector(".update-address-button");

usernameEditButton.addEventListener("click", () => {
    usernameEditButton.classList.add("invisible");
    username.classList.add("invisible");
    usernameForm.classList.remove("invisible");
    usernameCancelButton.classList.remove("invisible");
})

usernameCancelButton.addEventListener("click", () => {
    usernameEditButton.classList.remove("invisible");
    username.classList.remove("invisible");
    usernameForm.classList.add("invisible");
    usernameCancelButton.classList.add("invisible");
    usernameInput.value = ""
})

emailEditButton.addEventListener("click", () => {
    emailEditButton.classList.add("invisible");
    email.classList.add("invisible");
    emailForm.classList.remove("invisible");
    emailCancelButton.classList.remove("invisible");
})

emailCancelButton.addEventListener("click", () => {
    emailEditButton.classList.remove("invisible");
    email.classList.remove("invisible");
    emailForm.classList.add("invisible");
    emailCancelButton.classList.add("invisible");
    emailInput.value = "";
})

passwordEditButton.addEventListener("click", () => {
    passwordEditButton.classList.add("invisible");
    password.classList.add("invisible");
    passwordForm.classList.remove("invisible");
    passwordCancelButton.classList.remove("invisible");
})

passwordCancelButton.addEventListener("click", () => {
    passwordEditButton.classList.remove("invisible");
    password.classList.remove("invisible");
    passwordForm.classList.add("invisible");
    passwordCancelButton.classList.add("invisible");
    oldPasswordInput.value = "";
    newPasswordInput.value = "";
})

usernameFormButton.addEventListener("click", async () => {
    usernameEditButton.classList.remove("invisible");
    username.classList.remove("invisible");
    usernameForm.classList.add("invisible");
    usernameCancelButton.classList.add("invisible");

    if (usernameInput.value == "") {
        alert("You must enter a username");
    }
    const response = await fetch("/updateusername/" + usernameInput.value + "/" + getToken(), {
        method: 'GET',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' }
    }).catch(e => alert(e));
    usernameInput.value = "";
})

emailFormButton.addEventListener("click", async () => {
    emailEditButton.classList.remove("invisible");
    email.classList.remove("invisible");
    emailForm.classList.add("invisible");
    emailCancelButton.classList.add("invisible");
    if (emailInput.value == "") {
        alert("You must enter an email");
    } else {
        updateUserEmail().then(res => {
            if (res.error) {
                alert (res.error);
            }           
        })
    }
    emailInput.value = ""
})

passwordFormButton.addEventListener("click", async () => {
    passwordEditButton.classList.remove("invisible");
    password.classList.remove("invisible");
    passwordForm.classList.add("invisible");
    passwordCancelButton.classList.add("invisible");
    if (oldPasswordInput.value == "" || newPasswordInput.value == "") {
        alert("You must enter both your old and new password");
    } else {
        updateUserPassword(oldPasswordInput.value, newPasswordInput.value).then(res => {
            if (res.error) {
                alert (res.error);
            }       
        })
    }
    oldPasswordInput.value = "";
    newPasswordInput.value = "";
})

updateAddressButton.addEventListener("click", async () => {
    if (!navigator.geolocation) {
        throw new Error({error: "Geolocation is not supported by your browser"});
    }
    let latitude;
    let longitude;
    const geo = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((position) => {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
            resolve();
            if (!latitude || !longitude) {
                reject();
            }
        });  
    })
    await geo;
    updateUserAddress(latitude, longitude).then(res => {
        if (res.error) {
            alert(res.error);
        } else {
            addressLink.href = "https://google.com/maps?q=" + latitude + "," + longitude
        }
    })

})

async function updateUserAddress(latitude, longitude) {
    const response = await fetch("/updateuseraddress/" + getToken(), {
        method: 'PATCH',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            latitude: latitude.toString(),
            longitude: longitude.toString()
        })
    }).then(res => res.json());
    return response
}

async function updateUserEmail() {
    const response = await fetch("/updateuseremail/" + emailInput.value + "/" + getToken(), {
        method: 'GET',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json());
    return response
}

async function updateUserPassword(oldpassword, newpassword) {
    const response = await fetch("/updateuserpassword/" + oldpassword + "/" + newpassword + "/" + getToken(), {
        method: 'GET',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json());
    return response
}


async function nameInfoTags() {
    const user = await getUser().then(user => {
        return user
    });
    username.innerHTML = user.name;
    email.innerHTML = user.email;
}

async function getUser() {
    const response = await fetch("/user/" + getToken(), {
        method: 'GET',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json());
    return response
}

nameInfoTags();

function getToken() {
    return window.location.href.split("/")[window.location.href.split("/").length - 1];
}

getUser().then(user => {
    addressLink.href = "https://google.com/maps?q=" + user.address.latitude + "," + user.address.longitude;
})
