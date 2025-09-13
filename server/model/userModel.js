const mongoose  = require("mongoose");
const { userSchema } = require("../schema/userSchema");

const users = mongoose.model('user',userSchema);

module.exports = users;