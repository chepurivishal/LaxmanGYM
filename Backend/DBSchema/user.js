const mongoose = require("mongoose");

var emergencyContact = new mongoose.Schema({
    name: String,
    relationship: String,
    phoneNumber: String
});

var physician = new mongoose.Schema({
    name: String,
    phoneNumber: String
});

const user = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: new Date
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    pincode: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    DOB: {
        type: Date,
        required: true
    },
    maritalStatus: {
        type: String,
        enum: ["married", "unmarried"] 
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female"]
    },
    subscription: {
        type: String,
        required: true
    },
    medicalHistory: {
        type: mongoose.Schema.Types.Mixed
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    profilePic: {
        type: String
    },
    physician: physician,
    emergencyContact: emergencyContact,
});

module.exports = mongoose.model("user", user);