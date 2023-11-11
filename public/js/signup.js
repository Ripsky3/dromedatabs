const userForm = document.querySelector(".user-form");
const userFormButton = document.querySelector(".user-form-button");
const usernameInput = document.querySelector(".username-input");
const emailInput = document.querySelector(".email-input");
const passwordInput = document.querySelector(".password-input");

userFormButton.addEventListener("click", (e) => {
    e.preventDefault();
    createUser().then(res => {
        if (res.error) {
            alert(res.error);
        } else if (res.token) {
            window.location.href = "/home/" + res.token;
        }
    })
})

async function createUser() {
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
    const response = await fetch("/createuser", {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: usernameInput.value,
            email: emailInput.value,
            password: passwordInput.value,
            latitude: latitude.toString(),
            longitude: longitude.toString()
        })
    }).then(res => res.json());
    return response
}

