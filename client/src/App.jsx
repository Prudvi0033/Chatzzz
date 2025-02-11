import React, { useEffect, useCallback } from 'react';
import Navbar from './pages/Navbar';
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Settings from './components/Settings';
import Profile from './components/Profile';
import { useAuthStore } from './store/useAuthStore';

import { Toaster } from 'react-hot-toast';
import { useThemeStore } from './store/useThemeStore';

const App = () => {
  const { authUser, checkAuth, isCheckingAuth} = useAuthStore();
  const {theme} = useThemeStore()
  const checkAuthMemoized = useCallback(checkAuth, []);
  

  useEffect(() => {
    checkAuthMemoized(); // Runs only once
  }, [checkAuthMemoized]);

  if (isCheckingAuth) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div data-theme={theme}>
      <Navbar />
      <Routes>
        <Route path='/' element={authUser ? <Home /> : <Navigate to="/login" />} />
        <Route path='/signup' element={!authUser ? <Signup /> : <Navigate to="/" />} />
        <Route path='/login' element={!authUser ? <Login /> : <Navigate to="/" />} />
        <Route path="/settings" element={<Settings />} />
        <Route path='/profile' element={authUser ? <Profile /> : <Navigate to="/login" />} />
      </Routes>

      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  );
};

export default App;
