import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Homepage from './Components/Homepage/HomePage';
import Profile from './Components/Profile';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/profile" element={<Profile />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
