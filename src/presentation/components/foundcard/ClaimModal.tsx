"use client";

import React, { useState, useRef, useEffect } from "react";
import { Camera, X } from "lucide-react";

interface ClaimModalProps {
  onClose: () => void;
}

const ClaimModal: React.FC<ClaimModalProps> = ({ onClose }) => {
  const [image, setImage] = useState<string | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (isCameraOpen) {
      const openCamera = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
          });
          if (videoRef.current) videoRef.current.srcObject = stream;
        } catch (error) {
          console.error("Camera access denied:", error);
          setIsCameraOpen(false);
        }
      };
      openCamera();
    } else {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    }
  }, [isCameraOpen]);

  const capturePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (canvas && video) {
      const context = canvas.getContext("2d");
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataURL = canvas.toDataURL("image/png");
        setImage(dataURL);
        setIsCameraOpen(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 font-serif">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden relative">
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-gray-200 bg-gray-50">
          <h2 className="text-2xl font-bold text-gray-800">
            Claim Information Form
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-3xl font-bold transition-colors"
          >
            &times;
          </button>
        </div>

        {/* Camera Overlay */}
        {isCameraOpen && (
          <div className="absolute inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center z-50 p-4">
            <video
              ref={videoRef}
              autoPlay
              className="rounded-lg shadow-lg w-full max-w-md"
            />
            <canvas ref={canvasRef} width={640} height={480} className="hidden" />

            {/* Close (X) Button */}
            <button
              onClick={() => setIsCameraOpen(false)}
              className="absolute top-3 right-3 text-white hover:text-gray-300 transition-colors"
            >
              <X size={28} />
            </button>

            {/* ✅ Centered Capture Button */}
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2">
              <button
                onClick={capturePhoto}
                className="w-16 h-16 rounded-full bg-white border-4 border-gray-300 hover:scale-110 transition-transform"
              ></button>
            </div>
          </div>
        )}

        {/* Body */}
        <div className="p-6 bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Picture */}
            <div className="flex flex-col items-center p-2 bg-white rounded-lg shadow-md">
              <h3 className="font-semibold text-lg mb-1">Client Picture</h3>
              <div className="relative w-full h-48 border border-gray-300 rounded-lg overflow-hidden flex items-center justify-center">
                {image ? (
                  <img
                    src={image}
                    alt="Client Photo"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-400">
                    <p>No image captured</p>
                  </div>
                )}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={() => setIsCameraOpen(true)}
                    className="flex items-center bg-black text-white px-6 py-2 rounded-full shadow-md hover:bg-gray-800 transition"
                  >
                    <Camera size={18} className="mr-2" />
                    Take a photo
                  </button>
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="flex flex-col space-y-4 mt-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Number
                </label>
                <input
                  type="text"
                  placeholder="Write Something"
                  className="w-full p-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-green-400 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="Write Something"
                  className="w-full p-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-green-400 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Time
              </label>
              <input
                type="text"
                placeholder="5:06 PM"
                readOnly
                className="w-full p-2 border border-gray-300 rounded-lg bg-gray-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
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
