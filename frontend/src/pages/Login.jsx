import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import API from "../services/api";
import { toast } from "sonner";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "prabhat@gmail.com",
    password: "123456",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const res = await API.post(
        "/auth/login",
        formData
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      toast.success("Login successful");

      navigate(`/feed/${res.data.user._id}`);

    } catch (error) {
      toast.error(error.response.data.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 flex items-center justify-center px-4 py-12">
  <div className="w-full max-w-md">
    {/* Logo/Brand Section */}
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl shadow-lg shadow-purple-500/30 mb-4">
        <span className="text-3xl">🌐</span>
      </div>
      <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-700 bg-clip-text text-transparent">
        Welcome Back
      </h1>
      <p className="text-gray-500 mt-2">
        Sign in to continue to SocialSphere
      </p>
    </div>

    {/* Login Form */}
    <form
      className="bg-white rounded-2xl shadow-xl p-8 space-y-6"
      onSubmit={handleSubmit}
    >
      <div className="space-y-5">
        {/* Email Field */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-400 text-lg">📧</span>
            </div>
            <input
              type="email"
              name="email"

              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all duration-200"
              placeholder="Enter your email"
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-400 text-lg">🔒</span>
            </div>
            <input
              type="password"
              name="password"
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all duration-200"
              placeholder="Enter your password"
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Forgot Password Link */}
        <div className="text-right">
          <button
            type="button"
            className="text-sm text-purple-600 hover:text-purple-700 font-medium"
            onClick={() => {/* Add forgot password logic */}}
          >
            Forgot password?
          </button>
        </div>
      </div>

      {/* Login Button */}
      <button
        type="submit"
        className="w-full py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl font-semibold text-base hover:-translate-y-0.5 hover:shadow-lg hover:shadow-purple-500/40 transition-all duration-200 active:translate-y-0"
      >
        Sign In
      </button>

      {/* Register Link */}
      <div className="text-center pt-4 border-t border-gray-100">
        <p className="text-gray-600 text-sm">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="text-purple-600 hover:text-purple-700 font-semibold hover:underline transition-colors"
          >
            Create account
          </Link>
        </p>
      </div>
    </form>

    {/* Demo Credentials Hint (Optional) */}
    <div className="mt-6 text-center">
      <p className="text-xs text-gray-400">
        Demo: email : prabhat@gmail.com / password :  123456
      </p>
    </div>
  </div>
</div>
  );
}

export default Login;
