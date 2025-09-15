import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const categories: string[] = [
  "Category",
  "Umbrella",
  "Wallet",
  "Keys",
  "Phone",
];

const DropdownMenu = () => {
  const [selectedOption, setSelectedOption] = useState("Category");

  return (
    <div className="relative inline-block w-full sm:w-auto">
      {/* The select element handles the dropdown functionality */}
      <select
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
        className="w-full sm:w-auto appearance-none pr-8 pl-4 py-2 rounded-full border border-gray-300 bg-gray-100 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
      >
        {categories.map((category, index) => (
          <option
            key={category}
            value={category}
            disabled={index === 0}
            hidden={index === 0 && selectedOption !== "Category"}
          >
            {category}
          </option>
        ))}
      </select>

      {/* This div acts as a custom icon, since the native select arrow is hidden */}
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <ChevronDown size={20} />
      </div>
    </div>
  );
};

export default DropdownMenu;
