const express = require("express");
const router = new express.Router();
const Item = require("../models/item");
const auth = require("../middleware/auth")
const multer = require("multer");

const upload = multer({
    fileFilter(req, file, cb) {
        if (file.originalname.endsWith(".jpg") ||
        file.originalname.endsWith(".jpeg") ||
        file.originalname.endsWith(".png") ) {
            cb(undefined, true);
        } else {    
            cb(new Error("You must upload an image"))  
        }
    }
})

router.post("/createitem/:token", auth, upload.single("itemFile"), async (req, res) => { 
    try {
        const item = new Item({
            name: req.body.itemName,
            description: req.body.itemDescription,
            price: req.body.itemPrice,
            image: req.file.buffer,
            username: req.user.name
        })
        if (item.price.slice(0, 1) != "$") {
            item.price = "$" + item.price;
        }
        await item.save();
        res.redirect("/profile/activity/summary/" + req.params.token);
    } catch (e) {
        res.redirect("/createitemerror/enterallinputs/" + req.params.token);
    }
})

router.get("/createitemerror/:error/:token", auth, async (req, res) => {
    res.render("createitemerror");
})


router.get("/getallitems/:token", auth, async (req, res) => {
    try {
        const items = await Item.find({});
        res.send(items);
    } catch(e) {
        res.send(e.message);
    }
})

router.get("/getpurchaseditems/:token", auth, async (req, res) => {
    try {
        const items = await Item.find({purchased: true, purchaseduser: req.user.name});
        res.send(items);
    } catch(e) {
        res.send(e.message);
    }
})

router.get("/getnonpurchaseditems/:token", auth, async (req, res) => {
    try {
        const items = await Item.find({purchased: false});
        res.send(items);
    } catch(e) {
        res.send(e.message);
    }
})

router.get("/getnonpurchaseditemsguest", async (req, res) => {
    try {
        const items = await Item.find({purchased: false});
        res.send(items);
    } catch(e) {
        res.send(e.message);
    }
})

router.get("/getuseritems/:token", auth, async (req, res) => {
    try {
        const items = await Item.find({username: req.user.name});
        res.send(items);
    } catch(e) {
        res.send(e.message);
    }
})

router.get("/getitem/:item_id", async (req, res) => {
    try {
        const items = await Item.find({_id: req.params.item_id});
        res.send(items);
    } catch(e) {
        res.send(e.message);
    }
})

router.get("/getitem/:item_id/:token", auth, async (req, res) => {
    try {
        const items = await Item.find({_id: req.params.item_id});
        res.send(items);
    } catch(e) {
        res.send(e.message);
    }
})

router.delete("/deleteuseritem/:item_id/:token", auth, async (req, res) => {
    try {
        await Item.findOneAndDelete({username: req.user.name, _id: req.params.item_id});
        res.send(req.user.name)
    } catch(e) {
        res.send(e.message);
    }
})

router.get("/itemsearch/:searchinput/:token", auth, async (req, res) => {
    res.render("itemsearch");
})

router.get("/itemsearchguest/:searchinput", async (req, res) => {
    res.render("itemsearchguest");
})

router.get("/item/:item_id", async (req, res) => {
    res.render("itemnoauth");
})

router.get("/item/:item_id/:token", auth, async (req, res) => {
    res.render("item");
})

router.get("/itembuy/:item_id/:token", auth, async (req, res) => {
    try {
        /*const item = await Item.findOneAndUpdate({name: req.params.itemname});
        if (req.user.name == item.username) {
            throw new Error("You can't buy your own item");
        }*/
        const itemUpdate = await Item.findOneAndUpdate({_id: req.params.item_id}, {purchased: true, purchaseduser: req.user.name});
        await itemUpdate.save();
        res.render("purchaseditem");
    } catch(e) {
        res.send(e.message);
    }
})


router.get("/getuseractiveitems/:token", auth, async (req, res) => {
    try {
        const items = await Item.find({username: req.user.name, purchased: false});
        res.send(items);
    } catch(e) {
        res.send(e.message);
    }
})

router.get("/getusersolditems/:token", auth, async (req, res) => {
    try {
        const items = await Item.find({username: req.user.name, purchased: true});
        res.send(items);
    } catch(e) {
        res.send(e.message);
    }
})

router.get("/getuserunsolditems/:token", auth, async (req, res) => {
    try {  
        const items = await Item.find({username: req.user.name, purchased: false});
        res.send(items);
    } catch(e) {
        res.send(e.message);
    }
})

router.get("/getpublicuseritems/:username", async (req, res) => {
    try {
        const items = await Item.find({username: req.params.username})
        res.send(items)
    } catch(e) {
        res.send(e);
    }
    
})


router.get("/getitemimage/:id", async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);

        if (!item || !item.image) {
            throw new Error();
        }

        res.set("Content-Type", "application/json");
        var base64String = btoa(String.fromCharCode.apply(null, new Uint8Array(item.image.buffer)));
        res.send(base64String)
    } catch (e) {   
        res.status(404).send("can't find");
    }
})

function _arrayBufferToBase64( buffer ) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
}

router.get("/getuserpersonalizeditems/:token", auth, async (req, res) => {
    try {
        const item = await Item.find({});
        res.send(item)
        
    } catch (e) {   
        res.status(404).send("can't find");
    }
})


module.exports = {
    itemRouter: router
}