const { logInUser, fetchDashboard, forgotPassword, verifyForgotOtp, resetPassword, signup, verifySignupOtp } = require('../controller/userController');
const express = require('express');
const authenticate = require('../middleware/authenticate');
const userRouter = express.Router();

userRouter.post("/api/auth/signup", signup);
userRouter.post("/api/auth/verify-signup-otp", verifySignupOtp);
userRouter.post("/api/auth/verify-forgot-otp", verifyForgotOtp);
userRouter.post('/login',logInUser);
userRouter.post("/api/auth/forgot-password", forgotPassword);
userRouter.post("/api/auth/verify-forgot-otp", verifyForgotOtp);
userRouter.post("/api/auth/reset-password", resetPassword);
userRouter.get('/dashboard',authenticate,fetchDashboard);
module.exports = userRouter;