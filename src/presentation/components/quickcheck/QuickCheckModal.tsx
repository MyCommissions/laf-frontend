import React, { useState, useRef, ReactNode } from "react";


const QuickCheckModal: React.FC<{
  onClose: () => void;
  onSuccess: () => void;
}> = ({ onClose, onSuccess }) => {
  const [pin, setPin] = useState("");

  // Function to handle the final claim action
  const handleClaim = () => {
    // Here you would add the logic to verify the PIN
    // For now, it will just close the modal and show a success message
    onClose();
    onSuccess();
  };

  return (
    <div></div>
    // <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 font-serif">
    //   <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-8">
    //     <div className="flex justify-between items-center mb-6">
    //       <h2 className="text-2xl font-bold">Quick Check</h2>
    //       <button
    //         onClick={onClose}
    //         className="bg-gray-300 text-gray-700 hover:bg-gray-400 p-3 rounded-full text-xl font-bold transition-colors"
    //       >
    //         &times;
    //       </button>
    //     </div>
    //     <p className="text-center text-gray-700 mb-8">
    //       The guard will ask simple questions to confirm the item is yours.
    //       Please answer carefully. This step ensures proper claiming.
    //     </p>
    //     <div className="text-center mb-6">
    //       <h3 className="text-xl font-semibold mb-4">Guard PIN</h3>
    //       <input
    //         type="text"
    //         placeholder="Input PIN from Guard"
    //         value={pin}
    //         onChange={(e) => setPin(e.target.value)}
    //         className="w-full p-3 border border-gray-300 rounded-full text-center focus:outline-none focus:ring-2 focus:ring-black transition-all"
    //       />
    //     </div>
    //     <div className="flex justify-center">
    //       <button
    //         onClick={handleClaim}
    //         className="w-full bg-black text-white py-3 rounded-full font-bold shadow-md hover:bg-gray-800 transition-colors"
    //       >
    //         Claim
    //       </button>
    //     </div>
    //   </div>
    // </div>
  );
};