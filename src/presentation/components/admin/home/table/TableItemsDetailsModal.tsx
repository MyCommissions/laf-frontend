"use client";

import React from "react";
import { X } from "lucide-react";
import { Item } from "../../../../../data/models/Item";
import { getDisplayImageUrl } from "../../../../../utils/imageHelper";

interface ItemDetailsModalProps {
  item: Item | null;
  onClose: () => void;
  onEdit?: (item: Item) => void;
  onDelete?: (id: string) => void;
}

const TableItemDetailsModal: React.FC<ItemDetailsModalProps> = ({
  item,
  onClose,
  onEdit,
  onDelete,
}) => {
  if (!item) return null;

  const createdAt = new Date(item.createdAt);
  const time = createdAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const date = createdAt.toLocaleDateString();

  const finalImageSrc = getDisplayImageUrl(item.imageUrl);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 font-sans">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl p-6 relative animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <X size={24} />
        </button>

        {/* Header */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-3">
          Item Details
        </h2>

        {/* Content Section */}
        <div className="flex gap-8">
          {/* Left Side - Image */}
          <div className="flex-shrink-0">
            <img
              src={
                finalImageSrc
                  ? finalImageSrc
                  : "https://placehold.co/180x180/6366f1/ffffff?text=No+Image"
              }
              alt={item.category}
              className="w-48 h-48 rounded-lg object-cover border border-gray-300"
            />
          </div>

          {/* Right Side - Details */}
          <div className="flex flex-col justify-start w-full text-sm text-gray-700">
            <div className="grid grid-cols-2 gap-y-2 gap-x-6">
              <div className="flex flex-col">
                <span className="font-semibold text-gray-800">Name</span>
                <span>{item.firstName} {item.lastName}</span>
              </div>

              <div className="flex flex-col">
                <span className="font-semibold text-gray-800">Item No.</span>
                <span>{item._id}</span>
              </div>

              <div className="flex flex-col">
                <span className="font-semibold text-gray-800">Email</span>
                <span>{item.email}</span>
              </div>

              <div className="flex flex-col">
                <span className="font-semibold text-gray-800">Phone</span>
                <span>{item.contactNumber}</span>
              </div>

              <div className="flex flex-col">
                <span className="font-semibold text-gray-800">Time</span>
                <span>{time}</span>
              </div>

              <div className="flex flex-col">
                <span className="font-semibold text-gray-800">Date</span>
                <span>{date}</span>
              </div>

              <div className="flex flex-col">
                <span className="font-semibold text-gray-800">Category</span>
                <span>{item.category}</span>
              </div>

              <div className="flex flex-col">
                <span className="font-semibold text-gray-800">Amount</span>
                <span>{item.moneyAmount ?? "-"}</span>
              </div>

              <div className="flex flex-col">
                <span className="font-semibold text-gray-800">Size</span>
                <span>{item.itemSize || "N/A"}</span>
              </div>

              <div className="flex flex-col">
                <span className="font-semibold text-gray-800">Color</span>
                <span>{item.itemColor || "N/A"}</span>
              </div>

              <div className="flex flex-col">
                <span className="font-semibold text-gray-800">Brand</span>
                <span>{item.brandType || "-"}</span>
              </div>

              <div className="flex flex-col">
                <span className="font-semibold text-gray-800">Unique ID</span>
                <span>{item.uniqueIdentifier || "-"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-3 mt-8 border-t pt-4">
          <button
            onClick={() => onEdit?.(item)}
            className="px-5 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete?.(item._id)}
            className="px-5 py-2 rounded-md bg-red-600 text-white font-medium hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableItemDetailsModal;
