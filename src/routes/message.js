const express = require("express");
const router = new express.Router();
const Message = require("../models/message");
const Item = require("../models/item");
const auth = require("../middleware/auth");

router.get("/profile/messages/:token", auth, async (req, res) => {
    res.render("profilemessages");
})

router.get("/profile/messages/sent/:token", auth, async (req, res) => {
    res.render("profilemessagessent");
})

router.get("/profile/messages/received/:token", auth, async (req, res) => {
    res.render("profilemessagesreceived");
})

router.get("/profile/messages/trash/:token", auth, async (req, res) => {
    res.render("profilemessagestrash");
})

router.get("/seller/message/:item_id/:token", auth, async (req, res) => {
    res.render("profilesellermessage");
})

router.get("/sellernoauth/message/:item_id", async (req, res) => { ///
    res.render("profilesellermessagenoauth");
})

router.post("/seller/message/:item_id/:token", auth, async (req, res) => {
    try {
        const item = await Item.find({_id: req.params.item_id});
        const message = new Message({
            message: req.body.message,
            receiver: item[0].username,
            sender: req.user.name
        })
        await message.save();
        res.redirect("/profile/activity/summary/" + req.params.token)
    } catch (e) {
        
    }  
})

router.get("/getallusermessages/:token", auth, async (req, res) => {
    try {
        const messages = await Message.find({});
        const filteredMessages = [];
        for (let i = 0; i < messages.length; i++) {
            if (messages[i].sender == req.user.name && messages[i].trashsender == false && messages[i].permanenttrashsender == false) {
                filteredMessages.push(messages[i]);
            }
            if (messages[i].receiver == req.user.name && messages[i].trashreceiver == false && messages[i].permanenttrashreceiver == false) {
                filteredMessages.push(messages[i]);
            }
        }
        res.send(filteredMessages);
    } catch (e) {
        res.send(e);
    }  
})

router.get("/getreceivedmessages/:token", auth, async (req, res) => {
    try {
        const messages = await Message.find({});
        const filteredMessages = [];
        for (let i = 0; i < messages.length; i++) {
            if (messages[i].receiver == req.user.name && messages[i].trashreceiver == false && messages[i].permanenttrashreceiver == false) {
                filteredMessages.push(messages[i]);
            }
        }
        res.send(filteredMessages);
    } catch (e) {
        res.send(e);
    }  
})

router.get("/getsentmessages/:token", auth, async (req, res) => {
    try {
        const messages = await Message.find({});
        const filteredMessages = [];
        for (let i = 0; i < messages.length; i++) {
            if (messages[i].sender == req.user.name && messages[i].trashsender == false && messages[i].permanenttrashsender == false) {
                filteredMessages.push(messages[i]);
            }
        }
        res.send(filteredMessages);
    } catch (e) {
        res.send(e);
    }  
})

router.get("/trashmessage/:id/:token", auth, async (req, res) => {
    try {
        const message = await Message.findOne({_id: req.params.id});
        if (req.user.name == message.receiver) {
            const updatedMessage = await Message.findOneAndUpdate({_id: req.params.id}, {trashreceiver: true});
            updatedMessage.save();
        } else if (req.user.name == message.sender) {
            const updatedMessage = await Message.findOneAndUpdate({_id: req.params.id}, {trashsender: true});
            updatedMessage.save();
        }       
        
        res.send(message);
    } catch (e) {
        res.send(e);
    }  
})

router.get("/getcorrecttrashmessages/:token", auth, async (req, res) => {
    try {
        const messages = await Message.find({});
        const filteredMessages = [];
        for (let i = 0; i < messages.length; i++) {
            if (messages[i].sender == req.user.name && messages[i].trashsender == true && messages[i].permanenttrashsender == false) {
                filteredMessages.push(messages[i]);
            }
            if (messages[i].receiver == req.user.name && messages[i].trashreceiver == true && messages[i].permanenttrashreceiver == false) {
                filteredMessages.push(messages[i]);
            }
        }
        res.send(filteredMessages);
    } catch (e) {
        res.send(e);
    }  
})

router.delete("/permanentdeletemessage/:id/:token", auth, async (req, res) => {
    try {
        const message = await Message.findOne({_id: req.params.id});
        if (message.permanenttrashreceiver == true && message.permanenttrashsender == true) {
            const deletedMessage = await Message.findOneAndDelete({_id: req.params.id});
            deletedMessage.save();
        }
        if (req.user.name == message.receiver) {
            const updatedMessage = await Message.findOneAndUpdate({_id: req.params.id}, {permanenttrashreceiver: true});
            updatedMessage.save();
        } else if (req.user.name == message.sender) {
            const updatedMessage = await Message.findOneAndUpdate({_id: req.params.id}, {permanenttrashsender: true});
            updatedMessage.save();
        }       
        await message.save();
        res.send(message);
    } catch (e) {
        res.send(e);
    }  
})

module.exports = {
    messageRouter: router
}