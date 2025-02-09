import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import AuthImagePattern from '../pages/AuthImagePattern';
import { Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Loader2, MessageSquare } from 'lucide-react';
import toast from 'react-hot-toast';

const Login = () => {
  const { authUser, login, isLogging } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [formdata, setFormdata] = useState({
    email: '',
    password: '',
  });

  const validateForm = () => {
    if (!formdata.email.trim()) return toast.error('Email is required');
    if (!formdata.password) return toast.error('Password is required');
    if (formdata.password.length < 6) return toast.error('Password must be at least 6 characters');
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form reload
    const success = validateForm();
    if (success) {
      login(formdata); // Remove extra `{}` around formdata
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 raleway">
      {/* Left Side - Form */}
      <div className="flex items-center justify-center min-h-screen p-4">
        <form onSubmit={handleLogin} className="w-full sm:w-[350px] p-6 rounded-lg ">
          <div className="flex flex-col gap-2 items-center justify-center">
            <MessageSquare size={60} className="text-white bg-blue-400 p-3 rounded-lg" />
            <h1 className="text-2xl font-semibold">Welcome Back!</h1>
            <p className="mb-4 text-sm font-light">Login to continue your conversations</p>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <div className="flex items-center gap-2 input input-bordered">
              <Mail size={18} strokeWidth={1} />
              <input
                type="text"
                className="w-full outline-none"
                placeholder="Email"
                value={formdata.email}
                onChange={(e) => setFormdata({ ...formdata, email: e.target.value })}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Password</label>
            <div className="flex items-center gap-2 input input-bordered">
              <Lock size={18} strokeWidth={1} />
              <input
                type={showPassword ? 'text' : 'password'}
                className="w-full outline-none"
                placeholder="••••••••"
                value={formdata.password}
                onChange={(e) => setFormdata({ ...formdata, password: e.target.value })}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <Eye size={18} strokeWidth={1} /> : <EyeOff size={18} strokeWidth={1} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            disabled={isLogging} // Use isLogging instead of isSigningup
          >
            {isLogging ? <Loader2 className="size-5 animate-spin mx-auto" /> : 'Login'}
          </button>

          <div className="mt-6 flex items-center justify-center text-sm text-gray-600">
            <p>
              Don't have an account?{' '}
              <Link to="/signup" className="link link-primary">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>

      {/* Right Side - Image */}
     <div className='mt-10'>
      <AuthImagePattern title="Welcome Back!" subtitle="Login to continue your conversations and catch up with messages" />
     </div>
    </div>
  );
};

export default Login;
