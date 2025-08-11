
export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-gray-100">
            {/* Left Section */}
            <div className="w-full lg:w-1/2">
                <>HEllo</>
            </div>

            {/* Right Section */}
            <div className="w-full lg:w-1/2 bg-[#4E944F] rounded-tl-[60px] lg:rounded-tl-[250px] lg:rounded-bl-[250px] shadow mt-8 lg:mt-0">
                {children}
            </div>
        </div>
    );
}
