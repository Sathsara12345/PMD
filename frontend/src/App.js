import React, { useState } from 'react';
import Login from './Login';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signup from './Signup';
import Home from './Home';
import Dashboard from './Dashboard';
import './App.scss';
import ManageMechanic from './ManageMechanic ';
import Filter_specialty from './filter_specialty';


function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path="/Dashboard" element={<Dashboard/>} />
        <Route path="/Home" element={<Home />} />
        <Route path="/ManageMechanic" element={<ManageMechanic/>} />
        <Route path="/Filter_specialty" element={<Filter_specialty/>} />

      </Routes>      
    </BrowserRouter>
    
  );
}

export default App;
