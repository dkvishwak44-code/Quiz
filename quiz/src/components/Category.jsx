import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Category = () => {

    const [category , setCategory] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        const fetchCategory = async()=>{
            const res = await fetch('http://localhost:5000/category');
            const data = await res.json();
            setCategory(data);
        }
        fetchCategory();
        
        
    },[category]);
  
//handle to
const handleClick=(category)=>{
  navigate(`/quizz/${category}`);
}

  return (
    <>
    <div className='flex justify-center items-center'><h1 className='text-3xl font-bold'>Category</h1></div>
    <div className='flex  gap-5 m-5'>
       {category.map((category,idx)=>{ 
        return <div className='flex justify-center items-center  bg-white rounded-xl w-30 h-20 text-lg ' key={idx} onClick={()=>{handleClick(category)}}>{category}</div>
       })}
    </div>
    </>
  )
}

export default Category