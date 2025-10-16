import React, { useState, useRef, ReactNode } from "react";


interface LostModal {
  open: boolean;
  onClose: () => void;
  children?: ReactNode;
}


const LostModal= ({open, onClose, children}:LostModal) => {
  if (!open) {
    return null;
  }
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 font-serif">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-8 text-center">
        <div className="flex justify-end mb-4">
          <button
            onClick={onClose}
            className="text-gray-700 hover:bg-gray-200 p-2 rounded-full text-xl font-bold transition-colors"
          >
            &times;
          </button>
        </div>
        <h2 className="text-2xl font-bold mb-4">Report Submitted!</h2>
        <p className="text-gray-700 mb-8">
          Your lost item has been saved. We’ll email you if a match is found. Thank you!
        </p>
        <button
          onClick={onClose}
          className="w-full bg-black text-white py-3 rounded-full font-bold shadow-md hover:bg-gray-800 transition-colors"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default LostModal;