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
        type: String,
        required: false,
        trim: true
    },
    email: {
        type: String,
        required: true,
    },
    website: {
        type: String,
        required: false,
        trim: true
    },
    address: {
        type: String,
        required: false,
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

