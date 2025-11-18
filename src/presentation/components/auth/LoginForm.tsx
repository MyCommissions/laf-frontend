// src/presentation/components/auth/Login.tsx

import React, { useEffect, useState } from "react";
import { Eye, EyeOff, Loader } from "lucide-react";
import { useLogin } from "../../../domain/hooks/useAuth";
import { loginSchema } from "../../validations/userValidation";
import { useNavigate } from "react-router-dom";
import { ToastMessage } from "../ui/ToastMessage";
import { LoginRequest } from "../../../data/models/User";
import { useAuth } from "../../../presentation/providers/AuthProvider";

const Login: React.FC = () => {
  const [toastType, setToastType] = useState<"success" | "error" | "warning">("success");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<LoginRequest>({
    email: "",
    password: "",
  });

  const { setUser } = useAuth();

  const navigate = useNavigate();
  const { mutate: login, isPending } = useLogin();

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = loginSchema.safeParse(formData);
    if (!result.success) {
      setToastType("error");
      setToastMessage(result.error.message);
      setShowToast(true);
      return;
    }

    login(formData, {
      onSuccess: (data) => {
        
        if (data?.data?.user) {
          setUser(data.data.user);
        }

        setToastType("success");
        setToastMessage(data.message || "Login successful");
        setShowToast(true);

        

        if (data.data?.user.role == 1) {
          setTimeout(() => navigate("/admin/home"), 1500);
        } else {
          setTimeout(() => navigate("/home"), 1500);
        }
      },
      onError: (error: any) => {
        setToastType("error");
        setToastMessage(error.message || "Login failed");
        setShowToast(true);
      },
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#D4D4D4] p-4">
      <div className="w-full max-w-sm bg-white p-8 rounded-[30px] shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Input Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-xl shadow-sm border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Password Field */}
          <div className="mb-2">
            <label className="block text-sm font-medium mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Input Password"
                value={formData.password}
                onChange={handleChange}
                required
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

          {/* Forget Password */}
          {/* <div className="text-right text-sm text-gray-600 mb-4 cursor-pointer hover:underline">
            Forget Password
          </div> */}

          {/* Submit */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-black text-white py-2 mt-6 rounded-full hover:bg-gray-800 transition flex items-center justify-center"
          >
            {isPending ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </button>
        </form>

        {/* Toast */}
        {showToast && (
          <ToastMessage
            type={toastType}
            message={toastMessage}
            onClose={() => setShowToast(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Login;
