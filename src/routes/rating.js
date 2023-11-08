const express = require("express");
const router = new express.Router();
const Rating = require("../models/rating");
const auth = require("../middleware/auth")

router.post("/ratepublicprofile/:token", auth, async (req, res) => {
   const rating = new Rating({
        profile: req.body.profile,
        rating: req.body.rating,
        message: req.body.message,
        rater: req.body.rater
   })
   try {
        await rating.save();
        res.send(rating);
   } catch(e) {
    console.log(e)
        res.send({error: e.message});
   }
})

router.get("/getuserratings/:token", auth, async (req, res) => {
     try {
          const ratings = await Rating.find({profile: req.user.name});
          res.send(ratings);
     } catch(e) {
          res.send({error: e.message});
     }
})

router.get("/getuserratings/:username/:token", auth, async (req, res) => {
     try {
          const ratings = await Rating.find({profile: req.params.username});
          res.send(ratings);
     } catch(e) {
          res.send({error: e.message});
     }
})

router.get("/getuserratingsnoauth/:username/", async (req, res) => {
     try {
          const ratings = await Rating.find({profile: req.params.username});
          res.send(ratings);
     } catch(e) {
          res.send({error: e.message});
     }
})


module.exports = {
    ratingRouter: router
}