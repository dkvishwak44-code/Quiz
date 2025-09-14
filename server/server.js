const connectDB = require('./config/connectdb');
const cookieParser = require('cookie-parser');
const express = require('express');
const cors = require('cors');
const router = require('./routes/questionRoutes');
const userRouter = require('./routes/userRoutes');
const progressRouter = require('./routes/progressRoute');
const app  = express();
require("dotenv").config();
const PORT = process.env.PORT || 5000
//for cookie 
app.use(cookieParser());
//middleware for data from frontend
app.use(cors())
//middleware for body incomming data
app.use(express.json())
//connect to database 
connectDB();

//question router
app.use('/',router);

//user router 
app.use('/',userRouter);

 //progress router
 app.use('/',progressRouter);



app.listen(PORT ,()=>{
    console.log(`server is running on http://localhost:${PORT}`);
})