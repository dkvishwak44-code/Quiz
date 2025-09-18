import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {

    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();
    const navigate = useNavigate();
    const Backend_Url = import.meta.env.VITE_API_BACKEND_URL; 
     console.log(Backend_Url);
     
    //ckeck login
    const checkedLoggedIn = () => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/category');
        }
    }

    checkedLoggedIn();

    //on submit funtion for post form data to database
    const onSubmit = async (data) => {
        try {

            const response = await fetch(`${Backend_Url}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(data),
            });

            const Data = await response.json();

            console.log(Data);
            if (!response.ok) {
                throw new Error(Data.error || 'login failed');
            }

            localStorage.setItem('token', Data.token);
            toast.success('loggedIn successfully');
            //navigate to category page
            navigate('/category');

        } catch (error) {
            toast.error(error.message);

        }

        reset();

    }

    //navigate to register form
    const NavigateToRegisterForm = () => {
        navigate('/register')
    }



    return (
        <div className='flex flex-col gap-1 h-100 justify-center items-center'>
            <h1 className='text-3xl font-semibold'>LOGIN</h1>
            <div className='flex flex-col w-[60%] gap-2 p-5 bg-white border-1 rounded-xl md:w-[25%]'>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-7 mt-7 relative'>
                    <input {...register("email", {
                        required: 'email is required'
                    })} type="text" placeholder='Enter the username' className='border-1 outline-none px-2 py-1 rounded-xl' />
                    {errors.email && <span className='text-red-500 text-sm absolute top-9'>{errors.email.message}</span>}
                    <input {...register('password', {
                        required: 'password is required'
                    })} type="text" placeholder='Enter the password ' className='border-1 outline-none px-2 py-1 rounded-xl' />
                    {errors.password && <span className='text-red-500 text-sm absolute top-24'>{errors.password.message}</span>}
                    <input type="submit" disabled={isSubmitting} value={isSubmitting ? 'logining' : 'login'} className='bg-green-500 py-1 rounded' />
                </form>
                <div className='flex justify-center items-center gap-2 text-sm rounded-xl'>don't have account ? <button className='text-blue-600 rounded-xl' onClick={NavigateToRegisterForm}>register</button></div>
            </div>
        </div>
    )
}

export default Login