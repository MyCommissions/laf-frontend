import React, { useEffect } from "react";
import { CheckCircle, XCircle, AlertTriangle, X } from "lucide-react";
import clsx from "clsx";

type ToastMessageProps = {
  type?: "success" | "error" | "warning";
  message: string;
  description?: string;
  onClose?: () => void;
  duration?: number; // in ms
};

const iconMap = {
  success: <CheckCircle className="text-green-500 w-6 h-6" />,
  error: <XCircle className="text-red-500 w-6 h-6" />,
  warning: <AlertTriangle className="text-yellow-500 w-6 h-6" />,
};

export const ToastMessage: React.FC<ToastMessageProps> = ({
  type = "success",
  message,
  description,
  onClose,
  duration = 4000, // auto-dismiss after 4s
}) => {
  useEffect(() => {
    if (!onClose) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className="fixed top-4 right-4 z-50 rounded-md bg-white shadow-lg p-4 w-full max-w-sm flex items-start space-x-3 border border-gray-200 animate-fadeIn">
      <div>{iconMap[type]}</div>
      <div className="flex-1">
        <p className="font-medium text-base text-gray-900">{message}</p>
        {description && <p className="text-sm text-gray-500">{description}</p>}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
