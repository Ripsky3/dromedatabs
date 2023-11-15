const messageDisplay = document.querySelector(".message-display");

function getToken() {
    return window.location.href.split("/")[window.location.href.split("/").length - 1];
}

function createUserItemsTags(messages) {
    for (let i = 0; i < messages.length; i++) {
        let messagesDiv = document.createElement("div");

        let messagesWrapper = document.createElement("div");

        let messagesSenderLabel = document.createElement("h3");
        messagesSenderLabel.innerHTML = "Sent By:"
        let messagesSender = document.createElement("a");
        messagesSender.innerHTML = messages[i].sender;
        messagesSender.href = "/publicprofile/" + messages[i].sender + "/" + getToken();

        let message = document.createElement("p");
        message.innerHTML = messages[i].message;

        messagesWrapper.appendChild(messagesSenderLabel);
        messagesWrapper.appendChild(messagesSender);
        messagesWrapper.appendChild(message);

        //End
        let messageTrashButton = document.createElement("button");
        messageTrashButton.innerHTML = "Delete Message";
        messageTrashButton.classList.add("message-delete-button");
        messageTrashButton.addEventListener("click", () => {
            messageDisplay.removeChild(messageTrashButton.parentElement);
            trashMessage(messages[i]._id);
        })

        messagesDiv.appendChild(messagesWrapper);
        messagesDiv.appendChild(messageTrashButton);
        messagesDiv.classList.add("messages-div");

        displayUserItems(messagesDiv);
    }
}

function displayUserItems(userItemsDiv) {
    messageDisplay.appendChild(userItemsDiv);
}

async function getReceivedMessages() {
    const response = await fetch("/getreceivedmessages/" + getToken(), {
        method: 'GET',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json());
    return response
}

async function trashMessage(messageId) {
    const response = await fetch("/trashmessage/" + messageId + "/" + getToken(), {
        method: 'GET',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' }
    }).catch(e => alert(e.message));
    return response
}

getReceivedMessages().then(messages => {
    createUserItemsTags(messages);
}).catch(e => {
    alert(e)
})