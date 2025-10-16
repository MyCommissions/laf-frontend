"use client";
import React, { useState } from "react";
import { Pencil } from "lucide-react";
import { useGetFoundItems } from "../../../../../domain/hooks/useItems";
import { Item } from "../../../../../data/models/Item"; // ✅ Use your shared model


import TableItemDetailsModal from "./TableItemsDetailsModal";

const DataTable: React.FC = () => {
  const { data: items, isLoading, isError } = useGetFoundItems();
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

 

  if (isLoading) {
    return (
      <div className="text-center text-gray-400 mt-10">Loading items...</div>
    );
  }

  if (isError || !items) {
    return (
      <div className="text-center text-red-500 mt-10">
        Failed to load items.
      </div>
    );
  }

  // ✅ Handle cell click
  const handleRowClick = (item: Item) => setSelectedItem(item);
 
  

  return (
    <div className="bg-[#0f172a] rounded-xl shadow-lg p-6 w-full max-w-20xl mx-auto">
      {/* Table Header */}
      <div className="grid grid-cols-12 py-4 px-6 border-b border-gray-700 text-sm font-semibold uppercase tracking-wider">
        <div className="col-span-2"></div>
        <div>Item No.</div>
        <div>Time</div>
        <div>Date</div>
        <div>Category</div>
        <div>Amount</div>
        <div>Size</div>
        <div>Color</div>
        <div>Brand</div>
        <div>Unique ID</div>
        <div>Status</div>
        <div></div>
      </div>

      {/* Table Rows */}
      <div className="divide-y divide-gray-700">
        {items.map((item: Item, index: number) => {
          const createdAt = new Date(item.createdAt);
          const time = createdAt.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });
          const date = createdAt.toLocaleDateString();

          const status = item.status
            ? item.status.charAt(0).toUpperCase() + item.status.slice(1)
            : "Pending";

          return (
            <div
              key={item._id}
              onClick={() => handleRowClick(item)} // clickable row
              className="grid grid-cols-12 py-4 px-6 items-center hover:bg-gray-800 transition-colors cursor-pointer"
            >
              <div className="col-span-2 flex items-center gap-3">
                <img
                  className="h-10 w-10 rounded-full object-cover"
                  src={
                    item.imageUrl
                      ? `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/${item.imageUrl}`
                      : "https://placehold.co/40x40/6366f1/ffffff?text=NA"
                  }
                  alt={item.category}
                />
                <div>
                  <div className="text-sm font-medium">
                    {item.firstName} {item.lastName}
                  </div>
                  <div className="text-xs text-gray-400">{item.email}</div>
                  <div className="text-xs text-gray-400">
                    {item.contactNumber}
                  </div>
                </div>
              </div>

              <div className="text-sm font-medium">{index + 1}</div>
              <div className="text-sm font-medium">{time}</div>
              <div className="text-xs text-gray-400">{date}</div>
              <div className="text-xs text-gray-400">{item.category}</div>
              <div className="text-xs text-gray-400">
                {item.moneyAmount ?? "-"}
              </div>
              <div className="text-xs text-gray-400">N/A</div>
              <div className="text-xs text-gray-400">N/A</div>
              <div className="text-xs text-gray-400">{item.brandType}</div>
              <div className="text-xs text-gray-400">
                {item.uniqueIdentifier}
              </div>

              <div className="flex flex-row ml-7 items-center">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    item.status === "Pending"
                      ? "bg-yellow-400 text-yellow-900"
                      : item.status === "Matched"
                      ? "bg-blue-400 text-blue-900"
                      : "bg-green-400 text-green-900"
                  }`}
                >
                  {status}
                </span> 
              </div>
            </div>

         
          );
        })}
      </div>
        {/* Item Details Modal */}
            {selectedItem && ( <TableItemDetailsModal
              item= {selectedItem}
              onClose={() => setSelectedItem(null)}
              onEdit={(item) => console.log("Edit:", item)}
              onDelete={(id) => console.log("Delete:", id)}
              /> 
            )}
    </div>
  );
};

export default DataTable;
