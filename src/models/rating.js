const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    profile: {
        type: String,
        required: true,      
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    message: {
        type: String,
        required: true,      
    },
    rater: {
        type: String,
        required: true,   
    }
})

const Rating = mongoose.model("Rating", ratingSchema);

module.exports = Rating 