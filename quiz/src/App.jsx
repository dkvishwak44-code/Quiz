 import React, { useState } from 'react'
import Login from './components/Login'
import Register from './components/Register'
import PageNotFound from './components/PageNotFound'
import AddQuestion from './components/AddQuestion'
import { BrowserRouter as Router ,Routes,Route } from 'react-router-dom'
import Category from './components/Category'
import Quizz from './components/Quizz'
import Userdashboard from './components/Userdashboard'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'

 const App = () => {


   return (
  
    <Router>
      <Routes>
        <Route path='/' element={<><Navbar/><Home/></>}></Route>
        <Route path='/login' element={<><Navbar/><Login/></>}></Route>
        <Route path='/register' element={<><Navbar/><Register/></>}></Route>
        <Route path='/add-question' element={<><Navbar/><AddQuestion/></>}></Route>
         <Route path='/category' element={<ProtectedRoute><><Navbar/><Category/></></ProtectedRoute>}></Route>
         <Route path="/quizz/:category" element={<ProtectedRoute><><Navbar/><Quizz/></></ProtectedRoute>}></Route>
         <Route path="/user-dashboard" element={<ProtectedRoute><><Navbar/><Userdashboard/></></ProtectedRoute>}></Route>
        <Route path='*' element={<PageNotFound/>}></Route>
      </Routes>
    </Router>
   )
 }
 
 export default App