"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { User, Lock } from "lucide-react";

export default function LoginPage() {
  const [rememberMe, setRememberMe] = useState(false);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login attempted with:", credentials);
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#121212] to-purple-800">
      <div className="w-full max-w-md bg-gradient-to-b from-[#1a1a1a] to-purple-900 text-white rounded-xl shadow-xl overflow-hidden">
        {/* Header Section */}
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 bg-purple-400 rotate-45"></div>
              <span className="text-white font-bold text-2xl">WELCOME BACK!</span>
            </div>
            <button className="bg-white text-purple-800 px-4 py-1.5 rounded-md text-sm font-medium">
              <a href="/signup">Create Account</a>
            </button>
          </div>
        </div>

        {/* Login Form Section */}
        <div className="p-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold">USER LOGIN</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <User className="h-5 w-5 text-gray-300" />
              </div>
              <input
                type="text"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                placeholder="Email or Username"
                className="w-full pl-10 pr-4 py-2 bg-purple-800/40 border border-purple-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 text-white placeholder-gray-300"
                required
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Lock className="h-5 w-5 text-gray-300" />
              </div>
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full pl-10 pr-4 py-2 bg-purple-800/40 border border-purple-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 text-white placeholder-gray-300"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-400 border-gray-300 rounded"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-300">
                  Remember
                </label>
              </div>
              <div className="text-sm">
                <Link to="#" className="text-gray-300 hover:text-purple-400">
                  Forgot password?
                </Link>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-purple-600 cursor-pointer text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors font-bold"
              >
                LOGIN
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
