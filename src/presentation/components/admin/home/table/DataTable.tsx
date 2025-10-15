"use client";

import React, { useState, useMemo } from "react";
import { Pencil, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { Item } from "../../../../../data/models/Item";

interface DataTableProps {
  items: Item[];
}

const DataTable: React.FC<DataTableProps> = ({ items }) => {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Item | "date" | null;
    direction: "asc" | "desc";
  }>({ key: null, direction: "asc" });

  const gridStyle: React.CSSProperties = {
    gridTemplateColumns: "repeat(14, minmax(0, 1fr))",
  };

  // Handle sorting when column header is clicked
  const handleSort = (key: keyof Item | "date") => {
    setSortConfig((prev) => ({
      key,
      direction:
        prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const sortedItems = useMemo(() => {
    if (!sortConfig.key) return items;

    const key = sortConfig.key as keyof Item | "date";

    return [...items].sort((a, b) => {
      let aValue: any = "";
      let bValue: any = "";

      if (key === "date") {
        aValue = new Date(a.createdAt).getTime();
        bValue = new Date(b.createdAt).getTime();
      } else {
        aValue = a[key] ?? "";
        bValue = b[key] ?? "";
      }

      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [items, sortConfig]);

  if (!items || items.length === 0) {
    return (
      <div className="text-center text-gray-400 mt-10">No items found.</div>
    );
  }

  // Helper to display sorting icon
  const renderSortIcon = (key: keyof Item | "date") => {
    if (sortConfig.key !== key)
      return <ArrowUpDown size={14} className="inline ml-1 text-gray-400" />;
    return sortConfig.direction === "asc" ? (
      <ArrowUp size={14} className="inline ml-1 text-gray-400" />
    ) : (
      <ArrowDown size={14} className="inline ml-1 text-gray-400" />
    );
  };

  // ✅ Handle cell click
  const handleRowClick = (item: Item) => setSelectedItem(item);
 
  

  return (
    <div className="bg-[#0f172a] rounded-xl shadow-lg p-6 w-full max-w-20xl mx-auto">
      {/* Table Header */}
      <div
        className="grid py-4 px-6 border-b border-gray-700 text-sm font-semibold uppercase tracking-wider text-gray-200 select-none"
        style={gridStyle}
      >
        <div className="col-span-2" />
        <div onClick={() => handleSort("_id")} className="cursor-pointer flex items-center">
          Item No. {renderSortIcon("_id")}
        </div>
        <div onClick={() => handleSort("createdAt")} className="cursor-pointer flex items-center">
          Time {renderSortIcon("createdAt")}
        </div>
        <div onClick={() => handleSort("date")} className="cursor-pointer flex items-center">
          Date {renderSortIcon("date")}
        </div>
        <div onClick={() => handleSort("category")} className="cursor-pointer flex items-center">
          Category {renderSortIcon("category")}
        </div>
        <div>Amount</div>
        <div>Size</div>
        <div>Color</div>
        <div>Brand</div>
        <div>Unique ID</div>
        <div onClick={() => handleSort("found")} className="cursor-pointer flex items-center">
          Type {renderSortIcon("found")}
        </div>
        <div>Edit</div>
        {/* ⛔ Status excluded from filtering */}
        <div>Status</div>
      </div>

      {/* Table Rows */}
      <div className="divide-y divide-gray-700">
        {sortedItems.map((item: Item, index: number) => {
          const createdAt = new Date(item.createdAt);
          const time = createdAt.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });
          const date = createdAt.toLocaleDateString();


          const rawStatus = item.status?.toLowerCase() || "pending";
          const statusLabel =
            rawStatus.charAt(0).toUpperCase() + rawStatus.slice(1);
          const type = item.found ? "Found" : "Lost";

          return (
            <div
              key={item._id}
              className="grid py-4 px-6 items-center hover:bg-gray-800 transition-colors text-gray-100"
              style={gridStyle}
            >
              <div className="col-span-2 flex items-center gap-3">
                <img
                  className="h-10 w-10 rounded-full object-cover"
                  src={
                    item.imageUrl
                      ? `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/${item.imageUrl}`
                      : "https://placehold.co/40x40/6366f1/ffffff?text=NA"
                  }
                  alt={item.category}
                />
                <div>
                  <div className="text-sm font-medium text-gray-100">
                    {item.firstName} {item.lastName}
                  </div>
                  <div className="text-xs text-gray-400">{item.email}</div>
                  <div className="text-xs text-gray-400">
                    {item.contactNumber}
                  </div>
                </div>
              </div>

              <div className="text-sm font-medium text-gray-100">
                {index + 1}
              </div>
              <div className="text-sm font-medium text-gray-100">{time}</div>
              <div className="text-xs text-gray-400">{date}</div>
              <div className="text-xs text-gray-300">{item.category}</div>
              <div className="text-xs text-gray-300">
                {item.moneyAmount ?? "-"}
              </div>
              <div className="text-xs text-gray-300">{item.itemSize || "-"}</div>
              <div className="text-xs text-gray-300">{item.itemColor || "-"}</div>
              <div className="text-xs text-gray-300">{item.brandType || "-"}</div>
              <div className="text-xs text-gray-300">
                {item.uniqueIdentifier || "-"}
              </div>

              <div className="text-xs text-gray-300">{type}</div>

              <div className="ml-5 text-sm font-medium text-blue-400 cursor-pointer hover:underline">
                <Pencil size={18} />
              </div>

              {/* Status last column */}
              <div className="flex justify-center">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    rawStatus === "pending"
                      ? "bg-yellow-400 text-yellow-900"
                      : rawStatus === "matched"
                      ? "bg-blue-400 text-blue-900"
                      : "bg-green-400 text-green-900"
                  }`}
                >
                  {statusLabel}
                </span>
              </div>
            </div>

         
          );
        })}
      </div>
        {/* Item Details Modal */}
            {selectedItem && ( <TableItemDetailsModal
              item= {selectedItem}
              onClose={() => setSelectedItem(null)}
              onEdit={(item) => console.log("Edit:", item)}
              onDelete={(id) => console.log("Delete:", id)}
              /> 
            )}
    </div>
  );
};

export default DataTable;
