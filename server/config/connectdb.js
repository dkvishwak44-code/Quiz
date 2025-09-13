const mongoose = require('mongoose');
require("dotenv").config();
const uri = process.env.MONGO_URI;
 async function connectDB() {
   try {
      await  mongoose.connect(uri);
      console.log('database connected successfully');
      
   } catch (error) {
     console.log('while database connection',error.message);
     
   }
}

module.exports = connectDB;