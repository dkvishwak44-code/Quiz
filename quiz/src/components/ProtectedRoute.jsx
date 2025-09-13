import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const ProtectedRoute = ({children}) => {
    const navigate = useNavigate();
    const isAuthenticated = localStorage.getItem('token');
     
    useEffect(()=>{
     if(!isAuthenticated){
       toast.error("login first");
        navigate('/login');
     }

    },[])

  return (
    
    children
  )
}

export default ProtectedRoute