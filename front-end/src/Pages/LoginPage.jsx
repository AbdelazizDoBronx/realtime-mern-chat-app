import React, { useState } from 'react';
import { Mail, Lock, LockOpen } from 'lucide-react'; // Removed User since Full Name is not required for login
import Animation from '../Components/animation'; // Assuming you have an animation component
import { useAuthStore } from '../Store/useAuthStore';

const LoginPage = () => {
  const { isLogining, logIn } = useAuthStore();  
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [toastMessage, setToastMessage] = useState(''); // State for handling toast messages

  // Validation function
  function formValidation() {
    if (!formData.email && !formData.password) {
      setToastMessage('Email and password are required!');
      return false;
    }
    if (!formData.email) {
      setToastMessage('Email is required!');
      return false;
    }
    if (!formData.password) {
      setToastMessage('Password is required!');
      return false;
    }
    if (formData.password.length < 6) {
      setToastMessage('Password must be at least 6 characters long!');
      return false;
    }

    setToastMessage(''); // Clear toast if validation passes
    return true;
  }

  // Handle form submission
  function handleSubmit(e) {
    e.preventDefault();
    const isValid = formValidation();
    if (isValid) {
      console.log(formData); // Proceed with form submission
      logIn(formData); // Call signIn instead of signUp
    }
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-gray-100">
      {/* Left Side: Information Section */}
      <div className="flex flex-col gap-6 justify-center items-center bg-slate-700 text-white px-8 py-6">
        <Animation />
        <h2 className="text-3xl font-semibold">Sign In</h2>
        <p className="text-lg">Welcome back! Please enter your credentials.</p>
      </div>

      {/* Right Side: Login Form */}
      <div className="flex justify-center items-center bg-white px-8 py-6 shadow-md">
        <form className="w-full max-w-md space-y-6" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-semibold text-center mb-4">Log In</h2>

          {/* Email Field */}
          <div className="mb-4 flex items-center border border-gray-300 rounded-lg">
            <Mail size={20} className="ml-3 text-gray-500" />
            <input
              type="email"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              value={formData.email}
              id="email"
              name="email"
              placeholder="Enter your email"
              className="p-3 w-full border-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password Field */}
          <div className="mb-6 flex items-center border border-gray-300 rounded-lg">
            {!showPassword ? (
              <Lock
                onClick={() => setShowPassword(true)}
                size={20}
                className="ml-3 text-gray-500 cursor-pointer"
              />
            ) : (
              <LockOpen
                onClick={() => setShowPassword(false)}
                size={20}
                className="ml-3 text-gray-500 cursor-pointer"
              />
            )}
            <input
              type={!showPassword ? 'password' : 'text'}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              value={formData.password}
              id="password"
              name="password"
              placeholder="Enter your password"
              className="p-3 w-full border-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 flex items-center justify-center bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {isLogining ? (
              <span className="loading loading-spinner loading-md"></span>
            ) : (
              'Sign In'
            )}
          </button>

          {/* Forgot Password Link */}
          <div className="text-center mt-4">
            <a href="#" className="text-sm text-blue-500 hover:underline">
              Forgot Password?
            </a>
          </div>

          {/* Sign Up Link */}
          <div className="text-center mt-4">
            <p className="text-sm">
              Don't have an account?{' '}
              <a href="#" className="text-blue-500 hover:underline">
                Create one
              </a>
            </p>
          </div>
        </form>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast toast-top toast-center absolute top-10 left-1/2 transform -translate-x-1/2 z-50">
          <div className="alert alert-info">
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
