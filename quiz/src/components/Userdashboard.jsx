import React, { useEffect, useState } from 'react'

const Userdashboard = () => {

   const [progress ,setProgess] = useState([]);
   const [name ,setName] = useState('');
   const [loading,setLoading] = useState(false);
   const [error,setError] = useState('');
   const Backend_Url = import.meta.env.VITE_API_BACKEND_URL; 

   useEffect(()=>{
    
     const fetchDashboard = async ()=>{
      setLoading(true);
      const token = localStorage.getItem('token');
      try {
        const res = await fetch(`${Backend_Url}/dashboard`,{
        headers : {
          authorization :  `Bearer ${token}`,
          'Content-Type' : "application/json"
        }
      })
      
      const data = await res.json();
      if(!res){
        throw new Error('data not found');
      }
      
      
     
      setProgess(data[0].response);
      setName(data[1].name);

      } catch (error) {
        setError(error.message);
      }
      finally{
        setLoading(false);
      }
    }
    fetchDashboard()
   },[]);   


   //fetching name of user 
 

   if(loading) return <div>loading</div>
   if(error) return <div>{error}</div>

  return (
    <div className='flex  flex-col justify-center items-center '>
        <div className='text-3xl text-green-500 font-bold mt-5'>{name}</div>
       <div className='flex gap-5 justify-between text-sm  font-bold mt-5 bg-gray-300 px-2 py-1 w-[90%] rounded-tl-xl rounded-tr-xl md:text-xl md:w-[60%]'>
        <div>category</div>
        <div>correct answer</div>
        <div>wrong answer</div>
        <div>average</div>
       </div>
        <div className='flex flex-col justify-between mb-5  gap-5 font-bold bg-white py-1 w-[90%] rounded-bl-xl rounded-br-xl md:w-[60%]'>
         {progress.map((el)=>{
         return  <div className='flex justify-between w-[90%] border-b-1 m-5'>
          <div>{el.category}</div>
          <div>{el.correctAnswer}</div>
          <div>{el.wrongAnswer}</div>
          <div>{(el.correctAnswer*(100))/10 }%</div>
          </div>
         })}
       </div>
      </div>
  )
}

export default Userdashboard