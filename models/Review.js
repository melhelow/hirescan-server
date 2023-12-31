const mongoose = require('mongoose');

const { Schema } = mongoose;

const reviewSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    company: {
        type: String,
        required: true,
        trim: true
    },
    personInCharge: {
        type: String,
        required: true,
        trim: true
    },
    telephone: {
        type: Number,
        required: true,
        min: 0,
        default: 1
       

    },
    email: {
        type: String,
        required: true,
    },
    website: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    review: {
        type: String,
        required: true,
        trim: true
    },
    date : {
        type: Date,
        default: Date.now
    },


});

const Review = mongoose.model('Review', reviewSchema);

module.exports = { Review };

