"use client";

import React, { useState, useEffect, useRef } from "react";
import { Camera, X } from "lucide-react";
import { useClaimMatchedItem } from "../../../domain/hooks/useMatchedItems";
import { ToastMessage } from "../ui/ToastMessage";
import { PinModal } from "./PinModal";

interface ClaimItemModalProps {
  open: boolean;
  onClose: () => void;
  matchedItemId: string;
}

const ClaimItemModal = ({ open, onClose, matchedItemId }: ClaimItemModalProps) => {
  const [image, setImage] = useState<string | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState<"success" | "error" | "warning">("success");
  const [toastMessage, setToastMessage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [showPinModal, setShowPinModal] = useState(false);
  const [pendingFormData, setPendingFormData] = useState<FormData | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { mutate: claimMatchedItem, isPending } = useClaimMatchedItem();

  // 🎥 Camera handling
  useEffect(() => {
    if (isCameraOpen) {
      const startCamera = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          if (videoRef.current) videoRef.current.srcObject = stream;
        } catch (err) {
          console.error("Camera access denied:", err);
          setIsCameraOpen(false);
        }
      };
      startCamera();
    } else if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
    }
  }, [isCameraOpen]);

  const capturePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (canvas && video) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataURL = canvas.toDataURL("image/png");
        setImage(dataURL);
        setIsCameraOpen(false);
      }
    }
  };

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setContactNumber("");
    setImage(null);
    setPendingFormData(null);
  };

  const handleSubmit = async () => {
    if (!image || !firstName || !lastName || !contactNumber) {
      setToastType("warning");
      setToastMessage("Please fill all fields and capture a photo.");
      setShowToast(true);
      return;
    }

    try {
      // Convert base64 image to File
      const res = await fetch(image);
      const blob = await res.blob();
      const file = new File([blob], "claim-proof.png", { type: "image/png" });

      // 🟢 Prepare form data according to backend structure
      const formData = new FormData();
      formData.append("imageUuid", file);
      formData.append("claimInfo[firstName]", firstName);
      formData.append("claimInfo[lastName]", lastName);
      formData.append("claimInfo[contactNumber]", contactNumber);
      formData.append("claimInfo[timeOfClaim]", new Date().toISOString());

      // Save temporarily until PIN is entered
      setPendingFormData(formData);
      setShowPinModal(true);
    } catch (error) {
      console.error("Form preparation error:", error);
    }
  };

  const handleConfirmPin = async (pin: string) => {
    if (!pendingFormData) return;

    try {
      // Attach PIN field as per backend spec
      pendingFormData.append("pin[code]", pin);

      claimMatchedItem(
        { id: matchedItemId, payload: pendingFormData },
        {
          onSuccess: (res) => {
            setToastType("success");
            setToastMessage(res.message || "Item claimed successfully!");
            setShowToast(true);
            resetForm();
            setShowPinModal(false);
            setTimeout(() => onClose(), 1500);
          },
          onError: (error: any) => {
            console.error("Claim error:", error);
            setToastType("error");
            setToastMessage(error.message || "Failed to claim item.");
            setShowToast(true);
          },
        }
      );
    } catch (error) {
      console.error("PIN confirmation error:", error);
      setToastType("error");
      setToastMessage("Error preparing claim data.");
      setShowToast(true);
    }
  };

  if (!open) return null;

  return (
    <>
      {showToast && (
        <ToastMessage
          type={toastType}
          message={toastMessage}
          onClose={() => setShowToast(false)}
        />
      )}

      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 font-serif">
        <div className="bg-gray-100 rounded-xl shadow-2xl w-full max-w-3xl overflow-hidden relative">
          {/* Camera overlay */}
          {isCameraOpen && (
            <div className="absolute inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center z-50 p-4">
              <video ref={videoRef} autoPlay className="rounded-lg shadow-lg w-full max-w-md" />
              <canvas ref={canvasRef} width={640} height={480} className="hidden" />
              <button
                onClick={() => setIsCameraOpen(false)}
                className="absolute top-3 right-3 text-white hover:text-gray-300 transition-colors"
              >
                <X size={28} />
              </button>
              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2">
                <button
                  onClick={capturePhoto}
                  className="w-16 h-16 rounded-full bg-white border-4 border-gray-300 hover:scale-110 transition-transform"
                ></button>
              </div>
            </div>
          )}

          {/* Header */}
          <div className="flex justify-between items-center p-3 border-b border-gray-300">
            <h2 className="text-xl font-bold ml-4">Claim Item</h2>
            <button
              onClick={onClose}
              className="mr-3 text-gray-700 hover:bg-gray-300 p-2 rounded-full text-3xl font-bold transition-colors"
            >
              &times;
            </button>
          </div>

          {/* Body */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left: Image */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Proof Picture</h3>
              <div className="relative w-full h-48 border border-gray-300 rounded-lg overflow-hidden flex items-center justify-center bg-white">
                {image ? (
                  <img src={image} alt="Claim proof" className="w-full h-full object-contain" />
                ) : (
                  <button
                    onClick={() => setIsCameraOpen(true)}
                    className="bg-black text-white px-6 py-2 rounded-full shadow-md hover:bg-gray-800 flex items-center"
                  >
                    <Camera size={18} className="mr-2" /> Take Photo
                  </button>
                )}
              </div>
            </div>

            {/* Right: Form */}
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg bg-gray-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg bg-gray-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number</label>
                <input
                  type="text"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg bg-gray-200"
                />
              </div>

              <div className="pt-3">
                <button
                  onClick={handleSubmit}
                  disabled={!image || isPending}
                  className="w-full py-3 text-white font-bold rounded-lg shadow-md transition disabled:opacity-50"
                  style={{ backgroundColor: "#01C629" }}
                >
                  {isPending ? "Submitting..." : "CLAIM"}
                </button>
              </div>

              {/* PIN Modal */}
              <PinModal
                open={showPinModal}
                onClose={() => setShowPinModal(false)}
                onConfirm={handleConfirmPin}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClaimItemModal;
