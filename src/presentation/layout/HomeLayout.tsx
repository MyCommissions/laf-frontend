import Card from "../components/ui/Card";
export default function HomeLayout() {
    return (
        <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-gray-100">
            {/* Left Section */}
            <div className="w-full lg:w-1/2">
                <Card title="Lost"/>
            </div>

            {/* Right Section */}
            <div className="w-full lg:w-1/2">
                 <Card title="Found"/>
            </div>
        </div>
    );
}
