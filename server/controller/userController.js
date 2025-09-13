const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const users = require('../model/userModel');
const { progress } = require('../model/progressModel');

//for registration page

const addUsers = async (req ,res)=>{
    const {name,dob,email,password} = req.body;
   try {
    //hash the password
     const hashPassword = await  bcrypt.hash(password,10)
     const response = await users.create({name,dob,email,password:hashPassword})
     res.send('data added successfully');
   } catch (error) {
     console.log(error.message);
   }    
}

//login user controller
const logInUser = async(req,res)=>{
    const {email,password} = req.body;
  try {
     const user = await users.findOne({email});
   
     //check password is correct or not
    if(user && await bcrypt.compare(password,user.password)){
      //generate token
      const token = jwt.sign({
        userId : user._id
      },
      "anykey"
      ,
      {
        expiresIn :"3d"
      }
    )
     return res.json({token})
    }


    res.status(401).json({ error: "Invalid credentials" });
    
  } catch (error) {
    console.log(error.message);
    
  }
}

//fetch user dashboard
const fetchDashboard = async(req,res)=>{
  const userId = req.userId;
  try {
     const response = await progress.find({userId}) ;
     const user = await users.findOne({_id:userId});
     if(!response){
      res.status(404).json({error:"data not found"});
      console.log('data not founds');
      
     }
     res.json([{response},{name:user.name}]);

  } catch (error) {
    console.log(error.message);
    
  }
   
}
module.exports = {addUsers,logInUser,fetchDashboard};