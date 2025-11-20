import React from "react";
import { X } from "lucide-react";
import { Item } from "../../../data/models/Item";

interface ItemDetailsModalProps {
  open: boolean;
  onClose: () => void;
  item: Item;
}

const ItemDetailsModal: React.FC<ItemDetailsModalProps> = ({
  item,
  open,
  onClose,
}) => {
  if (!open || !item) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 sm:p-6">
      <div className="relative w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 sm:top-3 right-2 sm:right-3 text-gray-400 hover:text-gray-800 transition-colors duration-200 z-50"
        >
          <X size={24} />
        </button>

        {/* Modal content */}
        <div className="bg-white rounded-xl shadow-xl p-3 sm:p-8 overflow-auto max-h-[90vh] border border-gray-100">
          {/* Title */}
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-gray-900 text-center sm:text-left border-b pb-3 border-gray-200">
            {item.category || "Item"} Details
          </h2>

          {/* Image */}
          {item.imageUrl ? (
            <img
              src={`https://<your-r2-bucket-url>/${item.imageUrl}`}
              alt={item.category}
              className="w-full h-52 sm:h-64 md:h-72 object-cover rounded-lg mb-6 shadow-sm"
            />
          ) : (
            <div className="w-full h-52 sm:h-64 md:h-72 bg-gray-100 flex items-center justify-center rounded-lg mb-6 shadow-inner">
              <p className="text-gray-400 italic">No Image Available</p>
            </div>
          )}

          {/* Item Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
            {/* Helper function to render read-only input */}
            {[
              { label: "ID", value: item._id },
              { label: "Owner", value: item.firstName && item.lastName ? `${item.firstName} ${item.lastName}` : "" },
              { label: "Contact", value: item.contactNumber && item.email ? `${item.contactNumber} / ${item.email}` : "" },
              { label: "Category", value: item.category },
              { label: "Color", value: item.itemColor },
              { label: "Size", value: item.itemSize },
              { label: "Brand", value: item.brandType },
              { label: "UID", value: item.uniqueIdentifier },
              { label: "Amount", value: item.moneyAmount !== undefined ? `₱${item.moneyAmount}` : "" },
              { label: "Remarks", value: item.remarks },
              { label: "Status", value: item.found !== undefined ? `${item.found ? "Found Item" : "Lost Report"}${item.claimed ? " (Claimed)" : ""}` : "" },
              { label: "Created At", value: item.createdAt ? new Date(item.createdAt).toLocaleString() : "" },
              { label: "Updated At", value: item.updatedAt ? new Date(item.updatedAt).toLocaleString() : "" },
            ].map((field, index) =>
              field.value ? (
                <div key={index} className="flex flex-col">
                  <label className="text-gray-500 text-sm mb-1">{field.label}</label>
                  <input
                    type="text"
                    value={field.value}
                    readOnly
                    className="bg-gray-50 border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>
              ) : null
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailsModal;
