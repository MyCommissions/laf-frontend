"use client";
import React, { useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import ClaimDataTable from "./table/ClaimDataTable";
import { useGetClaimedItems } from "../../../../domain/hooks/useItems";
import type { Item } from "../../../../data/models/Item";

const categories: string[] = [
  "Category",
  "Umbrella",
  "Wallet",
  "Cash",
  "Phone",
  "ID",
  "Others",
];

const Claim: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("Category");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"Pending" | "Matched">("Matched");

  // ✅ Fetch claimed items using your React Query hook
  const { data: items = [], isLoading, isError } = useGetClaimedItems();

  const filteredItems: Item[] =
    items?.filter(
      (item) =>
        (selectedCategory === "Category" ||
          item?.foundItem?.category?.toLowerCase() ===
            selectedCategory.toLowerCase() ||
          item?.lostItem?.category?.toLowerCase() ===
            selectedCategory.toLowerCase()) &&
        (searchQuery === "" ||
          item?.foundItem?.firstName
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          item?.foundItem?.lastName
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          item?.lostItem?.firstName
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          item?.lostItem?.lastName
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()))
    ) || [];

  const renderContent = () => {
    if (isLoading)
      return <div className="text-center text-gray-400 py-10">Loading...</div>;
    if (isError)
      return (
        <div className="text-center text-red-500 py-10">
          Failed to load claimed items.
        </div>
      );

    return <ClaimDataTable items={filteredItems} />;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header */}
      <div className="bg-white p-6 shadow-md rounded-lg mb-8">
        <h1 className="text-4xl font-serif font-bold text-gray-800 mb-6">
          Records
        </h1>

        {/* Controls */}
        <div className="flex flex-col md:flex-row items-center gap-4">
          {/* Category Dropdown */}
          <div className="relative inline-block w-full md:w-auto">
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
        </div>
      </div>

      {/* Table */}
      <div className="bg-white p-6 shadow-md rounded-lg">{renderContent()}</div>
    </div>
  );
};

export default Claim;
