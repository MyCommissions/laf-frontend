import React, { useState } from 'react';
import { Search } from 'lucide-react';

 const [searchQuery, setSearchQuery] = useState<string>('');

const SearchUI = ({ title, description, icon }: { title: string; description: string; icon: React.ReactNode }) => {
  return (
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
  );
};


export default SearchUI;
