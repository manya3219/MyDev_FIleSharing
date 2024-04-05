import React from 'react'
import Home from './pages/Home'
import About from './pages/About'
import SignUp from './pages/SignUp'

import {BrowserRouter,Routes,Route}from'react-router-dom'
import Project from './pages/Project'
import Login from './pages/Login'

export default function App() {
  return (
  <BrowserRouter>
   <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/sign-up" element={<SignUp/>}/>
      <Route path="/Login" element={<Login/>}/>
      
      <Rote path="/dashboard" element={<Dashboard/>}/>
      <Route path="/Project" element={<Project/>}/>
   </Routes>
  
  </BrowserRouter>
  )
}
