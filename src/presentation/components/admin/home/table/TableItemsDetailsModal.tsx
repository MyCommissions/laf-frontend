"use client";

import React, { useState } from "react";
import { X, Edit } from "lucide-react";
import { Item } from "../../../../../data/models/Item";
import TableItemEditModal from "./TableItemEditModal";
import { getDisplayImageUrl } from "../../../../../utils/imageHelper";

interface DetailsModalProps {
  item: Item;
  onClose: () => void;
  refreshTable: () => void;
}

const TableItemDetailsModal: React.FC<DetailsModalProps> = ({
  item,
  onClose,
  refreshTable,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const imagePreview = getDisplayImageUrl(item.imageUrl);
  const createdAt = new Date(item.createdAt);
  const time = createdAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const date = createdAt.toLocaleDateString();

  // ✅ After saving edits, refresh and close both modals
  const handleAfterSave = () => {
    refreshTable();
    setIsEditing(false);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 font-sans">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl p-6 relative animate-fadeIn">
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={24} />
          </button>

          <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-3">
            Item Details
          </h2>

          <div className="flex gap-8">
            {/* Image */}
            <div className="flex-shrink-0">
              <img
                src={
                  imagePreview
                    ? imagePreview
                    : "https://placehold.co/180x180/6366f1/ffffff?text=No+Image"
                }
                alt={item.category}
                className="w-48 h-48 rounded-lg object-cover border border-gray-300"
              />
            </div>

            {/* Details */}
            <div className="flex flex-col justify-start w-full text-sm text-gray-700">
              <div className="grid grid-cols-2 gap-y-2 gap-x-6">
                {[
                  { label: "First Name", value: item.firstName },
                  { label: "Last Name", value: item.lastName },
                  { label: "Email", value: item.email },
                  { label: "Phone", value: item.contactNumber },
                  { label: "Category", value: item.category },
                  { label: "Amount", value: item.moneyAmount },
                  { label: "Size", value: item.itemSize },
                  { label: "Color", value: item.itemColor },
                  { label: "Brand", value: item.brandType },
                  { label: "Unique ID", value: item.uniqueIdentifier },
                ].map(({ label, value }) => (
                  <div key={label} className="flex flex-col">
                    <span className="font-semibold text-gray-800">{label}</span>
                    <span className="text-gray-500 text-sm">{value ?? "-"}</span>
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

          {/* Footer */}
          <div className="flex justify-end gap-3 mt-8 border-t pt-4">
            <button
              onClick={() => {}}
              className="px-5 py-2 rounded-md bg-red-600 text-white font-medium hover:bg-red-700 transition"
            >
              Delete
            </button>
            <button
              onClick={() => setIsEditing(true)}
              className="px-5 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition flex items-center gap-2"
            >
              <Edit size={18} /> Edit
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Edit Modal */}
      {isEditing && (
        <TableItemEditModal
          item={item}
          onClose={() => setIsEditing(false)}
          onSave={handleAfterSave} // ✅ refresh + close both modals
          refreshTable={refreshTable}
        />
      )}
    </>
  );
};

export default TableItemDetailsModal;
