import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify';
const AddQuestion = () => {
    const {register,handleSubmit,formState:{isSubmitting},reset} = useForm();
   
    const onSubmit = async(data)=>{

        const {question,option1,option2,option3,option4,answer,category} = data;
        const options = [option1,option2,option3,option4]; 
        const Data = {question,options,answer,category};

            const respone = await fetch('http://localhost:5000/add-questions',{
            method : "POST",
            headers: {
                'Content-Type' : 'application/json'
            },
           body : JSON.stringify(Data),
       });
        //reset after form submittion
         reset();

      if(Response){
        toast.success('data added suceessfully');
      }
    }        
  return (
     <div className='flex flex-col gap-2 h-screen justify-center items-center'>
           <h1 className='text-3xl font-semibold  '>Add Question </h1>
            <div className='flex flex-col w-[60%] bg-white p-5 md:w-[25%] rounded'>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5 relative rounded'>
                <input {...register('question')} type="text" placeholder='question' className='outline-none border-1 px-2 py-1 rounded'/>
                <input {...register('option1')} type="text" placeholder='opton 1'  className='outline-none border-1 px-2 py-1 rounded'/>
                <input {...register('option2')} type="text" placeholder='opton 2'  className='outline-none border-1 px-2 py-1 rounded'/>
                <input {...register('option3')} type="text" placeholder='opton 3' className='outline-none border-1 px-2 py-1 rounded'/>
                <input {...register('option4')} type="text" placeholder='opton 4' className='outline-none border-1 px-2 py-1 rounded'/>
                <input {...register('answer')} type="text" placeholder='correct option' className='outline-none border-1 px-2 py-1 rounded' />
                <input {...register('category')} type="text" placeholder='catgory'  className='outline-none border-1 px-2 py-1 rounded'/>   
                <input type="submit" value="Add" className='bg-green-500 py-1 px-2 rounded'  />   
                </form>
            </div>
        </div>
  )
}

export default AddQuestion