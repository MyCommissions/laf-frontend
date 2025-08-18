import React, { useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import FoundCard from '../ui/FoundCard';

const categories: string[] = ['Category', 'Umbrella', 'Wallet', 'Keys', 'Phone'];

const LostFoundPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Category');
  const [searchQuery, setSearchQuery] = useState<string>('');

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header section with shadow and rounded corners */}
      <div className="bg-white p-6 shadow-md rounded-lg mb-8">
        <h1 className="text-4xl font-serif font-bold text-gray-800 mb-6">Lost & Found items</h1>

        {/* Flex container for the controls */}
        <div className="flex items-center space-x-4">
          {/* Category Dropdown and Umbrealla tag */}
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

          {/* Action Buttons */}
          <div className="flex space-x-4 w-full sm:w-auto">
            <button className="whitespace-nowrap px-6 py-2 rounded-full border border-gray-300 bg-white text-black font-semibold shadow-md transition-all duration-200 hover:bg-gray-100">
              Post Found Item
            </button>
            <button className="whitespace-nowrap px-6 py-2 rounded-full bg-black text-white font-semibold shadow-md transition-all duration-200 hover:bg-gray-800">
              Report Lost Item
            </button>
          </div>
        </div>
      </div>

      {/* Main content area for found items */}
      <div className="bg-white p-6 shadow-md rounded-lg">
        {/* Placeholder for the found items list */}
        <h2 className="text-2xl font-semibold mb-4">Found Items</h2>
        <div className="text-center text-gray-500 py-10">
          <FoundCard
          itemName='Umbrella'
          id='01'
          time='2:30pm'
          description='nawala nako siya sa canteen, nabilin'
          />
        </div>
      </div>
    </div>
  );
};

export default LostFoundPage;
