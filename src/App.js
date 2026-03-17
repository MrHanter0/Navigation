// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { SalonProvider } from './Context/SalonContext';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Appointments from './Pages/Appointments';
import CreateAppointment from './Pages/CreateAppointment';

function App() {
  return (
    <SalonProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/create-appointment" element={<CreateAppointment />} />
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </Router>
    </SalonProvider>
  );
}

export default App;