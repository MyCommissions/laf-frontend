import React, { useState } from "react";
import ItemDetailsModal from "./itemDetailsModal";
import ClaimModal from "./ClaimModal";
import { getDisplayImageUrl } from "../../../utils/imageHelper";

interface LostItemCardProps {
  itemName: string;
  id: string;
  time: string;
  description: string;
  imageSrc?: string;
}

const getCurrentDateTime = () => {
  const now = new Date();
  const optionsDate: Intl.DateTimeFormatOptions = { month: "long", day: "numeric", year: "numeric" };
  const optionsTime: Intl.DateTimeFormatOptions = { hour: "2-digit", minute: "2-digit", hour12: true };
  return { date: now.toLocaleDateString("en-US", optionsDate), time: now.toLocaleTimeString("en-US", optionsTime) };
};

const FoundCard: React.FC<LostItemCardProps> = ({ id, itemName, time, description, imageSrc }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClaimOpen, setIsClaimOpen] = useState(false);
  const { date: liveDate } = getCurrentDateTime();
  const finalImageSrc = getDisplayImageUrl(imageSrc);

  return (
    <div className="flex justify-center p-4">
      <div className="bg-white rounded-3xl shadow-lg border-2 border-gray-900 p-6 w-80 font-serif flex flex-col h-[500px]">
        {/* Header */}
        <div className="flex justify-between items-center mb-4 text-gray-800">
          <span className="text-lg font-semibold">{itemName}</span>
          <span className="text-sm">{liveDate}</span>
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
            <span className="text-sm font-semibold text-gray-800">{time}</span>
            <span className="text-sm text-gray-500">ID: {id}</span>
          </div>
          <div className="mb-4">
            <p className="text-sm text-gray-700 line-clamp-2">{description}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mb-6">
          <button onClick={() => setIsModalOpen(true)} className="text-sm text-gray-500 hover:underline">
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

      {/* Modals */}
      {isModalOpen && (
        <ItemDetailsModal
          item={{ id, itemName, time, description, imageSrc: finalImageSrc }}
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      {isClaimOpen && <ClaimModal onClose={() => setIsClaimOpen(false)} />}
    </div>
  );
};

export default FoundCard;
