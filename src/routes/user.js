const express = require("express");
const router = new express.Router();
const User = require("../models/user");
const Item = require("../models/item");
const auth = require("../middleware/auth")


router.get("", (req, res) => {
    res.render("home");
})

router.get("/home", async (req, res) => {
    res.render("home");
})

router.get("/home/:token", auth, async (req, res) => {
    res.render("home");
})

router.get("/signup", (req, res) => {
    res.render("signup");
})

router.get("/signin", (req, res) => {
    res.render("signin");
})

router.get("/error/:error", (req, res) => {
    res.render("error");
})

router.post("/createuser", async (req, res) => {
    let user;

    user = new User({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password
    }) 
    
    try {
        const token = await user.generateAuthToken();
        await user.save();
        res.status(201).send({token: token});
    } catch (e) {
        if (e.message.includes("email")) {
            res.status(500).send({error: "Email already exist"});
        } else if (e.message.includes("name")) {
            res.status(500).send({error: "Name already exist"});
        } else if (e.message.includes("password")) {
            res.status(500).send({error: "Password must be at least 7 characters long"});
        } else {
            res.status(500).send({error: "Make sure to enter valid information in all boxes"});
        }
    }
})

router.post("/signinuser", async (req, res) => {
    try {
        const user = await User.getUserByCredentials(req.body.name, req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        await user.save();
        
        if (!user) {
            throw new Error("Enter valid credentials");
        }

        res.send({token: token});
    } catch (e) {
        res.send({error: e.message});
    }
})

router.get("/signoutuser/:token", auth , async (req, res) => {
    const user = req.user;
    try {
        for (let i = 0; i < user.tokens.length; i++) {
            if (user.tokens[i].token == req.params.token) {
                user.tokens.splice(i, i + 1);
            }
        }
        await user.save();
        res.redirect("/");
    } catch (e) {
        res.redirect("/" + req.params.token);
    }

})

router.get("/user/:token", auth, async (req, res) => {
    res.send(req.user);
})

router.get("/profile/activity/summary/:token", auth, async (req, res) => {
    res.render("profilesummary");
})

router.get("/profile/activity/cart/:token", auth, async (req, res) => {
    res.render("profilecart");
})

router.get("/profile/activity/cart/checkout/:token", auth, async (req, res) => {
    res.render("profilecheckout");
})

router.get("/profile/activity/createnewtab/:token", auth, async (req, res) => {
    res.render("profiletabscreatenewtab");
})
router.get("/profile/activity/draftedtabs/:token", auth, async (req, res) => {
    res.render("profiledraftedtabs");
})

router.get("/profile/activity/postedtabs/:token", auth, async (req, res) => {
    res.render("profilepostedtabs");
})

router.get("/profile/activity/bookmarkedtabs/:token", auth, async (req, res) => {
    res.render("profilebookmarkedtabs");
})

router.get("/profile/account/:token", auth, async (req, res) => {
    res.render("profileaccount");
})

router.get("/profileitem/:item_id/:token", auth, async (req, res) => {
    res.render("profileitem");
})

router.get("/seller/:item_id", async (req, res) => {
    res.render("profilesellernoauth");
})

router.get("/seller/:item_id/:token", auth, async (req, res) => {
    res.render("profileseller");
})

router.get("/sellernoauth/rate/:item_id", async (req, res) => { ///
    res.render("profilesellerrate");
})

router.get("/seller/rate/:item_id/:token", auth, async (req, res) => {
    res.render("profilesellerrate");
})

router.get("/profileother/:profilename/:token", auth, async (req, res) => {
    res.render("profileother");
})

router.get("/updateusername/:newname/:token", auth, async (req, res) => {
    const user = req.user;
    try {
        const updatedUser = await User.findOneAndUpdate({name: req.user.name}, {name: req.params.newname});
        await updatedUser.save();
        res.send(updatedUser);
    } catch (e) {
        res.send(e.message);
    }
})

router.get("/updateuseremail/:newemail/:token", auth, async (req, res) => {
    try {
        req.user.email = req.params.newemail;
        await req.user.save();
        res.send(req.user);
    } catch (e) {
        res.send({error: e.message});
    }
})

router.get("/updateuserpassword/:oldpassword/:newpassword/:token", auth, async (req, res) => {
    try {
        await req.user.updatePassword(req.user, req.params.oldpassword, req.params.newpassword);
        res.send(req.user);
    } catch (e) {
        console.log(e)
        res.send({error: e.message});
    }
})

router.get("/userpublicprofile/:token", auth, async (req, res) => {
    res.render("userpublicprofile");
})

router.get("/userpublicprofileratings/:token", auth, async (req, res) => {
    res.render("userpublicprofileratings");
})

router.get("/userpublicprofiledeleteaccount/:token", auth, async (req, res) => {
    res.render("userpublicprofiledeleteaccount");
})

router.get("/publicprofilenoauth/:username", async (req, res) => {
    res.render("publicprofilenoauth");
})

router.get("/publicprofile/:username/:token", auth, async (req, res) => {
    res.render("publicprofile");
})

router.get("/publicprofileratingsnoauth/:username", async (req, res) => {
    res.render("publicprofileratingsnoauth");
})

router.get("/publicprofileratings/:username/:token", auth, async (req, res) => {
    res.render("publicprofileratings");
})

router.get("/publicprofilemessage/:username/:token", auth, async (req, res) => {
    res.render("publicprofilemessage");
})

router.get("/publicprofilerate/:username/:token", auth, async (req, res) => {
    res.render("publicprofilerate");
})

router.get("/updaterecentsearch/:recentsearch/:token", auth, async (req, res) => {
    try {
        const user = await User.findOneAndUpdate({name: req.user.name}, {recentsearch: req.params.recentsearch});
        user.save();
        res.send(user);
    } catch (e) {   
        res.status(404).send({error: "can't find user"});
    }
})

router.patch("/updateuseraddress/:token", auth, async (req, res) => {
    try {
        const user = await User.findOneAndUpdate({name: req.user.name}, {address: {latitude: req.body.latitude, longitude: req.body.longitude}});
        user.save();
        res.send(user);
    } catch (e) {   
        res.status(404).send({error: "can't find user"});
    }
})

router.get("/shippinglabel/:token", auth, async (req, res) => {
    res.render("shippinglabel");
})

router.get("/getitempurchaseduser/:item_id/:token", auth, async (req, res) => {
    try {
        const users = await User.find({});
        const item = await Item.findById(req.params.item_id);
        for (let i = 0; i < users.length; i++) {
            if (users[i].name == item.purchaseduser) {
                res.send(users[i]);
            }
        }
    } catch(e) {
        res.send({error: "Could not find user"});
    }
})

router.delete("/deleteuser/:token", auth, async (req, res) => {
    try {
        await User.findOneAndDelete({name: req.user.name});
        res.send(JSON.stringify("gohome"));
    } catch(e) {
        res.send({error: "Could not delete user"});
    }
})

router.get("/getuserfrom_id/:user_id/:token", auth, async (req, res) => {
    try {
        const user = await User.findById(req.params.user_id);

        res.send(user.name);
    } catch(e) {
        res.send({error: "Could not find user"});
    }
})

router.patch("/bookmarktab/:tab_id/:token", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        user.bookmarks.push(req.params.tab_id);
        user.save();
    } catch(e) {
        res.send({error: "Could not bookmark"});
    }
})

router.patch("/unbookmarktab/:tab_id/:token", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        for (let i = 0; i < user.bookmarks.length; i++) {
            if (user.bookmarks[i] == req.params.tab_id) {
                user.bookmarks.splice(i, 1);
            }
        }
        user.save();
    } catch(e) {
        res.send({error: "Could not bookmark"});
    }
})

router.get("/tabisbookmarked/:tab_id/:token", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        for (let i = 0; i < user.bookmarks.length; i++) {
            if (user.bookmarks[i] == req.params.tab_id) {
                return res.send(true);
            }
        }
        res.send(false);
    } catch(e) {
        res.send({error: "Could not bookmark"});
    }
})

router.get("/getuserbytabowner_id/:tabowner_id/:token", auth, async (req, res) => {
    try {
        const user = await User.findById(req.params.tabowner_id);
        res.send(user);
    } catch(e) {
        res.send({error: "Could not tab owner"});
    }
})

router.get("/getuserbytabowner_idnoauth/:tabowner_id", async (req, res) => {
    try {
        const user = await User.findById(req.params.tabowner_id);
        res.send(user);
    } catch(e) {
        res.send({error: "Could not tab owner"});
    }
})

module.exports = {
    userRouter: router
}