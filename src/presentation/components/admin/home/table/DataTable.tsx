"use client";

import React, { useState, useMemo } from "react";
import { ArrowUpDown, ArrowUp, ArrowDown, RefreshCw } from "lucide-react";
import { Item } from "../../../../../data/models/Item";
import TableItemDetailsModal from "./TableItemsDetailsModal";
import { getDisplayImageUrl } from "../../../../../utils/imageHelper";

interface DataTableProps {
  items: Item[];
  refreshTable: () => void;
}

const DataTable: React.FC<DataTableProps> = ({ items, refreshTable }) => {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Item | "date" | null;
    direction: "asc" | "desc";
  }>({ key: null, direction: "asc" });

  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const handleSort = (key: keyof Item | "date") => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const sortedItems = useMemo(() => {
    if (!sortConfig.key) return items;
    const key = sortConfig.key;
    return [...items].sort((a, b) => {
      const aValue = key === "date" ? new Date(a.createdAt).getTime() : a[key];
      const bValue = key === "date" ? new Date(b.createdAt).getTime() : b[key];
      if (aValue! < bValue!) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue! > bValue!) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [items, sortConfig]);

  const renderSortIcon = (key: keyof Item | "date") => {
    if (sortConfig.key !== key)
      return <ArrowUpDown size={14} className="inline ml-1 text-gray-400" />;
    return sortConfig.direction === "asc" ? (
      <ArrowUp size={14} className="inline ml-1 text-gray-400" />
    ) : (
      <ArrowDown size={14} className="inline ml-1 text-gray-400" />
    );
  };

  if (!items.length)
    return (
      <div className="text-center text-gray-400 mt-10">
        No items found.
        <div className="mt-3">
          <button
            onClick={refreshTable}
            className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium bg-gray-700 hover:bg-gray-600 text-white rounded-md transition"
          >
            <RefreshCw size={14} /> Refresh
          </button>
        </div>
      </div>
    );

  return (
    <div className="bg-[#0f172a] rounded-xl shadow-lg p-4 sm:p-6 w-full overflow-x-auto">
      {/* Refresh Button */}
      <div className="flex justify-end mb-3">
        <button
          onClick={refreshTable}
          className="flex items-center gap-2 px-3 py-1 text-xs font-medium bg-gray-700 hover:bg-gray-600 text-white rounded-md transition"
        >
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      {/* Table */}
      <div className="min-w-[1000px]">
        <div className="grid grid-cols-[2fr,repeat(11,1fr)] py-4 px-4 border-b border-gray-700 text-xs sm:text-sm font-semibold uppercase tracking-wider text-gray-200 select-none">
          <div />
          <div onClick={() => handleSort("_id")} className="cursor-pointer flex items-center">
            Item No. {renderSortIcon("_id")}
          </div>
          <div onClick={() => handleSort("createdAt")} className="cursor-pointer flex items-center">
            Time {renderSortIcon("createdAt")}
          </div>
          <div>Date</div>
          <div>Type</div>
          <div>Category</div>
          <div>Amount</div>
          <div>Size</div>
          <div>Color</div>
          <div>Brand</div>
          <div>Unique ID</div>
          <div>Status</div>
        </div>

        <div className="divide-y divide-gray-700">
          {sortedItems.map((item, index) => {
            const createdAt = new Date(item.createdAt);
            const time = createdAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
            const date = createdAt.toLocaleDateString();
            const rawStatus = item.status?.toLowerCase() || "pending";

            return (
              <div
                key={item._id}
                onClick={() => setSelectedItem(item)}
                className="grid grid-cols-[2fr,repeat(11,1fr)] py-4 px-4 hover:bg-gray-800 transition-colors text-gray-100 cursor-pointer text-xs sm:text-sm"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={getDisplayImageUrl(item.imageUrl)}
                    alt={item.category}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-medium">
                      {item.firstName} {item.lastName}
                    </div>
                    <div className="text-xs text-gray-400">{item.email}</div>
                    <div className="text-xs text-gray-400">{item.contactNumber}</div>
                  </div>
                </div>
                <div>{index + 1}</div>
                <div>{time}</div>
                <div>{date}</div>
                <div>{item.found ? "Found" : "Lost"}</div>
                <div>{item.category}</div>
                <div>{item.moneyAmount ?? "-"}</div>
                <div>{item.itemSize ?? "-"}</div>
                <div>{item.itemColor ?? "-"}</div>
                <div>{item.brandType ?? "-"}</div>
                <div>{item.uniqueIdentifier ?? "-"}</div>
                <div>
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      rawStatus === "pending"
                        ? "bg-yellow-400 text-yellow-900"
                        : rawStatus === "matched"
                        ? "bg-blue-400 text-blue-900"
                        : "bg-green-400 text-green-900"
                    }`}
                  >
                    {rawStatus.charAt(0).toUpperCase() + rawStatus.slice(1)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Details Modal */}
      {selectedItem && (
        <TableItemDetailsModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          refreshTable={refreshTable} // ✅ triggers after save
        />
      )}
    </div>
  );
};

export default DataTable;
