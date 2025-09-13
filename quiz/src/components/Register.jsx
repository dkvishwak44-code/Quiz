import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify';

const Register = () => {
    const { register, handleSubmit, formState: { isSubmitting, errors }, reset } = useForm();

    const onSubmit = async (data) => {
        const {password ,confirmpassword} = data;
        if(password === confirmpassword){
            console.log('data added successfully');
            console.log(data);
         const res = await fetch('http://localhost:5000/register',{
            method:'POST',
            headers : {
             'Content-Type' :'application/json'
            },
            body : JSON.stringify(data)
         })  
         if(res.ok){
            toast.success("registered successfully");
         }    
         
        }else{
           toast.error('password is mismatch');
        }

        //reset form data after submittion
        reset();
    }
    return (
        <div className='flex flex-col gap-2 h-100 justify-center items-center'>
            <h1 className='text-3xl font-semibold  '>Register</h1>
            <div className='flex flex-col w-[60%] bg-white p-5 md:w-[25%] rounded-xl'>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5 relative rounded-xl'>
                    <input {...register('name', {
                        required: "name is required"
                    })}
                        type="text" className='border-1 outline-none px-2 py-1 rounded-xl' placeholder='enter the name' />
                        {errors.name && <span className='text-red-600 absolute top-8 text-sm'>{errors.name.message}</span>}
                    <input {...register('dob', {
                        required: "dob is required"
                    })}
                        type="date" className='border-1 outline-none px-2 py-1 rounded-xl' placeholder='enter dob' />
                         {errors.dob && <span className='text-red-600 absolute top-21 text-sm'>{errors.dob.message}</span>}
                    <input {...register('email', {
                        required: "email is required"
                    })}
                        type="text" className='border-1 outline-none px-2 py-1 rounded-xl' placeholder='enter email ' />
                         {errors.email && <span className='text-red-600 absolute top-35 text-sm'>{errors.email.message}</span>}
                    <input {...register('password', {
                        required: "password is required"
                    })}
                        type="text" className='border-1 outline-none px-2 py-1 rounded-xl' placeholder='enter the password ' />
                         {errors.password && <span className='text-red-600 absolute top-48 text-sm'>{errors.password.message}</span>}
                    <input {...register('confirmpassword', {
                        required: "confirm password is required"
                    })}
                        type="text" className='border-1 outline-none px-2 py-1 rounded-xl' placeholder='confirm password ' />
                         {errors.confirmpassword && <span className='text-red-600 absolute top-61 text-sm'>{errors.confirmpassword.message}</span>}
                    <input type="submit" value="Register" className='bg-green-500 py-1 rounded-xl' />
                </form>
            </div>
        </div>
    )
}

export default Register