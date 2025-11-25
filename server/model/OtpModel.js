 const mongoose = require("mongoose");
const { otpSchema } = require("../schema/OtpSchema");

const Otp = mongoose.model("Otp", otpSchema);
module.exports = {Otp};