import React, { useState } from "react";
import { ChevronDown, Search, Filter } from "lucide-react"; // ✅ Filter icon imported
import DataTable from "./table/DataTable";

const categories: string[] = [
  "Category",
  "Umbrella",
  "Wallet",
  "Keys",
  "Phone",
];

const Home: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Category");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [isPostOpen, setIsPostOpen] = useState(false);
  const [isLostOpen, setIsLostOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header section */}
      <div className="bg-white p-6 shadow-md rounded-lg mb-8">
        <h1 className="text-4xl font-serif font-bold text-gray-800 mb-6">
          Records
        </h1>

        {/* Controls */}
        <div className="flex items-center space-x-4">
          {/* Category Dropdown */}
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <div className="relative inline-block">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full appearance-none pr-8 pl-4 py-2 rounded-full border border-gray-300 bg-gray-100 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <ChevronDown size={20} />
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative flex items-center w-full">
            <input
              type="text"
              placeholder="Search here..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-10 py-2 rounded-full border border-gray-300 bg-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Search size={20} />
            </div>
          </div>

           {/* ✅ Passive Filter Label */}
              <div className="flex items-center text-gray-500 space-x-1 select-none">
                <Filter size={18} />
                <span className="text-sm font-medium">Filter</span>
              </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 w-full sm:w-auto items-center">
            {/* Pending Items Button */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsPostOpen(true)}
                className="whitespace-nowrap px-6 py-2 rounded-full border border-gray-300 bg-white text-black font-semibold shadow-md transition-all duration-200 hover:bg-gray-100"
              >
                Pending Items
              </button>

             
            </div>

            {/* Matched Items Button */}
            <button
              onClick={() => setIsLostOpen(true)}
              style={{ backgroundColor: "#F80B02" }}
              className="whitespace-nowrap px-6 py-2 rounded-full border border-gray-300 text-white font-semibold shadow-md transition-all duration-200 hover:bg-opacity-90"
            >
              Matched Items
            </button>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="bg-white p-6 shadow-md rounded-lg">
        <div className="text-center text-gray-500 py-10">
          <DataTable />
        </div>
      </div>
    </div>
  );
};

export default Home;
