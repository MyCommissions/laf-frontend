"use client";

import React, { useState } from "react";
import ItemDetailsModal from "./itemDetailsModal";
import ClaimModal from "./ClaimModal";
import { getDisplayImageUrl } from "../../../utils/imageHelper";


interface LostItemCardProps {
  itemName: string;
  id: string;
  time: string; // item.createdAt from DB
  description: string;
  imageSrc?: string; // raw key from DB
}

const formatDateTime = (isoString: string) => {
  const date = new Date(isoString);
  const optionsDate: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  const optionsTime: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  const formattedDate = date.toLocaleDateString("en-US", optionsDate);
  const formattedTime = date.toLocaleTimeString("en-US", optionsTime);
  return { formattedDate, formattedTime };
};

const FoundCard: React.FC<LostItemCardProps> = ({
  id,
  itemName,
  time,
  description,
  imageSrc,
}) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isClaimOpen, setIsClaimOpen] = useState(false);

  // Format time
  const { formattedDate, formattedTime } = formatDateTime(time);

  // ✅ Build final image URL (or placeholder)
  const finalImageSrc = getDisplayImageUrl(imageSrc);

  return (
    <div className="flex justify-center p-4">
      <div className="bg-white rounded-3xl shadow-lg border-2 border-gray-900 p-6 w-80 font-serif flex flex-col h-[500px]">
        {/* Header */}
        <div className="flex justify-between items-center mb-4 text-gray-800">
          <span className="text-lg font-semibold">{itemName}</span>
          <span className="text-sm">{formattedDate}</span>
        </div>

        {/* Image */}
        <div className="flex justify-center mb-4">
          <div className="w-full max-w-xs h-48">
            <img src={finalImageSrc} alt={itemName} className="w-full h-full rounded-lg object-cover" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-grow">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-800">
              {formattedTime}
            </span>
            <span className="text-sm text-gray-500">ID: {id}</span>
          </div>
          <div className="mb-4">
            <p className="text-sm text-gray-700 line-clamp-2">{description}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mb-6">

          <button
            onClick={() => setIsDetailsOpen(true)}
            className="text-sm text-gray-500 hover:underline"
          >
            more information
          </button>
        </div>

        <div className="flex justify-center mt-auto">
          <button
            onClick={() => setIsClaimOpen(true)}
            className="w-full bg-black text-white py-3 rounded-full font-bold shadow-md hover:bg-gray-800 transition-colors"
          >
            Claim
          </button>
        </div>
      </div>

      {/* Item Details Modal */}
      <ItemDetailsModal
        item={{
          id,
          itemName,
          time: formattedTime,
          description,
          imageSrc: finalImageSrc,
        }}
        open={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
      />

      {/* Claim Modal */}
      {isClaimOpen && <ClaimModal onClose={() => setIsClaimOpen(false)} />}
    </div>
  );
};

export default FoundCard;
