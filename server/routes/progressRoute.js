const express = require('express');
const { saveProgress } = require('../controller/progesscontroller');
const authenticate = require('../middleware/authenticate');
const progressRouter = express.Router();

progressRouter.post('/save-progress',authenticate,saveProgress);
module.exports = progressRouter;