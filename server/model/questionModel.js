const { mongoose } = require("mongoose");
const {questionSchema} = require("../schema/questionShema");

const questions = mongoose.model("question",questionSchema);

module.exports = {questions};