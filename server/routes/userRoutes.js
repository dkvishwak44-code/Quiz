const { addUsers, logInUser, fetchDashboard } = require('../controller/userController');
const express = require('express');
const authenticate = require('../middleware/authenticate');
const userRouter = express.Router();

userRouter.post('/register',addUsers);
userRouter.post('/login',logInUser);
userRouter.get('/dashboard',authenticate,fetchDashboard);
module.exports = userRouter;