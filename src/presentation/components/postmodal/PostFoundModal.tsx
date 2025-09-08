import React, { useState, useRef, ReactNode } from "react";
import { ChevronDown, Search, Camera, PlusCircle } from "lucide-react";

const categories: string[] = [
  "Select Category",
  "Umbrella",
  "Wallet",
  "Keys",
  "Phone",
];

const colors: string[] = [
  "Select Color",
  "Black",
  "Blue",
  "Red",
  "Green",
  "Yellow",
  "White",
  "Other",
];

const itemSizes: string[] = ["Select Item Size", "Small", "Medium", "Large"];

interface PostModalProps {
  open: boolean;
  onClose: () => void;
  children?: ReactNode; // Adding explicit type for children
}

const PostFoundModal = ({ open, onClose, children }: PostModalProps) => {
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedCategory, setSelectedCategory] = useState("Select Category");
  const [selectedColor, setSelectedColor] = useState("Select Color");
  const [selectedSize, setSelectedSize] = useState("Select Item Size");

  if (!open) {
    return null;
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTakePhoto = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 font-serif">
      <div className="bg-gray-200 rounded-xl shadow-2xl w-full max-w-4xl overflow-hidden">
        {/*Modal header*/}
        <div className="flex justify-between items-center p-1 border-b border-gray-300">
          <h2 className="flex justify-center items-center text-xl font-bold ml-5  ">
            Found Item
          </h2>
          <button
            onClick={onClose}
            className="mr-3 text-gray-700 hover:bg-gray-400 p-2 rounded-full text-4xl font-bold transition-colors"
          >
            &times;
          </button>
        </div>
        {/*Modal body*/}
        <div className="p-6 bg-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/*first column */}
            <div className="md:col-span-1 space-y-4">
              <h3 className="font-semibold text-lg mb-1">Item Picture</h3>
              <div className="relative w-full h-48 border border-gray-300 rounded-lg overflow-hidden flex items-center justify-center p-4 bg-white">
                {image ? (
                  <img
                    src={image}
                    alt="Item Photo"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center">
                    <button
                      onClick={handleTakePhoto}
                      className="bg-black text-white px-6 py-2 rounded-full shadow-md hover:bg-gray-800 transition-colors"
                    >
                      Take a photo
                    </button>
                  </div>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                ref={fileInputRef}
                style={{ display: "none" }}
              />
   <div className="relative">
                <label className="block text-gray-700 font-semibold mb-3">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full appearance-none px-5 pr-8 py-2 rounded-lg border border-gray-300 bg-gray-100 text-gray-700 text-center shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                >
                  {categories.map((category, index) => (
                    <option
                      key={category}
                      value={category}
                      disabled={index === 0}
                      hidden={
                        index === 0 && selectedCategory !== "Select Category"
                      }
                    >
                      {category}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-5 text-gray-700 pt-8">
                  <ChevronDown size={20} />
                </div>
              </div>

              <div className="relative">
                <label className="block text-gray-700 font-semibold mb-1">
                  Item Color
                </label>
                <select
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="w-full appearance-none px-5 pr-8 py-2 rounded-lg border border-gray-300 bg-gray-100 text-gray-700 text-center shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
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

              <div className="relative">
                <label className="block text-gray-700 font-semibold mb-1">
                  Item Size
                </label>
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="w-full appearance-none px-5 pr-8 py-2 rounded-lg border border-gray-300 bg-gray-100 text-gray-700 text-center shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                >
                  {itemSizes.map((itemSizes, index) => (
                    <option
                      key={itemSizes}
                      value={itemSizes}
                      disabled={index === 0}
                      hidden={index === 0 && selectedSize !== "Select Item Size"
                      }
                    >
                        {itemSizes}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-5 text-gray-700 pt-8">
                  <ChevronDown size={20} />
                </div>
              </div>
              {/*end of 1st column */}
            </div>

            {/*second column */}
            <div className="flex flex-col space-y-5">
              <div className="md:col-span-1 flex flex-col space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    First Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Name"
                    className="w-full p-2 border border-gray-300 rounded-lg bg-gray-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Enter Last name"
                  className="w-full p-2 border border-gray-300 rounded-lg bg-gray-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="text"
                  placeholder="Enter email"
                  className="w-full p-2 border border-gray-300 rounded-lg bg-gray-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Brand Name
                </label>
                <input
                  type="text"
                  placeholder="Enter Brand"
                  className="w-full p-2 border border-gray-300 rounded-lg bg-gray-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time
                </label>
                <input
                  type="text"
                  placeholder="5:06PM"
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

              {/*end of 2nd column */}
            </div>

            {/*third column */}
            <div className="flex flex-col space-y-5">
              <div className="md:col-span-1 flex flex-col space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Contact No.
                  </label>
                  <input
                    type="text"
                    placeholder="Enter phone number"
                    className="w-full p-2 border border-gray-300 rounded-lg bg-gray-200"
                  />
                </div>

                

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount Money
                  </label>
                  <input
                    type="text"
                    placeholder="Enter amount"
                    className="w-full p-2 border border-gray-300 rounded-lg bg-gray-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Unique Identifier
                  </label>
                  <input
                    type="text"
                    placeholder="N/A"
                    className="w-full p-2 border border-gray-300 rounded-lg bg-gray-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Remarks
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Remarks"
                    className="w-full p-2 border border-gray-300 rounded-lg bg-gray-200"
                  />
                </div>

                <div className="pt-5">
                  <button
  style={{ backgroundColor: '#01C629' }}
  className="text-white w-full p-12 mt-1 rounded-lg font-bold shadow-md transition-colors hover:opacity-90 text-4xl"
>
  POST
</button>
                </div>
              </div>
            </div>
            {/*end of third column */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostFoundModal;
