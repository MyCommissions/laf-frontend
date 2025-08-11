import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RegisterRequest } from "../../../data/models/User";
import { EyeOff, Eye, Loader } from "lucide-react";
import { ToastMessage } from "../ui/ToastMessage";
import { useRegister } from "../../../domain/hooks/useAuth";
import { registerSchema } from "../../../domain/validations/userValidation";

export default function RegisterForm() {
    const [toastType, setToastType] = useState<"success" | "error" | "warning">("success");
    const [showToast, setShowToast] = useState(false);
    const [showMessage, setShowMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const mutation = useRegister();
    const [formData, setFormData] = useState<RegisterRequest>({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
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

        const result = registerSchema.safeParse(formData);
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

                setTimeout(() => {
                    navigate('/signin');
                }, 1500);
            },
            onError: (error) => {
                setToastType("error");
                setShowMessage(error.message || "Registration failed!");
                setError(error.message || "Registration failed!");
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
                    Create Account
                </h2>
                <p className="mt-2 text-lg sm:text-xl italic font-medium text-[#FFFFFF]">
                    Let's create your account to start
                </p>
            </div>

            {/* Form Container */}
            <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-[625px] login-form">
                {/* Email Field */}
                <div className="flex justify-between gap-12">
                    <div className="w-full">
                        <label htmlFor="firstname" className="block text-base sm:text-lg font-medium text-[#FFFFFF]">
                            First Name
                        </label>
                        <div className="mt-2">
                            <input
                                id="firstname"
                                name="firstname"
                                type="text"
                                required
                                placeholder="John"
                                value={formData.firstname}
                                onChange={handleChange}
                                className="w-full h-12 sm:h-[62px] rounded-[10px] border border-white bg-[#E9EFC040] px-4 py-2 text-sm sm:text-base text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500"
                            />
                        </div>
                    </div>
                    <div className="w-full">
                        <label htmlFor="lastname" className="block text-base sm:text-lg font-medium text-[#FFFFFF]">
                        Last Name
                    </label>
                        <div className="mt-2">
                            <input
                                id="lastname"
                                name="lastname"
                                type="text"
                                required
                                placeholder="Doe"
                                value={formData.lastname}
                                onChange={handleChange}
                                className="w-full h-12 sm:h-[62px] rounded-[10px] border border-white bg-[#E9EFC040] px-4 py-2 text-sm sm:text-base text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500"
                            />
                        </div>
                    </div>
                </div>
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

                {error && <p className="text-red-500 text-sm">{error}</p>}

                {/* Submit Button */}
                <div className="flex justify-center">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-[13vw] h-12 sm:h-[62px] flex mt-5 justify-center items-center rounded-md bg-[#B4E197] border border-[#B4E197] px-3 py-2 text-base sm:text-lg font-semibold text-black shadow-xs hover:bg-[#E9EFC040] hover:border-white hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        {loading ? (
                                <>
                                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                                    Signing up...
                                </> 
                            ) : (
                                "Sign up"
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
                Already have an account?{' '}
                <Link to="/signin" className="font-semibold hover:text-indigo-600 underline">
                    Sign in
                </Link>
            </p>
        </div>
    );
}
