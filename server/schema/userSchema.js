const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId : mongoose.Schema.Types.ObjectId,
    name : String,
    dob : Date,
    email : String,
    password : String

});

module.exports = {userSchema};