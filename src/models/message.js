const mongoose = require('mongoose');

// Figure out how to store item image in schema
const messageSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    receiver: {
        type: String,
        required: true
    },
    sender: {
        type: String,
        required: true
    },
    trashreceiver: {
        type: Boolean,
        default: false
    },
    trashsender: {
        type: Boolean,
        default: false
    },
    permanenttrashreceiver: {
        type: Boolean,
        default: false
    },
    permanenttrashsender: {
        type: Boolean,
        default: false
    },
})

const Message = mongoose.model("Message", messageSchema);

module.exports = Message