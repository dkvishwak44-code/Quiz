import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Quizz = () => {
  const navigate = useNavigate();
  const [questions, setQuestion] = useState([]);  // FIX: empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [wrongAnswer, setWrongAnswer] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [score, setScore] = useState(0); // FIX: start from 0
  const [restart, setRestart] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

  const { category } = useParams();
  const Backend_Url = import.meta.env.VITE_API_BACKEND_URL;

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${Backend_Url}/questions/${category}`);
        if (!res.ok) throw new Error('Network error while fetching');

        const data = await res.json();
        setQuestion(data);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [category, restart]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // ✅ FIXED CHECK ANSWER
  const checkAnswer = (option) => {
    if (option === questions[currentQuestion].answer) {
      setScore(prev => prev + 1);
      setCorrectAnswer(prev => prev + 1);
      return true;
    } else {
      setWrongAnswer(prev => prev + 1);
      return false;
    }
  };

  // ✅ FIXED HANDLE OPTION CLICK
  const handleOptionClick = (option) => {
    const isCorrect = checkAnswer(option);

    // store latest values in local vars
    let newCorrect = correctAnswer;
    let newWrong = wrongAnswer;

    if (isCorrect) newCorrect += 1;
    else newWrong += 1;

    // last question check
    if (questions.length - 1 > currentQuestion) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      saveProgess(newCorrect, newWrong);
      setShowResult(true);
    }
  };

  // ✅ FIXED SAVE PROGRESS
  const saveProgess = async (newCorrect, newWrong) => {
    const token = localStorage.getItem('token');

    try {
      const res = await fetch(`${Backend_Url}/save-progress`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ category, correctAnswer: newCorrect, wrongAnswer: newWrong })
      });

      const data = await res.json();
      if (!data) throw new Error("Progress not saved");

      console.log('Progress saved successfully');
    } catch (error) {
      console.log(error.message);
    }
  };

  // Restart button go to category page
  const handleRestart = () => {
    navigate('/category');
  };

  return (
    <div className='flex flex-col justify-center items-center m-5 gap-1'>
      <h1 className='font-bold text-2xl md:text-4xl'>Quizz</h1>

      <div className='flex flex-col justify-center items-center h-90 bg-white p-5 gap-5 rounded-xl w-[90%] md:w-[60%] lg:w-[60%]'>
        {!showResult ? (
          <>
            <h1 className='text-xl lg:text-3xl font-bold w-[90%] text-center'>
              {questions[currentQuestion].question}
            </h1>

            <div className='flex flex-col w-[90%]'>
              {questions[currentQuestion].options.map((option, idx) => (
                <button
                  key={idx}
                  className='border mt-2 px-2 py-1 rounded text-white bg-blue-500 hover:bg-blue-600'
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <h1 className='text-3xl font-bold'>Result: {score}</h1>
            <button className='border w-[50%] rounded bg-green-500 py-1' onClick={handleRestart}>
              Restart
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Quizz;
