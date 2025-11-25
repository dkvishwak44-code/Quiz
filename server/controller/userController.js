const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const users = require('../model/userModel');
const nodemailer = require("nodemailer");
const { progress } = require('../model/progressModel');
const { Otp } = require('../model/OtpModel');




// Generate 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
});

// Send OTP Email
const sendOtpEmail = async (email, otp) => {
  return transporter.sendMail({
    from: `${process.env.FROM_NAME} <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "OTP Verification",
    html: `<h2>Your OTP is: <strong>${otp}</strong></h2>
           <p>This OTP will expire in ${process.env.OTP_EXPIRE_MIN} minutes.</p>`,
  });
};

// ------------------ VERIFY OTP (SIGNUP) ------------------

 const verifySignupOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const otpDoc = await Otp.findOne({ email, otp });
    
    if (!otpDoc) return res.status(400).json({ error: "Invalid OTP" });

    if (otpDoc.expiresAt < new Date())
      return res.status(400).json({ error: "OTP expired" });

    await users.updateOne({ email }, { isVerified: true });
    await Otp.deleteMany({ email });

    res.json({ message: "Signup OTP verified successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

//for signup  page

const signup = async (req, res) => {
  try {
    const { name, email, password ,fatherName,contact,dob} = req.body;
    
    let user = await users.findOne({ email });
    if (user)
      return res.status(400).json({ error: "Email already registered" });

   
    const hashed = await bcrypt.hash(password, 10);
    user = new users({ name, email, password: hashed, isVerified: false ,fatherName,contact,dob});
    await user.save();

    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 1000 * 60 * process.env.OTP_EXPIRE_MIN);

    await Otp.deleteMany({ email });
    await new Otp({ email, otp, expiresAt }).save();

    await sendOtpEmail(email, otp);

    res.json({ message: "Signup successful. OTP sent to email.", email });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};


//login user controller
const logInUser = async(req,res)=>{
    const {email,password} = req.body;
  try {
     const user = await users.findOne({email});
   
     //check password is correct or not
    if(user && await bcrypt.compare(password,user.password) && user.isVerified){
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


    res.status(401).json({ error: "Invalid username or password" });
    
  } catch (error) {
    console.log(error.message);
    
  }
}

 //for forget password
 const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    let user = await users.findOne({ email });
     
    if (!user){ 
      return res.status(400).json({ error: "Invalid Email" });
   }

    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 1000 * 60 * process.env.OTP_EXPIRE_MIN);

    await Otp.deleteMany({ email });
    await new Otp({ email, otp, expiresAt }).save();

    await sendOtpEmail(email, otp);

    res.json({ message: "OTP sent for password reset" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
    console.log(err.message);
    
  }
};



//verify forgot- otp
const verifyForgotOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const otpDoc = await Otp.findOne({ email, otp });
    
    if (!otpDoc) return res.status(400).json({ error: "Invalid OTP" });

    if (otpDoc.expiresAt < new Date())
      return res.status(400).json({ error: "OTP expired" });

    res.json({ message: "OTP verified. You can reset password now." });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
//reset password

 const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    const hashed = await bcrypt.hash(newPassword, 10);

    await users.updateOne({ email }, { password: hashed });
    await Otp.deleteMany({ email });

    res.json({ message: "Password reset successful" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

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
module.exports = {logInUser,fetchDashboard,forgotPassword,verifyForgotOtp,resetPassword,signup,verifySignupOtp};