"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { Item } from "../../../../../data/models/Item";
import { getDisplayImageUrl } from "../../../../../utils/imageHelper";

interface EditModalProps {
  item: Item;
  onClose: () => void;
  onSave: (updatedItem: Item) => void;
}

const TableItemEditModal: React.FC<EditModalProps> = ({ item, onClose, onSave }) => {
  const [formData, setFormData] = useState<Item>({ ...item });
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setIsSaving(true);
    try {
      const response = await fetch(`/api/items/${item._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to update item");

      const updatedItem = await response.json();
      onSave(updatedItem);
      onClose();
    } catch (error) {
      console.error("❌ Error updating item:", error);
    } finally {
      setIsSaving(false);
    }
  };

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
          Edit Item Details
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

          {/* Right Side - Editable Fields */}
          <div className="flex flex-col justify-start w-full text-sm text-gray-700">
            <div className="grid grid-cols-2 gap-y-2 gap-x-6">
              {[
                { label: "First Name", key: "firstName" },
                { label: "Last Name", key: "lastName" },
                { label: "Email", key: "email" },
                { label: "Phone", key: "contactNumber" },
                { label: "Category", key: "category" },
                { label: "Amount", key: "moneyAmount" },
                { label: "Size", key: "itemSize" },
                { label: "Color", key: "itemColor" },
                { label: "Brand", key: "brandType" },
                { label: "Unique ID", key: "uniqueIdentifier" },
              ].map(({ label, key }) => (
                <div key={key} className="flex flex-col">
                  <span className="font-semibold text-gray-800">{label}</span>
                  <input
                    type="text"
                    name={key}
                    value={(formData as any)[key] ?? ""}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}

              <div className="flex flex-col">
                <span className="font-semibold text-gray-800">Item No.</span>
                <span className="text-gray-500 text-sm">{item._id}</span>
              </div>

              <div className="flex flex-col">
                <span className="font-semibold text-gray-800">Time</span>
                <span className="text-gray-500 text-sm">{time}</span>
              </div>

              <div className="flex flex-col">
                <span className="font-semibold text-gray-800">Date</span>
                <span className="text-gray-500 text-sm">{date}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-3 mt-8 border-t pt-4">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-md bg-gray-200 text-gray-800 font-medium hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSaving}
            className={`px-5 py-2 rounded-md font-medium text-white transition ${
              isSaving
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableItemEditModal;
