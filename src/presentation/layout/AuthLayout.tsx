import LoginComponent from "../components/login/LoginComponent";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-gray-100 
                        px-4 sm:px-6 md:px-8">

            {/* Left Section */}
            <div className="
                w-full 
                lg:w-1/2 
                flex justify-center 
                mb-8 lg:mb-0
            ">
                <div className="w-full max-w-[500px]">
                    <LoginComponent/>
                </div>
            </div>

            {/* Right Section */}
            <div className="
                w-full 
                lg:w-1/2 
                flex justify-center
            ">
                <div className="w-full max-w-[500px]">
                    {children}
                </div>
            </div>
        </div>
    );
}
