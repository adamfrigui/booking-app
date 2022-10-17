import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import List from './pages/list/List'
import Home from './pages/home/Home'
import Hotel from './pages/hotel/Hotel'
import './App.css'
import Login from './pages/login/Login'
import { useState } from 'react'
 
 

const App = () => {
 
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/hotels' element={<List />}/>
          <Route path='/hotel/:id' element={<Hotel/>}/>
          <Route path='/login' element={<Login/>} style={{backgroundColor: 'blue'}}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App