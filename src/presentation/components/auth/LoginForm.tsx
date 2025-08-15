import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#D4D4D4] p-4">
      <div className="w-full max-w-sm bg-white p-8 rounded-[30px] shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        {/* Email Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            placeholder="Input Email"
            className="w-full px-4 py-2 rounded-xl shadow-sm border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Password Field - Eye icon is now correctly centered and functional */}
        <div className="mb-2">
          <label className="block text-sm font-medium mb-1">Password</label>
          {/* New relative div to correctly position the eye icon */}
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Input Password"
              className="w-full px-4 py-2 pr-10 rounded-xl shadow-sm border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
            />
            <div
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
          </div>
        </div>

        <div className="text-right text-sm text-gray-600 mb-4 cursor-pointer hover:underline">
          Forget Password
        </div>

        <button className="w-full bg-black text-white py-2 rounded-full hover:bg-gray-800 transition">
          log in
        </button>
      </div>
    </div>
  );
};

export default Login;
  