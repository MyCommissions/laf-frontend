import React from 'react';

// Define the props for the component
interface LostItemCardProps {
  itemName: string;
  id: string;
  time: string;
  description: string;
  imageSrc?: string; // Made the imageSrc prop optional
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

const FoundCard: React.FC<LostItemCardProps> = ({ itemName, id, time, description, imageSrc }) => {
  // Use a state for the image source to handle potential errors
  const [imgSrc, setImgSrc] = React.useState(imageSrc);
  const { date: liveDate } = getCurrentDateTime();

  const finalImageSrc = imgSrc || 'https://placehold.co/300x200/E5E7EB/4B5563?text=No+Image';

  return (
    <div className="flex justify-center p-4">
      {/* The main card container */}
      <div className="bg-white rounded-3xl shadow-lg p-6 w-80 font-serif">
        {/* Header section with item name and live date */}
        <div className="flex justify-between items-center mb-4 text-gray-800">
          <span className="text-lg font-semibold">{itemName}</span>
          <span className="text-sm">{liveDate}</span>
        </div>

        {/* Image section - centered with Tailwind flex classes */}
        <div className="flex justify-center mb-4">
          <img
            src={finalImageSrc}
            alt={itemName}
            className="rounded-lg w-full max-w-xs object-cover"
            onError={() => setImgSrc('https://placehold.co/300x200/E5E7EB/4B5563?text=Image+Not+Found')}
          />
        </div>

        {/* Time and details section */}
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-gray-800">{time}</span>
          <span className="text-sm text-gray-500">ID: {id}</span> 
        </div>

        {/* Description section */}
        <div className="mb-4">
          <p className="text-sm text-gray-700">{description}</p>
        </div>

        {/* More information link */}
        <div className="text-center mb-6">
          <a href="#" className="text-sm text-gray-500 hover:underline">
            more information
          </a>
        </div>

        {/* Claim button */}
        <div className="flex justify-center">
          <button className="w-full bg-black text-white py-3 rounded-full font-bold shadow-md hover:bg-gray-800 transition-colors">
            Claim
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoundCard;
