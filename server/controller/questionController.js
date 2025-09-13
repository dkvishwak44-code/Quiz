const {questions} = require("../model/questionModel");
const addQuestion = async(req,res)=>{
     const Question = req.body;
     try {
         const respone = await questions.insertOne(Question);
      if(respone){
        res.send('data added successfully');
      }
     } catch (error) {
        console.log(error.message);
        
     }
   
}
const fetchCategory = async(req,res)=>{
  try {
      const response = await questions.distinct('category');
    if(response){
       res.send(response);
    }
  } catch (error) {
   console.log(error.message);
    
  }
    
}
const fetchQuestions = async(req,res)=>{
    const {category} = req.params;
    try {
      const response = await questions.aggregate([
    { $match: { category: category } },  // dynamic category
    { $sample: { size: 10 } }            // random 10
  ]);;
        // console.log(response);
        if(response){
            res.send(response);
        }
        
        
    } catch (error) {
      console.log(error.message);
    }
}
module.exports = {addQuestion,fetchCategory,fetchQuestions};