import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Quizz = () => {
  const navigate = useNavigate();
  const [questions, setQuestion] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [wrongAnswer, setWrongAnswer] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [score, setScore] = useState(0);
  const [restart,setRestart] =useState(false);
  const category = useParams().category;
  const Backend_Url = import.meta.env.VITE_API_BACKEND_URL; 

  useEffect(() => {
  //method for fetching questiong from database
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${Backend_Url}/questions/${category}`);
        if (!res.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await res.json();
        setQuestion(data);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
 
    //call the function of fetching qestion
    fetchQuestions();

  }, [category,restart]);


  if (loading) return <div>loading ...</div>
  if (error) return <div>Error: {error}</div>;

  //to check answer is correct or not and set correct and wrong answer
   const checkAnswer =(option)=>{
        if (option === questions[currentQuestion].answer) {
        setScore(score + 1);
        setCorrectAnswer(correctAnswer + 1);
        console.log(score);
      }else {
        setWrongAnswer(wrongAnswer + 1);
      }
   }

   //handle event when click on the option
  const handleOptionClick = (option) => {

    if (questions.length-1 > currentQuestion) {
       checkAnswer(option);
      setCurrentQuestion(currentQuestion + 1);
    } else {
      checkAnswer(option);
      setShowResult(true);
      saveProgess();
    }

  }

  // To save user_progess
  const saveProgess = async ()=>{
    const token = localStorage.getItem('token');
    console.log(token);
    
   try {
     const res = await fetch(`${Backend_Url}/save-progress`,{
      method : "POST",
      headers : {
        authorization : `Bearer ${token}`,
        "Content-Type" : "application/json",
      },
      body : JSON.stringify({category,wrongAnswer,correctAnswer})
    })
    
    const data = await res.json();
    if(!data){
      throw new Error("data not submitted");
    }

    console.log('data added successfully');

   } catch (error) {
    console.log(error.message);
    
   }
  }

//handle restart 
const handleRestart = ()=>{
  navigate('/category');
}

  return (
    <div className='flex flex-col justify-center items-center m-5 gap-1'>
      <h1 className=' font-bold md:text-4xl'>  Quizz</h1>
        
      <div className='flex flex-col justify-center items-center w-[60%] h-90 bg-white p-5 gap-5 rounded-xl md:w-[50%]'>
        {!showResult ? (<>
          <h1 className=' text-xl md:text-3xl font-bold w-[90%] text-center'>{questions[currentQuestion].question}</h1>
          <div className='flex flex-col w-[90%]'>
            {questions[currentQuestion].options.map((option, idx) => {
              return <button key={idx} className='border-1 mt-2 px-2 py-1 rounded text-white bg-blue-500 hover:bg-blue-600' onClick={() => { handleOptionClick(option) }}>{option}</button>
            })}
          </div>
        </>) : (
          <>
            <h1 className='text-3xl font-bold'>Result : {score}</h1>
            <button className='border-1 w-[50%] rounded bg-green-500 py-1' onClick={handleRestart}>Restart</button>
          </>
        )}
      </div>
    </div>
  )
}

export default Quizz