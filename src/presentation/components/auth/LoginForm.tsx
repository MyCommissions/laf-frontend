import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginRequest } from "../../../data/models/User";
import { EyeOff, Eye, Loader } from "lucide-react";
import { ToastMessage } from "../ui/ToastMessage";
import { useLogin } from "../../../domain/hooks/useAuth";
import { loginSchema } from "../../../domain/validations/userValidation";

export default function LoginForm() {
    const [toastType, setToastType] = useState<"success" | "error" | "warning">("success");
    const [showToast, setShowToast] = useState(false);
    const [showMessage, setShowMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const mutation = useLogin();
    const [formData, setFormData] = useState<LoginRequest>({
        email: "",
        password: "",
        rememberMe: false
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (showToast) {
            const timer = setTimeout(() => setShowToast(false), 4000); // auto-close after 4s
            return () => clearTimeout(timer);
        }
    }, [showToast]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const result = loginSchema.safeParse(formData);
        if (!result.success) {
            setError(result.error.message);
            return;
        }

        mutation.mutate(result.data, {
            onSuccess: (data) => {
                const { message } = data;

                setToastType("success");
                setShowMessage(message);
                setShowToast(true);

                setTimeout(() => navigate('/dashboard'), 1500);
            },
            onError: (error) => {
                setToastType("error");
                setShowMessage(error.message || "Login failed");
                setError(error.message || "Login failed");
                setShowToast(true);
            },
            onSettled: () => {
                setLoading(false);
            }
        })
    };

    return (
        <div className="flex h-auto lg:h-[90vh] flex-col items-center justify-center px-4 sm:px-6 py-10">
            {/* Header */}
            <div className="text-center mb-8">
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#FFFFFF]">
                    Welcome Back!
                </h2>
                <p className="mt-2 text-lg sm:text-xl italic font-medium text-[#FFFFFF]">
                    Log in to your account to continue.
                </p>
            </div>

            {/* Form Container */}
            <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-[625px] login-form">
                {/* Email Field */}
                <div>
                    <label htmlFor="email" className="block text-base sm:text-lg font-medium text-[#FFFFFF]">
                        Email address
                    </label>
                    <div className="mt-2">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            autoComplete="email"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full h-12 sm:h-[62px] rounded-[10px] border border-white bg-[#E9EFC040] px-4 py-2 text-sm sm:text-base text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500"
                        />
                    </div>
                </div>

                {/* Password Field */}
                <div>
                    <label htmlFor="password" className="block text-base sm:text-lg font-medium text-[#FFFFFF]">
                        Password
                    </label>
                    <div className="mt-2 relative">
                        <input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            required
                            autoComplete="current-password"
                            placeholder="********"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full h-12 sm:h-[62px] rounded-[10px] border border-white bg-[#E9EFC040] px-4 py-2 pr-12 text-sm sm:text-base text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500"
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute inset-y-0 right-4 flex items-center text-white focus:outline-none"
                            tabIndex={-1}
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>

                    </div>
                </div>

                {/* Remember Me + Forgot */}
                <div className="flex items-center justify-between">
                    <label className="flex items-center space-x-2 cursor-pointer select-none text-sm text-[#FFFFFF]">
                        <input
                            type="checkbox"
                            checked={formData.rememberMe}
                            onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                rememberMe: e.target.checked
                            }))
                            }
                            className="peer hidden"
                        />
                        <div className="h-5 w-5 rounded border border-[#FFFFFF] bg-[#E9EFC040] peer-checked:bg-[#E9EFC040] peer-checked:border-[#FFFFFF] flex items-center justify-center">
                            {formData.rememberMe && (
                            <svg
                                className="w-3 h-3 text-white"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            )}
                        </div>
                        <span className="text-sm sm:text-base">Remember me</span>
                    </label>

                    <Link to="/forgot-password" className="text-sm sm:text-base font-semibold text-[#FFFFFF] hover:text-indigo-500 underline">
                        Forgot password?
                    </Link>
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                {/* Submit Button */}
                <div className="flex justify-center">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-[13vw] h-12 sm:h-[62px] flex justify-center items-center rounded-md bg-[#B4E197] border border-[#B4E197] px-3 py-2 text-base sm:text-lg font-semibold text-black shadow-xs hover:bg-[#E9EFC040] hover:border-white hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        {loading ? (
                                <>
                                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                                    Signing in...
                                </>
                            ) : (
                                "Sign in"
                            )
                        }
                    </button>
                </div>
            </form>

            {showToast && (
                <ToastMessage
                    type={toastType}
                    message={showMessage}
                    onClose={() => setShowToast(false)}
                />
            )}

            {/* Footer Link */}
            <p className="mt-4 text-center text-sm sm:text-base text-[#FFFFFF]">
                Don't have an account?{' '}
                <Link to="/signup" className="font-semibold hover:text-indigo-600 underline">
                    Sign up
                </Link>
            </p>
        </div>
    );
}
