const deleteAccountButton = document.querySelector(".delete-account-button");

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

