import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Mail, UserRound, Lock, Eye, EyeOff, Loader2, MessageSquare } from 'lucide-react'
import { Link } from 'react-router-dom'
import AuthImagePattern from '../pages/AuthImagePattern'

import toast from 'react-hot-toast'

const Signup = () => {
  const [showPassword, setShowpassword] = useState(false)
  const [formData, setFormdata] = useState({
    email: "",
    fullname: "",
    password: ""
  })
  const { isSigningup, signup } = useAuthStore()

  const validateForm = () => {
    if (!formData.fullname.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");
    return true;
  };

  const handleSignup = (e) => {
    e.preventDefault()
    const success = validateForm()
    if(success){
      signup(formData)
    }
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 raleway'>
      {/* Left Side - Form */}
      <div className="flex items-center justify-center min-h-screen p-4">
        <form onSubmit={handleSignup} className="w-full sm:w-[350px] p-6 rounded-lg">
          <div className='flex flex-col gap-2 items-center justify-center'>
            <MessageSquare size={60} className='text-white bg-blue-400 p-3 rounded-lg'/>
            <h1 className='  text-2xl font-semibold'>Create Account</h1>
            <p className='mb-4 text-sm font-light'>Get started with your free account</p>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium  mb-1">email</label>
            <div className="flex items-center gap-2 input input-bordered">
              <Mail size={18} strokeWidth={1} />
              <input
                type="text"
                className="w-full outline-none"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormdata({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Fullname</label>
            <div className="flex items-center gap-2 input input-bordered">
              <UserRound size={18} strokeWidth={1} />
              <input
                type="text"
                className="w-full outline-none"
                placeholder="Fullname"
                value={formData.fullname}
                onChange={(e) => setFormdata({ ...formData, fullname: e.target.value })}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Password</label>
            <div className="flex items-center gap-2 input input-bordered">
              <Lock size={18} strokeWidth={1} />
              <input
                type={showPassword ? "text" : "password"}
                className="w-full outline-none"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormdata({ ...formData, password: e.target.value })}
              />
              <button 
                type="button"
                onClick={() => setShowpassword(!showPassword)}
              >
                {showPassword ? <Eye size={18} strokeWidth={1} /> : <EyeOff size={18} strokeWidth={1} />}
              </button>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            disabled={isSigningup}
          >
            {isSigningup ? (
              <Loader2 className="size-5 animate-spin mx-auto" />
            ) : ("Create Account")}
          </button>

          <div className='mt-6 flex items-center justify-center text-sm text-gray-600'>
            <p>Already have an account?{" "}
              <Link to="/login" className='link link-primary'>
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>

      {/* Right Side - Image */}
      <div className='mt-10'>
      <AuthImagePattern 
        title="Join Our Community" 
        subtitle="Connect with friends, share moments, and stay in touch with your friends" 
      />
      </div>
    </div>
  )
}

export default Signup
