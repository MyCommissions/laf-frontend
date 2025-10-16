import LoginComponent from "../components/login/LoginComponent";


export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-gray-100">
            {/* Left Section */}
            <div className="w-full lg:w-1/2">
                <LoginComponent/>
            </div>

            {/* Right Section */}
            <div className="w-full lg:w-1/2">
                {children}
            </div>
        </div>
    );
}
