const jwt = require('jsonwebtoken')
const authenticate = async(req,res,next)=>{
   const authHeader =  req.headers.authorization;
   if (!authHeader) return res.status(401).json({ error: "No token" })

   const token = req.headers.authorization.split(' ')[1];
   
   jwt.verify(token,"anykey",(err ,user)=>{
    if(err){
        return res.status(403).json({ error: "Invalid token" });
    } 
    req.userId = user.userId;
    next();

   })
}

module.exports = authenticate;