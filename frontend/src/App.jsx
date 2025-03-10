import { useState, useEffect } from 'react'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'

import { Toaster } from "react-hot-toast";

import { useAuthStore } from './stores/useAuthStore';

import Navbar from './components/Navbar'
import HomePage from './components/HomePage'
import SignupPage from './components/SignupPage'
import LoginPage from './components/LoginPage'
import ProfilePage from './components/ProfilePage';
import CheckPage from './components/CheckPage'
import Contact from './components/Contact';
import MultiStepForm from "./components/MultiStepForm.jsx";

function App() {

  const { authUser, isCheckingAuth, checkAuth, fullName } = useAuthStore();

  useEffect(() => {
    checkAuth();
  },[]);

  if(isCheckingAuth && !authUser){
    return <h1>wait for a while...</h1>
  }

  return (
      <div>
        <Navbar />    {/* Navbar will be displayed on all pages */}

        <Routes>
          <Route path="/" element={ authUser ? <HomePage /> : <Navigate to="/login" />} />
          <Route path="/signup" element={!authUser ? <SignupPage /> : < Navigate to="/" />} />
          <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
          <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
          <Route path="/checkpage" element={ <CheckPage /> } />
          <Route path='/contact' element={ authUser ? <Contact /> : <Navigate to="/login" />} />
          <Route path='/oauth-form' element={fullName ? <MultiStepForm /> : <Navigate to="/login" /> } />
        </Routes>

        <Toaster />
      </div>
  );
};

export default App
