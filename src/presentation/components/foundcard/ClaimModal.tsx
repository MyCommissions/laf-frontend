"use client";

import type React from "react";
import { useState, useRef } from "react";

interface ClaimModalProps {
  onClose: () => void;
}

const ClaimModal: React.FC<ClaimModalProps> = ({ onClose }) => {
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleTakePhoto = () => fileInputRef.current?.click();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 font-serif">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-gray-200 bg-gray-50">
          <h2 className="text-2xl font-bold text-gray-800">Claim Information Form</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-3xl font-bold transition-colors"
          >
            &times;
          </button>
        </div>

        {/* Body */}
        <div className="p-6 bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Picture */}
            <div className="flex flex-col items-center p-2 bg-white rounded-lg shadow-md">
              <h3 className="font-semibold text-lg mb-1">Client Picture</h3>
              <div className="relative w-full h-48 border border-gray-300 rounded-lg overflow-hidden flex items-center justify-center">
                {image ? (
                  <img src={image} alt="Client Photo" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-400">
                    <p>No image uploaded</p>
                  </div>
                )}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={handleTakePhoto}
                    className="bg-black text-white px-6 py-2 rounded-full shadow-md hover:bg-gray-800 transition-colors"
                  >
                    Take a photo
                  </button>
                </div>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                ref={fileInputRef}
                style={{ display: "none" }}
              />
            </div>

            {/* Info */}
            <div className="flex flex-col space-y-4 mt-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                <input
                  type="text"
                  placeholder="Write Something"
                  className="w-full p-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-green-400 outline-none"
                />
              </div>
              <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input
                type="text"
                placeholder="Write Something"
                className="w-full p-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-green-400 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input
                type="text"
                placeholder="Write Something"
                className="w-full p-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-green-400 outline-none"
              />
            </div>
            </div>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
              <input
                type="text"
                placeholder="5:06 PM"
                readOnly
                className="w-full p-2 border border-gray-300 rounded-lg bg-gray-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="text"
                placeholder="08/16/2025"
                readOnly
                className="w-full p-2 border border-gray-300 rounded-lg bg-gray-200"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <button className="bg-green-600 text-white px-6 py-2 rounded-full shadow-md hover:bg-green-700 transition-colors">
              SUBMIT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClaimModal;
