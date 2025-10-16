import React from "react";
import { X } from "lucide-react";
import { Item } from "../../../data/models/Item";

interface ItemDetailsModalProps {
  open: boolean;
  onClose: () => void;
  item: Partial<Item> & {
    id?: string;           // ✅ allow id
    itemName?: string;
    description?: string;
    imageSrc?: string;
    time?: string;
  } | null;
}

const ItemDetailsModal: React.FC<ItemDetailsModalProps> = ({ item, open, onClose }) => {
  if (!open || !item) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          <X size={24} />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          {item.itemName || item.category || "Item"} Details
        </h2>

        {/* Image */}
        {item.imageSrc || item.imageUrl ? (
          <img
            src={item.imageSrc || `https://<your-r2-bucket-url>/${item.imageUrl}`}
            alt={item.itemName || item.category}
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
        ) : (
          <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-lg mb-4">
            <p className="text-gray-500">No Image Available</p>
          </div>
        )}

        {/* Item Info */}
        <div className="space-y-2 text-gray-700">
          {item.id && <p><strong>ID:</strong> {item.id}</p>}
          {item.firstName && item.lastName && (
            <p><strong>Owner:</strong> {item.firstName} {item.lastName}</p>
          )}
          {item.contactNumber && item.email && (
            <p><strong>Contact:</strong> {item.contactNumber} / {item.email}</p>
          )}
          {item.category && <p><strong>Category:</strong> {item.category}</p>}
          {item.itemColor && <p><strong>Color:</strong> {item.itemColor}</p>}
          {item.itemSize && <p><strong>Size:</strong> {item.itemSize}</p>}
          {item.brandType && <p><strong>Brand:</strong> {item.brandType}</p>}
          {item.uniqueIdentifier && <p><strong>UID:</strong> {item.uniqueIdentifier}</p>}
          {item.moneyAmount !== undefined && <p><strong>Amount:</strong> ₱{item.moneyAmount}</p>}
          {item.remarks && <p><strong>Remarks:</strong> {item.remarks}</p>}
          {item.time && <p><strong>Time:</strong> {item.time}</p>}
          {item.found !== undefined && (
            <p>
              <strong>Status:</strong> {item.found ? "Found Item" : "Lost Report"}{" "}
              {item.claimed && "(Claimed)"}
            </p>
          )}
          {item.createdAt && <p><strong>Created At:</strong> {new Date(item.createdAt).toLocaleString()}</p>}
          {item.updatedAt && <p><strong>Updated At:</strong> {new Date(item.updatedAt).toLocaleString()}</p>}
        </div>
      </div>
    </div>
  );
};

export default ItemDetailsModal;
