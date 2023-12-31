const jwt = require("jsonwebtoken");
const User = require("../models/user");


const auth = async (req, res, next) => {
    const token = req.params.token;

    const decoded = jwt.verify(token, "secretsign");
    const user = await User.findOne({_id: decoded._id, "tokens.token": token})
    if (user) {
        req.user = user;
        next();
    }
     
}

module.exports = auth;