const { progress } = require("../model/progressModel");
const saveProgress = async (req,res) => {
   const {category,wrongAnswer,correctAnswer} = req.body;
  try {
      const response = await progress.insertOne({
      userId : req.userId,
      wrongAnswer,
      correctAnswer,
      category
   })

   if(!response){
    throw new Error("data is not store ");
   }
   res.json({message :"data is stored properly."})

  } catch (error) {
   console.log(error.message);
   
   
  }
   
   
    
}

module.exports = {saveProgress};