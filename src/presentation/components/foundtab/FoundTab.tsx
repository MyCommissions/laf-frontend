import React, { useState, useRef } from "react";
import { ChevronDown, Search, ChevronLeft, ChevronRight } from "lucide-react";
import FoundCard from "../foundcard/FoundCard";
import PostFoundModal from "../postmodal/PostFoundModal";
import PostLostModal from "../postmodal/PostLostModal";
import ItemDetailsModal from "../foundcard/itemDetailsModal"; // ✅ import modal
import { useGetFoundItems } from "../../../domain/hooks/useItems";
import { Item } from "../../../data/models/Item";

const categories: string[] = [
  "Category",
  "Umbrella",
  "Wallet",
  "Keys",
  "Phone",
  "ID",
  "Others",
];

const FoundTab: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Category");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [isPostOpen, setIsPostOpen] = useState(false);
  const [isLostOpen, setIsLostOpen] = useState(false);

  const [selectedItem, setSelectedItem] = useState<Item | null>(null); // ✅ selected item
  const [isModalOpen, setIsModalOpen] = useState(false); // ✅ modal state

  const scrollRef = useRef<HTMLDivElement | null>(null);

  // ✅ fetch items from backend
  const { data: items, isLoading, isError } = useGetFoundItems();

  // ✅ filter items locally
  const filteredItems = items?.filter((item: Item) => {
    const matchesCategory =
      selectedCategory === "Category" || item.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      item.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.remarks?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // ✅ handle scroll buttons
  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -clientWidth : clientWidth,
        behavior: "smooth",
      });
    }
  };

  // ✅ handle open modal
  const handleOpenModal = (item: Item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header */}
      <div className="bg-white p-6 shadow-md rounded-lg mb-8">
        <h1 className="text-4xl font-serif font-bold text-gray-800 mb-6">
          Lost & Found items
        </h1>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Category Dropdown */}
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full appearance-none pr-8 pl-4 py-2 rounded-full border border-gray-300 bg-gray-100 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
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

          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <input
              type="text"
              placeholder="Search here..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-10 py-2 rounded-full border border-gray-300 bg-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Search size={20} />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => setIsPostOpen(true)}
              className="px-6 py-2 rounded-full border border-gray-300 bg-white text-black font-semibold shadow-md hover:bg-gray-100"
            >
              Post Found Item
            </button>
            <PostFoundModal
              open={isPostOpen}
              onClose={() => setIsPostOpen(false)}
            />

            <button
              onClick={() => setIsLostOpen(true)}
              style={{ backgroundColor: "#F80B02" }}
              className="px-6 py-2 rounded-full border border-gray-300 bg-white text-white font-semibold shadow-md hover:bg-gray-100"
            >
              Report Lost Item
            </button>
            <PostLostModal
              open={isLostOpen}
              onClose={() => setIsLostOpen(false)}
            />
          </div>
        </div>
      </div>

      {/* Items Section */}
      <div className="bg-white p-6 shadow-md rounded-lg relative">
        {isLoading && (
          <p className="text-gray-500 text-center">Loading items...</p>
        )}
        {isError && (
          <p className="text-red-500 text-center">Failed to load items.</p>
        )}

        {filteredItems && filteredItems.length > 0 ? (
          <div className="relative">
            {/* Left Scroll Button */}
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-100"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Horizontal Scroll Container */}
            <div
              ref={scrollRef}
              className="flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
            >
              {filteredItems.map((item) => (
                <div key={item._id} className="flex-shrink-0 w-80 snap-start">
                  <FoundCard
                    id={item._id}
                    itemName={item.category}
                    time={item.createdAt}
                    description={item.remarks || "No description provided"}
                    imageSrc={item.imageUrl}
                  />
                </div>
              ))}
            </div>

            {/* Right Scroll Button */}
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-100"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        ) : (
          !isLoading && (
            <div className="text-center text-gray-500 py-10">
              No found items available.
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default FoundTab;
