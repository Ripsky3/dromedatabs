//require("dotenv").config();

const express = require("express");
const auth = require("../middleware/auth");
const router = new express.Router();
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

router.post("/buycartitems/:token", auth, async (req, res) => {
    try {
        const cartItemsForStripe = new Map([]);
        for (let i = 0; i < req.body.cartItemsForStripeArray.length; i++) {
            cartItemsForStripe.set(req.body.cartItemsForStripeArray[i].key, {priceincents: req.body.cartItemsForStripeArray[i].value.priceincents, name: req.body.cartItemsForStripeArray[i].value.name});
        }
        let id = "";
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: req.body.userCartItems.map(userCartItem => {
                const cartItemForStripe = cartItemsForStripe.get(userCartItem.id);
                id += userCartItem.id + "-";
                return {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: cartItemForStripe.name
                        },
                        unit_amount: cartItemForStripe.priceincents
                    },
                    quantity: 1
                }
            }),
            success_url: `${process.env.SERVER_URL}/updatepurchaseditem/` + id + "/" + req.params.token,
            cancel_url: `${process.env.SERVER_URL}/profile/activity/summary/` + req.params.token
        })
        res.json({ url: session.url})
    } catch(e) {
        res.status(500).send({ error: e.message });
    }
})




module.exports = {
    buyRouter: router
}