const mongoose = require('mongoose');
const progressSchema = require('../schema/progressSchema');

const progress = mongoose.model('progress',progressSchema);

module.exports = {progress};