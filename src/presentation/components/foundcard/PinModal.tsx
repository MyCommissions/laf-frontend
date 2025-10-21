import { useState } from "react";

interface PinModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (pin: string) => void;
}

export const PinModal = ({ open, onClose, onConfirm }: PinModalProps) => {
  const [pin, setPin] = useState("");

  if (!open) return null;

  const handleConfirm = () => {
    if (pin.trim().length !== 6) return;
    onConfirm(pin);
    setPin("");
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-50 font-serif">
      <div className="bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-sm text-center">
        <h2 className="text-xl font-bold mb-4">Enter 6-digit PIN</h2>

        <input
          type="password"
          value={pin}
          maxLength={6}
          onChange={(e) => setPin(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg text-center tracking-widest text-lg"
          placeholder="••••••"
        />

        <div className="flex justify-between mt-6">
          <button
            onClick={() => {
              setPin("");
              onClose();
            }}
            className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={pin.trim().length !== 6}
            className="px-4 py-2 rounded-lg bg-green-600 text-white font-semibold disabled:opacity-50"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};
