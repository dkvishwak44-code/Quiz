import React from 'react'
import { NavLink } from 'react-router-dom';
const Home = () => {
  return (
    <div className=" h-[calc(100vh-80px)] flex flex-col justify-center items-center  bg-gray-200 text-black px-4">
      {/* Header */}
      <h1 className="mb-4 text-2xl font-bold md:text-5xl md:font-extrabold ">🎯 CarZy QuizZ</h1>
      <p className="text-lg mb-8 max-w-xl text-center">
        Test your knowledge across multiple topics and challenge yourself.  
        Are you ready to play?
      </p>

      {/* Buttons */}
      <div className="flex space-x-6">
        <NavLink
          to="/category"
          className="bg-white  px-6 py-3 rounded-2xl shadow-lg hover:bg-gray-100 font-semibold transition"
        >
          Start Quiz
        </NavLink>
        {/* <NavLink
          to="/about"
          className="bg-transparent border-2 border-white px-6 py-3 rounded-2xl hover:bg-white hover:text-purple-600 font-semibold transition"
        >
          About
        </NavLink> */}
      </div>

      {/* Footer */}
      <footer className="absolute bottom-4 text-sm opacity-80">
        © {new Date().getFullYear()} CarZy QuizZ. All rights reserved.
      </footer>
    </div>
  );
}

export default Home