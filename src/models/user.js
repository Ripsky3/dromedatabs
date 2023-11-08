const mongoose = require('mongoose');
const validator = require("validator");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        trim: true
        
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Must have valid email");
            }
        }
    },
    password: {
        type: String,
        required: true,   
        validate(value) {
            if (value.length < 7) {
                throw new Error("Password must be at least 7 characters long");
            }
        },
        trim: true,
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

userSchema.pre("save", async function(next) {

    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 8);
    }

    next();
})

userSchema.methods.generateAuthToken = async function()  {
    let token = jwt.sign({ _id: this._id}, "secretsign");
    this.tokens.push({token});
    await this.save();
    return token;
}

userSchema.methods.updatePassword = async function(user, oldpassword, newpassword) {
    const decryptedPassword = await bcrypt.compare(oldpassword, user.password);
    
    if (decryptedPassword) {
        user.password = newpassword;
        await user.save();
    } else {
        throw new Error("Old Password is incorrect");
    }
}

userSchema.statics.getUserByCredentials = async (email, password) => {
    const user = await User.findOne({ email });
    
    if (!user) {
        throw new Error("Incorrect credentials");
    }

    const decryptedPassword = await bcrypt.compare(password, user.password);

    if (decryptedPassword) {
        return user;
    } else {
        throw new Error("Must enter correct credentials");
    }
}

const User = mongoose.model("User", userSchema);

module.exports = User