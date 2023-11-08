const messageDisplay = document.querySelector(".message-display");

function getToken() {
    return window.location.href.split("/")[window.location.href.split("/").length - 1];
}

async function createUserItemsTags(messages) {
    for (let i = 0; i < messages.length; i++) {
        let messagesDiv = document.createElement("div");

        let messagesWrapper = document.createElement("div");

        let message = document.createElement("p");

        const username = await getUser().then(user => {
            return user.name
        })

        if (messages[i].receiver == username) {
            let messagesSenderLabel = document.createElement("h3");
            messagesSenderLabel.innerHTML = "Sent By:"
            let messagesSender = document.createElement("a");
            messagesSender.innerHTML = messages[i].sender;
            messagesSender.href = "/profileother/" + messages[i].sender + "/" + getToken();;

            messagesWrapper.appendChild(messagesSenderLabel);
            messagesWrapper.appendChild(messagesSender);
            messagesWrapper.appendChild(message);
        } else if (messages[i].sender == username) {
            let messagesReceiverLabel = document.createElement("h3");
            messagesReceiverLabel.innerHTML = "Sent To:"
            let messagesReceiver = document.createElement("a");
            messagesReceiver.innerHTML = messages[i].receiver;
            messagesReceiver.href = "/profileother/" + messages[i].receiver + "/" + getToken();

            messagesWrapper.appendChild(messagesReceiverLabel);
            messagesWrapper.appendChild(messagesReceiver);
            messagesWrapper.appendChild(message);
        }

        message.innerHTML = messages[i].message;
        //messagesWrapper.appendChild(messagesName);
        messagesWrapper.appendChild(message);

        //End
        let messagePermanentDeleteButton = document.createElement("button");
        messagePermanentDeleteButton.innerHTML = "Delete Message";
        messagePermanentDeleteButton.classList.add("message-delete-button");
        messagePermanentDeleteButton.addEventListener("click", () => {
            messageDisplay.removeChild(messagePermanentDeleteButton.parentElement);
            permanentDeleteMessage(messages[i]._id);
        })

        messagesDiv.appendChild(messagesWrapper);
        messagesDiv.appendChild(messagePermanentDeleteButton);
        messagesDiv.classList.add("messages-div");

        displayUserItems(messagesDiv);
    }
}

function displayUserItems(userItemsDiv) {
    messageDisplay.appendChild(userItemsDiv);
}

async function getCorrectTrashMessages() {
    const response = await fetch("/getcorrecttrashmessages/" + getToken(), {
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

async function permanentDeleteMessage(messageid) {
    const response = await fetch("/permanentdeletemessage/" + messageid + "/" + getToken(), {
        method: 'DELETE',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' }
    }).catch(e => alert(e))
    return response
}

getCorrectTrashMessages().then(messages => {
    createUserItemsTags(messages);
}).catch(e => {
    alert(e.message)
})