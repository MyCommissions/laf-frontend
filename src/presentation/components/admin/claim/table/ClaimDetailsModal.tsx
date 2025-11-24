"use client";

import React from "react";
import { X } from "lucide-react";
import { Item } from "../../../../../data/models/Item";
import { getDisplayImageUrl } from "../../../../../utils/imageHelper";

interface ClaimDetailsModalProps {
  open: boolean;
  onClose: () => void;
  item: Item | null;
}

export default function ClaimDetailsModal({
  open,
  onClose,
  item,
}: ClaimDetailsModalProps) {
  if (!open || !item) return null;

  const displayItem = item.foundItem || item.lostItem || item;

  const createdAt = new Date(item.createdAt);
  const time = createdAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const date = createdAt.toLocaleDateString();

  const imageUrl =
    getDisplayImageUrl(displayItem.claimInfo?.imageUuid) ||
    "https://placehold.co/400x400/0f172a/ffffff?text=?";

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">

      {/* MODAL WRAPPER */}
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-5xl p-6 overflow-y-auto max-h-[90vh] 
                      transform animate-slideUp">
        
        {/* Close Button */}
        <div className="flex justify-end">
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X size={22} />
          </button>
        </div>

        {/* GRID CONTAINER */}
        <div className="
          grid 
          grid-cols-1 
          md:grid-cols-[1.3fr,1fr] 
          gap-8 
          px-2 
        ">

          {/* LEFT SIDE — Image + User Info */}
          <div className="flex flex-col items-start gap-5">

            {/* Bigger Image */}
            <img
              src={imageUrl}
              alt="item"
              className="h-96 w-full max-w-xs md:max-w-sm rounded-2xl object-cover shadow-md"
            />

            {/* User Info */}
            <div className="w-full">
              <h2 className="text-xl font-bold text-gray-900 text-center md:text-left">
                {displayItem.firstName} {displayItem.lastName}
              </h2>

              <div className="space-y-3 mt-4">
                <div>
                  <label className="text-sm text-gray-500">Email</label>
                  <input
                    readOnly
                    value={displayItem.email}
                    className="w-full mt-1 px-3 py-2 rounded-md bg-gray-100 text-gray-700 text-sm"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-500">Contact Number</label>
                  <input
                    readOnly
                    value={displayItem.contactNumber}
                    className="w-full mt-1 px-3 py-2 rounded-md bg-gray-100 text-gray-700 text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE — Item Details */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Item Details
            </h3>

            <div className="space-y-4">

              <DetailInput label="Item No." value={item._id} />
              <DetailInput label="Time" value={time} />
              <DetailInput label="Date" value={date} />

              <DetailInput label="Type" value={displayItem.type || "-"} />
              <DetailInput label="Category" value={displayItem.category || "-"} />
              <DetailInput label="Amount" value={displayItem.moneyAmount ?? "-"} />
              <DetailInput label="Size" value={displayItem.itemSize || "-"} />
              <DetailInput label="Color" value={displayItem.itemColor || "-"} />
              <DetailInput label="Brand" value={displayItem.brandType || "-"} />
              <DetailInput label="Unique ID" value={displayItem.uniqueIdentifier || "-"} />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

/* 
  Reusable passive input
*/
function DetailInput({ label, value }: { label: string; value: any }) {
  return (
    <div>
      <label className="text-sm text-gray-500">{label}</label>
      <input
        readOnly
        value={value}
        className="w-full mt-1 px-3 py-2 rounded-md bg-gray-100 text-gray-700 text-sm"
      />
    </div>
  );
}
