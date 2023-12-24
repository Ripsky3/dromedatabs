const deleteAccountButton = document.querySelector(".delete-account-button");
const sellingLink = document.querySelector(".main-option-selling");
const ratingsLink = document.querySelector(".main-option-ratings");

sellingLink.href = "/userpublicprofile/" + getToken();
ratingsLink.href = "/userpublicprofileratings/" + getToken();

deleteAccountButton.addEventListener("click", () => {
    deleteAccount().then(res => {
        if (res == "gohome") {
            window.location.href = "/";
        }
        if (res.error) {
            alert(res.error);
        }
    })
})

async function deleteAccount() {
    const response = await fetch("/deleteuser/" + getToken(), {
        method: 'DELETE',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json());
    return response
}

