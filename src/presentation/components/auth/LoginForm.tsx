import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-[30px] shadow-lg w-80 border-style:solid border-width:10px">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        {/* Email Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            placeholder="Input Email"
            className="w-full px-4 py-2 rounded-xl shadow-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Password Field */}
        <div className="mb-2 relative">
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Input Password"
            className="w-full px-4 py-2 pr-10 rounded-xl shadow-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <div
            className="absolute right-3 top-9 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
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
