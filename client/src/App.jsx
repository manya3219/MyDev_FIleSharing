import React from 'react'
import Home from './pages/Home'
import About from './pages/About'
import SignUp from './pages/SignUp'
import Header from './components/Header'
import {BrowserRouter,Routes,Route}from'react-router-dom'
import Project from './pages/Project'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Foot from './components/Foot'


export default function App() {
  return (
  
  <BrowserRouter>
  <Header/>
   <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/sign-up" element={<SignUp/>}/>
      <Route path="/Login" element={<Login/>}/>
      
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/Project" element={<Project/>}/>
   </Routes>
   <Foot/>
  
  </BrowserRouter>
  )
}
