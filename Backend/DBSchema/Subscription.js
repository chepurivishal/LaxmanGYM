const mongoose = require('mongoose');

const subscription = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    subscriptionPeriod: {
        type: String,
        required: true,
        enum: ["monthly", "quarterly", "halfyearly", "annually"],
        default: "monthly"
    },
    subscriptionAmount: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("subscription", subscription);