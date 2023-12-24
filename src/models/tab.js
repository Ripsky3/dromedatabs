const mongoose = require('mongoose');


const tabSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    tabarray: [],
    owner: {
        type: String,
        required: true
    },
    posted: {
        type: Boolean,
        default: false
    },
    topsearch: {
        type: Number,
        default: 0
    }
})

tabSchema.methods.addTabStrings = async function(tabStringArray)  {
    let startingNewTabRow = true;
    let tempTabRow = [];

    for (let i = 0; i < tabStringArray.length; i++) {
        if (i % 4 == 0 & i != 0) {
            this.tabarray.push({
                tabrow: tempTabRow
            })
            startingNewTabRow = true;
        } else {
            startingNewTabRow = false;
        }
        if (startingNewTabRow == true) {
            tempTabRow = [];
        }
        tempTabRow.push(tabStringArray[i])           
    }
    this.tabarray.push({
        tabrow: tempTabRow
    })

}

tabSchema.methods.deleteOldTabStrings = async function()  {
    this.tabarray = []
}

const Tab = mongoose.model("Tab", tabSchema);

module.exports = Tab