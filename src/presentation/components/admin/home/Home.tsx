"use client";
import React, { useState } from "react";
import { ChevronDown, Search, Filter } from "lucide-react";
import DataTable from "./table/DataTable";
import { useGetMatchedAndPendingItems } from "../../../../domain/hooks/useItems";
import { Item } from "../../../../data/models/Item";

const categories: string[] = [
  "Category",
  "Accessories",
  "Cash",
  "Documents",
  "Gadgets",
  "ID",
  "Keys",
  "Umbrella",
  "Wallet",
  "Others",
];

const Home: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Category");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"Pending" | "Matched">("Pending");

  const { data: items, isLoading, isError, refetch } =
    useGetMatchedAndPendingItems();

  const filteredItems: Item[] =
    items?.filter(
      (item) =>
        item.status?.toLowerCase() === activeTab.toLowerCase() &&
        (selectedCategory === "Category" ||
          item.category?.toLowerCase() === selectedCategory.toLowerCase()) &&
        (searchQuery === "" ||
          item.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.uniqueIdentifier
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()))
    ) || [];

  const handleTabClick = (tab: "Pending" | "Matched") => setActiveTab(tab);

  const refreshTable = () => refetch();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
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

          {/* Filter Tabs */}
          <div className="flex items-center space-x-4 text-gray-500 select-none">
            <div className="flex items-center space-x-1">
              <Filter size={18} />
              <span className="text-sm font-medium">Filter</span>
            </div>

            <div className="flex bg-gray-200 rounded-full p-1 relative">
              {["Pending", "Matched"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabClick(tab as "Pending" | "Matched")}
                  className={`relative z-10 px-4 py-1 text-sm font-medium rounded-full transition-all duration-300 ${
                    activeTab === tab
                      ? "text-white"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <span className="absolute inset-0 rounded-full bg-black transition-all duration-300 scale-105 z-[-1]" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 shadow-md rounded-lg">
        {isLoading ? (
          <div className="text-center text-gray-400 py-10">Loading...</div>
        ) : isError ? (
          <div className="text-center text-red-500 py-10">
            Failed to load items.
          </div>
        ) : (
          <DataTable items={filteredItems} refreshTable={refreshTable} />
        )}
      </div>
    </div>
  );
};

export default Home;
