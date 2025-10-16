import React from "react";

// Card component with styling to match the image
// It accepts title, description, and an icon prop
// The props are now typed to fix the TypeScript error
const Card = ({ title, description, icon }: { title: string; description: string; icon: React.ReactNode }) => {
  return (
    <div className="relative w-72 h-48 bg-white p-8 rounded-2xl shadow-xl flex flex-col items-center justify-center text-center">
      {/* Absolute positioned circle for the icon */}
      <div className="absolute top-0 -translate-y-1/2 bg-black w-16 h-16 rounded-full flex items-center justify-center text-white">
        {icon}
      </div>
      <h2 className="mt-4 text-2xl font-bold text-black">{title}</h2>
      <p className="mt-2 text-sm text-gray-500">{description}</p>
    </div>
  );
};


export default Card;
