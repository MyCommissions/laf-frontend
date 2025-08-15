import { useState } from "react";
import { Search, Eye } from "lucide-react";
import Card from "../components/ui/Card";


// HomeLayout component that arranges the two cards
export default function HomeLayout() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-[#D6D3D1] p-8 gap-32">
      {/* Left Section - Lost Card */}
      <Card
        title="Lost"
        description="I lost something"
        icon={<Search className="w-8 h-8" />}
      />

      {/* Right Section - Found Card */}
      <Card
        title="Found"
        description="I found something"
        icon={<Eye className="w-8 h-8" />}
      />
    </div>
  );
}

// Main App component to render the layout
export function App() {
  return <HomeLayout />;
}
