const mongoose = require('mongoose');

// Figure out how to store item image in schema
const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true  
    },
    description: {
        type: String,
        required: true,
        trim: true  
    },
    price: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            let dollarSignCount = 0;
            let periodCount = 0;
            for (let i = 0; i < value.length; i++) {
                if (value.slice(i, i + 1) == "0" ||
                value.slice(i, i + 1) == "1" ||
                value.slice(i, i + 1) == "2" ||
                value.slice(i, i + 1) == "3" ||
                value.slice(i, i + 1) == "4" ||
                value.slice(i, i + 1) == "5" ||
                value.slice(i, i + 1) == "6" ||
                value.slice(i, i + 1) == "7" ||
                value.slice(i, i + 1) == "8" ||
                value.slice(i, i + 1) == "9" ||
                value.slice(i, i + 1) == "$" ||
                value.slice(i, i + 1) == "." ) {
                    
                } else {
                    throw new Error("Only non-number characters allowed are $ and .");
                }
                if (value.slice(i, i + 1) == "$") {
                    dollarSignCount += 1;
                }
                if (value.slice(i, i + 1) == ".") {
                    periodCount += 1;
                    if (value.length > i + 3) {
                        throw new Error("Enter correct money amount");
                    }
                }
            }
            if (dollarSignCount > 1 ) {
                throw new Error("You can only have one $");
            }
            if (periodCount > 1) {
                throw new Error("You can only have one period");
            }
        }  
    },
    priceincents: {
        type: Number,
        required: true
    },
    image: {
        type: Buffer,
        required: true
    },
    username: {
        type: String,
        required: true,
        trim: true  
    },
    purchased: {
        type: Boolean,
        default: false,
    },
    purchaseduser: {
        type: String
    },
    topsearch: {
        type: Number,
        default: 0
    },
    cartusers: [{
        cartuser: {
            type: String
        }
    }],
    received: {
        type: Boolean,
        default: false
    }
})

itemSchema.methods.generateCartUser = async function(username)  {
    this.cartusers.push({cartuser: username});
    await this.save();
    return username;
}

const Item = mongoose.model("Item", itemSchema);

module.exports = Item