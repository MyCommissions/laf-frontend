import React, { useState, useRef } from 'react';

// Define the props for the FoundCard component
interface LostItemCardProps {
  itemName: string;
  id: string;
  time: string;
  description: string;
  imageSrc?: string;
  onClaimClick: () => void; // A function to be called when the claim button is clicked
}

// A helper function to get the current date and time
const getCurrentDateTime = () => {
  const now = new Date();
  const optionsDate: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric' };
  const optionsTime: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', hour12: true };
  const dateString = now.toLocaleDateString('en-US', optionsDate);
  const timeString = now.toLocaleTimeString('en-US', optionsTime);
  return { date: dateString, time: timeString };
};

// The FoundCard component
const FoundCard: React.FC<LostItemCardProps> = ({ itemName, id, time, description, imageSrc, onClaimClick }) => {
  const [imgSrc, setImgSrc] = React.useState(imageSrc);
  const { date: liveDate } = getCurrentDateTime();
  const finalImageSrc = imgSrc || 'https://placehold.co/300x200/E5E7EB/4B5563?text=No+Image';

  return (
    <div className="flex justify-center p-4">
      <div className="bg-white rounded-3xl shadow-lg border-2 border-gray-900 p-6 w-80 font-serif">
        <div className="flex justify-between items-center mb-4 text-gray-800">
          <span className="text-lg font-semibold">{itemName}</span>
          <span className="text-sm">{liveDate}</span>
        </div>
        <div className="flex justify-center mb-4">
          <img
            src={finalImageSrc}
            alt={itemName}
            className="rounded-lg w-full max-w-xs object-cover"
            onError={() => setImgSrc('https://placehold.co/300x200/E5E7EB/4B5563?text=Image+Not+Found')}
          />
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-gray-800">{time}</span>
          <span className="text-sm text-gray-500">ID: {id}</span> 
        </div>
        <div className="mb-4">
          <p className="text-sm text-gray-700">{description}</p>
        </div>
        <div className="text-center mb-6">
          <a href="#" className="text-sm text-gray-500 hover:underline">
            more information
          </a>
        </div>
        <div className="flex justify-center">
          <button
            onClick={onClaimClick} // Use the prop to handle the click
            className="w-full bg-black text-white py-3 rounded-full font-bold shadow-md hover:bg-gray-800 transition-colors"
          >
            Claim
          </button>
        </div>
      </div>
    </div>
  );
};

// The ClaimModal component
const ClaimModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      <div className="bg-gray-200 rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-300">
          <h2 className="text-xl font-bold">Claim Information Form</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-800 transition-colors"
          >
            &times;
          </button>
        </div>
        {/* Modal Body */}
        <div className="p-6 bg-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md md:col-span-1">
              <h3 className="font-semibold text-lg mb-4">Client Picture</h3>
              <div className="relative w-full h-48 border border-gray-300 rounded-lg overflow-hidden flex items-center justify-center">
                {image ? (
                  <img src={image} alt="Client Photo" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-400 text-center">
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
                style={{ display: 'none' }}
              />
            </div>
            <div className="flex flex-col space-y-4 md:col-span-1">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Item #</label>
                <input type="text" placeholder="01" readOnly className="w-full p-2 border border-gray-300 rounded-lg bg-gray-200" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                <input type="text" placeholder="Write Something" className="w-full p-2 border border-gray-300 rounded-lg bg-gray-200" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input type="text" placeholder="Write Something" className="w-full p-2 border border-gray-300 rounded-lg bg-gray-200" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input type="text" placeholder="Write Something" className="w-full p-2 border border-gray-300 rounded-lg bg-gray-200" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
              <input type="text" placeholder="5:06PM" readOnly className="w-full p-2 border border-gray-300 rounded-lg bg-gray-200" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input type="text" placeholder="08/16/2025" readOnly className="w-full p-2 border border-gray-300 rounded-lg bg-gray-200" />
            </div>
          </div>
          <div className="flex justify-end">
            <button className="bg-gray-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-gray-600 transition-colors">
              Guard PIN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App component to render both the card and the modal
const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open the modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {/* FoundCard component, now with a click handler passed as a prop */}
      <FoundCard
        itemName="Wallet"
        id="001"
        time="2:30 PM"
        description="Nakita dapit sa cafet nga agianan"
        onClaimClick={handleOpenModal}
      />

      {/* Conditionally render the modal */}
      {isModalOpen && (
        <ClaimModal onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default App;
