const express = require("express");
const path = require("path");
var bodyParser = require('body-parser')
require("./db/mongoose");

const { userRouter } = require("./routes/user");
const { itemRouter } = require("./routes/item");
const { messageRouter } = require("./routes/message");
const { ratingRouter } = require("./routes/rating");
const { buyRouter } = require("./routes/buy");

const app = express();
const port = process.env.PORT || 3000; 

const publicDirectoryPath = path.join(__dirname, "../public");

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.set("view engine", "hbs");
app.use(express.static(publicDirectoryPath));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Use routers
app.use(userRouter);
app.use(itemRouter);
app.use(messageRouter);
app.use(ratingRouter);
app.use(buyRouter);

app.listen(port, () => {
    console.log("We are listening at port: " + port);
})