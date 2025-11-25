const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId : mongoose.Schema.Types.ObjectId,
    name : String,
    fatherName: { type: String },
    contact: { type: String },
    dob : Date,
    email : String,
    password : String,
      isVerified: { type: Boolean, default: false },
      createdAt: { type: Date, default: Date.now },

});

module.exports = {userSchema};