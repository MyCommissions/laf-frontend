"use client";
import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Camera, X } from "lucide-react";
import { useCreateLostItem } from "../../../domain/hooks/useItems";
import { CATEGORIES } from "../../../data/models/Item";
import LostModal from "../thankyoumodal/LostModal";


const categories: string[] = ["Select Category", ...CATEGORIES, "Keys"];
const colors: string[] = ["Select Color", "Black", "Blue", "Red", "Green", "Yellow", "White", "Other"];
const itemSizes: string[] = ["Select Item Size", "Small", "Medium", "Large"];

interface PostModalProps {
  open: boolean;
  onClose: () => void;
}

const PostLostModal = ({ open, onClose }: PostModalProps) => {
  const [image, setImage] = useState<string | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [selectedCategory, setSelectedCategory] = useState<string>("Select Category");
  const [selectedColor, setSelectedColor] = useState<string>("Select Color");
  const [selectedSize, setSelectedSize] = useState<string>("Select Item Size");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [brandType, setBrandType] = useState("");
  const [moneyAmount, setMoneyAmount] = useState<string>("");
  const [remarks, setRemarks] = useState("");
  const [uniqueIdentifier, setUniqueIdentifier] = useState("");
  const [isLostModalOpen, setIsLostModalOpen] = useState(false);

  const { mutate: createLostItem, isPending } = useCreateLostItem();

  useEffect(() => {
    if (isCameraOpen) {
      const openCamera = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
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

  if (!open) return null;

  const resetForm = () => {
    setImage(null);
    setSelectedCategory("Select Category");
    setSelectedColor("Select Color");
    setSelectedSize("Select Item Size");
    setFirstName("");
    setLastName("");
    setContactNumber("");
    setEmail("");
    setBrandType("");
    setMoneyAmount("");
    setRemarks("");
    setUniqueIdentifier("");
  };

  const isDisabled = (field: string): boolean => {
    if (!image) return true;
    switch (selectedCategory) {
      case "Umbrella":
        if (["amount", "brand", "uid"].includes(field)) return true;
        break;
      case "Wallet":
        if (["uid"].includes(field)) return true;
        break;
      case "Phone":
        if (["color", "size", "amount"].includes(field)) return true;
        break;
      case "Keys":
      case "ID":
        if (["color", "size", "amount", "brand"].includes(field)) return true;
        break;
      case "Cash":
        if (["color", "size", "uid", "brand"].includes(field)) return true;
        break;
      case "Others":
        if (["color", "size", "amount", "uid", "brand"].includes(field)) return true;
        break;
    }
    return false;
  };

  const handleSubmit = async () => {
    if (!image) return;

    try {
      // Convert Base64 image to Blob for upload
      const response = await fetch(image);
      const blob = await response.blob();
      const file = new File([blob], "captured-image.png", { type: "image/png" });

      const formData = new FormData();
      formData.append("image", file);
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("contactNumber", contactNumber);
      formData.append("email", email);
      formData.append(
        "category",
        selectedCategory && selectedCategory !== "Select Category" ? selectedCategory : "Others"
      );
      if (selectedColor && selectedColor !== "Select Color") formData.append("itemColor", selectedColor);
      if (selectedSize && selectedSize !== "Select Item Size") formData.append("itemSize", selectedSize);
      if (brandType) formData.append("brandType", brandType);
      if (moneyAmount) formData.append("moneyAmount", moneyAmount);
      if (remarks) formData.append("remarks", remarks);
      if (uniqueIdentifier) formData.append("uniqueIdentifier", uniqueIdentifier);
      formData.append("found", "true");
      formData.append("claimed", "false");
      formData.append("placeFound", "Campus");

      createLostItem(formData, {
        onSuccess: () => {
          resetForm();
          setIsLostModalOpen(true);
          setTimeout(() => {
            setIsLostModalOpen(false);
            onClose();
          }, 1500);
        },
      });
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 font-serif">
      <div className="bg-gray-200 rounded-xl shadow-2xl w-full max-w-4xl overflow-hidden relative">
        {/* Camera Overlay */}
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
        <div className="flex justify-between items-center p-1 border-b border-gray-300">
          <h2 className="flex justify-center items-center text-xl font-bold ml-5">Lost Item</h2>
          <button
            onClick={onClose}
            className="mr-3 text-gray-700 hover:bg-gray-400 p-2 rounded-full text-4xl font-bold transition-colors"
          >
            &times;
          </button>
        </div>

        {/* Body */}
        <div className="p-6 bg-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Picture Section */}
            <div className="md:col-span-1 space-y-4">
              <h3 className="font-semibold text-lg mb-1">Item Picture</h3>
              <div className="relative w-full h-48 border border-gray-300 rounded-lg overflow-hidden flex items-center justify-center p-4 bg-white">
                {image ? (
                  <img src={image} alt="Captured" className="w-full h-full object-contain" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center">
                    <button
                      onClick={() => setIsCameraOpen(true)}
                      className="bg-black text-white px-6 py-2 rounded-full shadow-md hover:bg-gray-800 transition-colors flex items-center"
                    >
                      <Camera size={18} className="mr-2" /> Take a photo
                    </button>
                  </div>
                )}
              </div>

              {/* Category */}
              <div className="relative">
                <label className="block text-gray-700 font-semibold mb-3">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  disabled={isDisabled("category")}
                  className="w-full appearance-none px-5 pr-8 py-2 rounded-lg border border-gray-300 bg-gray-100 text-gray-700 text-center shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {categories.map((category, index) => (
                    <option
                      key={category}
                      value={category}
                      disabled={index === 0}
                      hidden={index === 0 && selectedCategory !== "Select Category"}
                    >
                      {category}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-5 text-gray-700 pt-8">
                  <ChevronDown size={20} />
                </div>
              </div>

              {/* Color */}
              <div className="relative">
                <label className="block text-gray-700 font-semibold mb-1">Item Color</label>
                <select
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  disabled={isDisabled("color")}
                  className="w-full appearance-none px-5 pr-8 py-2 rounded-lg border border-gray-300 bg-gray-100 text-gray-700 text-center shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {colors.map((color, index) => (
                    <option
                      key={color}
                      value={color}
                      disabled={index === 0}
                      hidden={index === 0 && selectedColor !== "Select Color"}
                    >
                      {color}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-5 text-gray-700 pt-8">
                  <ChevronDown size={20} />
                </div>
              </div>

              {/* Size */}
              <div className="relative">
                <label className="block text-gray-700 font-semibold mb-1">Item Size</label>
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  disabled={isDisabled("size")}
                  className="w-full appearance-none px-5 pr-8 py-2 rounded-lg border border-gray-300 bg-gray-100 text-gray-700 text-center shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {itemSizes.map((itemSize, index) => (
                    <option
                      key={itemSize}
                      value={itemSize}
                      disabled={index === 0}
                      hidden={index === 0 && selectedSize !== "Select Item Size"}
                    >
                      {itemSize}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-5 text-gray-700 pt-8">
                  <ChevronDown size={20} />
                </div>
              </div>
            </div>

            {/* Other Form Fields */}
            <div className="flex flex-col space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">First Name</label>
                <input
                  type="text"
                  placeholder="Enter Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  disabled={isDisabled("fname")}
                  className="w-full p-2 border border-gray-300 rounded-lg bg-gray-200 disabled:bg-gray-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  type="text"
                  placeholder="Enter Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  disabled={isDisabled("lname")}
                  className="w-full p-2 border border-gray-300 rounded-lg bg-gray-200 disabled:bg-gray-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="text"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isDisabled("email")}
                  className="w-full p-2 border border-gray-300 rounded-lg bg-gray-200 disabled:bg-gray-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Brand Name</label>
                <input
                  type="text"
                  placeholder="Enter Brand"
                  value={brandType}
                  onChange={(e) => setBrandType(e.target.value)}
                  disabled={isDisabled("brand")}
                  className="w-full p-2 border border-gray-300 rounded-lg bg-gray-200 disabled:bg-gray-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                <input
                  type="text"
                  placeholder="5:06PM"
                  disabled
                  className="w-full p-2 border border-gray-300 rounded-lg bg-gray-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="text"
                  placeholder="08/16/2025"
                  disabled
                  className="w-full p-2 border border-gray-300 rounded-lg bg-gray-200"
                />
              </div>
            </div>

            {/* Contact & Others */}
            <div className="flex flex-col space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Contact No.</label>
                <input
                  type="text"
                  placeholder="Enter phone number"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  disabled={isDisabled("contact")}
                  className="w-full p-2 border border-gray-300 rounded-lg bg-gray-200 disabled:bg-gray-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Amount Money</label>
                <input
                  type="text"
                  placeholder="Enter amount"
                  value={moneyAmount}
                  onChange={(e) => setMoneyAmount(e.target.value)}
                  disabled={isDisabled("amount")}
                  className="w-full p-2 border border-gray-300 rounded-lg bg-gray-200 disabled:bg-gray-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Unique Identifier</label>
                <input
                  type="text"
                  placeholder="N/A"
                  value={uniqueIdentifier}
                  onChange={(e) => setUniqueIdentifier(e.target.value)}
                  disabled={isDisabled("uid")}
                  className="w-full p-2 border border-gray-300 rounded-lg bg-gray-200 disabled:bg-gray-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Remarks</label>
                <input
                  type="text"
                  placeholder="Enter Remarks"
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  disabled={isDisabled("remarks")}
                  className="w-full p-2 border border-gray-300 rounded-lg bg-gray-200 disabled:bg-gray-300"
                />
              </div>

              <div className="pt-5">
                <button
                  onClick={handleSubmit}
                  style={{ backgroundColor: "#FF4444" }}
                  disabled={!image || isPending}
                  className="text-white w-full p-12 mt-1 rounded-lg font-bold shadow-md transition-colors hover:opacity-90 text-4xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isPending ? "Posting..." : "REPORT"}
                </button>
                <LostModal open={isLostModalOpen} onClose={() => setIsLostModalOpen(false)} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostLostModal;
