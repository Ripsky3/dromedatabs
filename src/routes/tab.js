const express = require("express");
const router = new express.Router();
const Tab = require("../models/tab");
const User = require("../models/user");
const auth = require("../middleware/auth");

router.post("/createtab/:token", auth, async (req, res) => { 
    const tab = new Tab({
        name: req.body.tabName,
        category: req.body.tabCategory,
        owner: req.user._id,
        posted: req.body.post
    })
    try {
        const tabArray = await tab.addTabStrings(JSON.parse(req.body.tabArray));
        await tab.save();
        //res.redirect("/profile/activity/summary/" + req.params.token);
        
    } catch (e) {
        res.redirect("/createtaberror/" + e.message + "/" + req.params.token);
    }
})

router.get("/getAllTabs/:token", auth, async (req, res) => {
    try {
        const tabs = await Tab.find({});
        res.send(tabs);
    } catch (e) {
        res.redirect("/home/" + "/" + req.params.token);
    }
})

router.get("/getAllPostedTabs/:token", auth, async (req, res) => {
    try {
        const tabs = await Tab.find({posted: true});
        res.send(tabs);
    } catch (e) {
        res.redirect("/home/" + req.params.token);
    }
})

router.get("/getAllPostedTabsNoToken", async (req, res) => {
    try {
        const tabs = await Tab.find({posted: true});
        res.send(tabs);
    } catch (e) {
        res.redirect("/home/" + req.params.token);
    }
})

router.get("/createtaberror/:error/:token", auth, async (req, res) => {
    res.render("createtaberror");
})

router.get("/getusertabsunposted/:token", auth, async (req, res) => {
    try {
        const tabs = await Tab.find({owner: req.user._id, posted: false});
        res.send(tabs);
    } catch(e) {
        res.send(e.message);
    }
})

router.get("/getusertabsposted/:token", auth, async (req, res) => {
    try {
        const tabs = await Tab.find({owner: req.user._id, posted: true});
        res.send(tabs);
    } catch(e) {
        res.send(e.message);
    }
})

router.get("/getpublicusertabsposted/:publicusername/:token", auth, async (req, res) => {
    try {
        const user = await User.find({name: req.params.publicusername});
        const tabs = await Tab.find({owner: user[0]._id, posted: true});
        res.send(tabs);
    } catch(e) {
        res.send(e.message);
    }
})

router.get("/getpublicusertabspostednoauth/:publicusername", async (req, res) => {
    try {
        const user = await User.find({name: req.params.publicusername});
        const tabs = await Tab.find({owner: user[0]._id, posted: true});
        res.send(tabs);
    } catch(e) {
        res.send(e.message);
    }
})

router.get("/getusertabbyid/:tab_id/:token", auth, async (req, res) => {
    try {
        const tab = await Tab.find({owner: req.user._id, _id: req.params.tab_id});
        res.send(tab[0]);
    } catch(e) {
        res.send(e.message);
    }
})

router.get("/gettabbyid/:tab_id/:token", auth, async (req, res) => {
    try {
        const tab = await Tab.find({_id: req.params.tab_id});
        res.send(tab[0]);
    } catch(e) {
        res.send(e.message);
    }
})

router.get("/gettabbyidnoauth/:tab_id", async (req, res) => {
    try {
        const tab = await Tab.find({_id: req.params.tab_id});
        res.send(tab[0]);
    } catch(e) {
        res.send(e.message);
    }
})

router.get("/tabedit/:tab_id/:token", auth, async (req, res) => {
    res.render("profiletabedit");
})

router.get("/postedtabedit/:tab_id/:token", auth, async (req, res) => {
    res.render("profilepostedtabedit");
})

router.patch("/updateUserTabName/:tab_id/:token", auth, async (req, res) => {
    try {

        const tab = await Tab.findByIdAndUpdate(req.params.tab_id, {name: req.body.tabName});
        await tab.save();
        res.send(tab);
    } catch(e) {
        res.send(e.message);
    }
})


router.patch("/updateUserTabCategory/:tab_id/:token", auth, async (req, res) => {
    try {

        const tab = await Tab.findByIdAndUpdate(req.params.tab_id, {category: req.body.tabCategory});
        await tab.save();
        res.send(tab);
    } catch(e) {
        res.send(e.message);
    }
})


router.patch("/updateUserTabArray/:tab_id/:token", auth, async (req, res) => {
    try {

        const tab = await Tab.findById(req.params.tab_id);
        await tab.deleteOldTabStrings();
        await tab.addTabStrings(JSON.parse(req.body.tabArray));
        await tab.save();
        res.send(tab);
    } catch(e) {
        res.send(e.message);
    }
})

router.patch("/postUserTabBy_id/:tab_id/:token", auth, async (req, res) => {
    try {

        const tab = await Tab.findByIdAndUpdate(req.params.tab_id, { posted: true });
        res.send(tab);
    } catch(e) {
        res.send({error: "Could not post tab"});
    }
})

router.patch("/unpostUserTabBy_id/:tab_id/:token", auth, async (req, res) => {
    try {

        const tab = await Tab.findByIdAndUpdate(req.params.tab_id, { posted: false });
        res.send(tab);
    } catch(e) {
        res.send({error: "Could not unpost tab"});
    }
})

router.delete("/deleteUserTabBy_id/:tab_id/:token", auth, async (req, res) => {
    try {

        const tab = await Tab.findByIdAndDelete(req.params.tab_id);
        res.send(tab);
    } catch(e) {
        res.send({error: "Could not delete tab"});
    }
})

router.get("/tabsearch/:searchinput/:token", auth, async (req, res) => {
    res.render("tabsearch");
})

router.get("/tabsearchguest/:searchinput", async (req, res) => {
    res.render("tabsearchguest");
})

router.get("/gettabpage/:tab_id/:token", auth, async (req, res) => {
    res.render("tabpage");
})

router.get("/gettabpagenoauth/:tab_id", async (req, res) => {
    res.render("tabpagenoauth");
})

router.get("/getuserbookmarkedtabs/:token", auth, async (req, res) => {
    try {
        const bookmarkedTabs = [];
        for (let i = 0; i < req.user.bookmarks.length; i++) {
            const tab = await Tab.find( {_id: req.user.bookmarks[i]});
            bookmarkedTabs.push(tab[0]);
        }
        res.send(bookmarkedTabs);
    } catch(e) {
        res.send(e.message);
    }
})

router.get("/profiletabpage/:tab_id/:token", auth, async (req, res) => {
    res.render("profiletabpage");
})

router.get("/publicprofiletabpage/:tab_id/:token", auth, async (req, res) => {
    res.render("publicprofiletabpage");
})

router.get("/checkifuseristabowner/:tab_id/:token", auth, async (req, res) => {
    try {
        const bookmarkedTabs = [];

        const tab = await Tab.find( {_id: req.params.tab_id});
        if (tab[0].owner == req.user._id) {
            return res.send(true)
        } else {
            return res.send(false);
        }
            
    } catch(e) {
        res.send(e.message);
    }
})

router.patch("/updatetopsearch/:id", async (req, res) => {
    try {
        const tab = await Tab.findById(req.params.id);
        tab.topsearch += 1;
        tab.save();
        res.send(tab);
    } catch (e) {   
        res.send({error: "Can't update top search"});
    }
})

router.get("/getpopulartabs", async (req, res) => {
    try {
        const items = await Tab.find({});
        const sortedItems = [];
        let maxIndexArr = [];
        
        for (let i = 0; i < items.length - 1; i++) {
            let tempMax = 0;
            let tempMaxIndex;
            for (let j = i; j < items.length; j++) {
                /*console.log("///////////////")
                console.log(items[i].name);
                console.log(items[j].name);
                console.log("///////////////")*/
                let tempMaxIndexAlreadyUsed = false;
                if (items[j].topsearch > tempMax) {
                    /*console.log("///////////////")
                    console.log(items[j].name);
                    console.log("///////////////")*/
                    for (let x = 0; x < maxIndexArr.length; x++) {
                        if ( maxIndexArr[x] == j ) {
                            
                            tempMaxIndexAlreadyUsed = true;
                        }
                    }
                    if (!tempMaxIndexAlreadyUsed) {
                        tempMax = items[j].topsearch;
                        tempMaxIndex = j;
                        //console.log("New temp max: " + items[j].name)
                    }      
                }
            }
            //console.log("Finished loop")
            sortedItems.push(items[tempMaxIndex]);
            maxIndexArr.push(tempMaxIndex);
            
        }

        res.send(sortedItems.splice(0, 4));
    } catch (e) {   
        res.status(404).send("can't find");
    }
})

module.exports = {
    tabRouter: router
}