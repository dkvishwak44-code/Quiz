const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
    userId : mongoose.Schema.Types.ObjectId,
    category : String,
    wrongAnswer : String,
    correctAnswer :String 
})

module.exports = progressSchema;