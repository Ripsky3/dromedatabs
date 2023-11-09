require("dotenv").config();

const express = require("express");
const router = new express.Router();
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const storeItems = new Map([
    [1, {priceInCents: 10000, name: "Learn react today course"}],
    [2, {priceInCents: 20000, name: "Learn css today course"}]
]);


module.exports = {
    userRouter: router
}