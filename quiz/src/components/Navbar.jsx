import React, { useEffect, useState } from "react";
import logo from "../assets/logo.jpg";
import { RxHamburgerMenu } from "react-icons/rx";
import { NavLink } from "react-router-dom";
const Navbar = () => {
    const [isloggedIn,setIsLoggedIn] = useState(false);
    const [isHamBarActive ,setIsHamBarActive] = useState(false);
   const  [token,setToken] = useState('');

    const isLogin=()=>{
        setToken(localStorage.getItem('token'));

        if(token){
         setIsLoggedIn(true);
        }
    }


    useEffect(()=>{
      isLogin();
    },[token]);

//logout function

const handleLogOut = ()=>{
   localStorage.removeItem('token');
   window.location.reload();
}

//when we click hambar
const handleHambarclick =()=>{
    setIsHamBarActive(!isHamBarActive);
}

const hambarIsOpen =()=>{
    setIsHamBarActive(false);
}

  return (
    <>
    <nav className=" flex w-[100%] bg-white border-1 h-[80px] justify-center items-center sticky top-0">
      <div className=" flex w-[90%] mx-auto justify-between items-center h-15">
        <div className="flex pl-3">
          <div className="h-6 w-6">
            <img className="rounded-full" src={logo} alt="LOGO" />
          </div>
        </div>
        <div className=" hidden md:flex md:mr-3 md:show">
          <ul className="flex gap-5 justify-center items-center ">
            <li className='px-2 py-1 hover:bg-blue-500 hover:rounded-lg'>
              <NavLink to="/">Home</NavLink>
            </li>
            <li className="px-2 py-1 hover:bg-blue-500 hover:rounded-lg">
              <NavLink to="/category">Quizzes</NavLink>
            </li>
            <li className='px-2 py-1 hover:bg-blue-500 hover:rounded-lg'>
              <NavLink to="/user-dashboard">Dashboard</NavLink>
            </li>
            <li className='px-2 py-1 hover:bg-blue-500 hover:rounded-lg'>
              <NavLink to="/register">Register</NavLink>
            </li>
            {!isloggedIn ? (
                <li className='px-2 py-1 hover:bg-blue-500 hover:rounded-lg'>
               <NavLink to="/login">Login</NavLink></li>
            ):(
               <li className='px-2 py-1 hover:bg-blue-500 hover:rounded-lg'>
              <button  onClick={handleLogOut}>LogOut</button>
            </li>
            )}
          </ul>
        </div>
        <div className="show md:hidden">
          <button onClick={handleHambarclick}><RxHamburgerMenu /></button>
        </div>
      </div>
    </nav>
    {isHamBarActive ? (
        <div className=" flex flex-col justify-center w-[100%] items-center absolute top-20 bg-white border-b-1  z-10 md:hidden " onClick={hambarIsOpen}>
        <ul className="flex flex-col gap-5 justify-center items-center ">
            <li cl ssName='px-2 py-1 hover:bg-blue-500 hover:rounded-lg'>
              <NavLink to="/">Home</NavLink>
            </li>
            <li cl ssName="px-2 py-1 hover:bg-blue-500 hover:rounded-lg">
              <NavLink to="/category">Quizzes</NavLink>
            </li>
            <li cl ssName='px-2 py-1 hover:bg-blue-500 hover:rounded-lg'>
              <NavLink to="/user-dashboard">Dashboard</NavLink>
            </li>
            <li cl ssName='px-2 py-1 hover:bg-blue-500 hover:rounded-lg'>
              <NavLink to="/register">Register</NavLink>
            </li>
            {!isloggedIn ? (
                <li className='px-2 py-1 hover:bg-blue-500 hover:rounded-lg'>
               <NavLink to="/login">Login</NavLink></li>
            ):(
               <li className='px-2 py-1 hover:bg-blue-500 hover:rounded-lg'>
              <button  onClick={handleLogOut}>LogOut</button>
            </li>
            )}
          </ul>
      </div>
        
    ):
    (<>
    </>
)}
</>
  );
};

export default Navbar;
