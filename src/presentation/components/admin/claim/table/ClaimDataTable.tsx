"use client";
import React, { useState, useMemo } from "react";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import type { Item } from "../../../../../data/models/Item";
import { getDisplayImageUrl } from "../../../../../utils/imageHelper";
import ClaimDetailsModal from "./ClaimDetailsModal"; // <-- IMPORT MODAL

interface ClaimDataTableProps {
  items: Item[];
}

const ClaimDataTable: React.FC<ClaimDataTableProps> = ({ items }) => {
  // 🔥 NEW — Modal State
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [sortConfig, setSortConfig] = useState<{
    key: keyof Item | "date" | null;
    direction: "asc" | "desc";
  }>({ key: null, direction: "asc" });

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

  const renderSortIcon = (key: keyof Item | "date") => {
    if (sortConfig.key !== key)
      return <ArrowUpDown size={14} className="inline ml-1 text-gray-400" />;
    return sortConfig.direction === "asc" ? (
      <ArrowUp size={14} className="inline ml-1 text-gray-400" />
    ) : (
      <ArrowDown size={14} className="inline ml-1 text-gray-400" />
    );
  };

  const getStatusDisplay = (status?: string) => {
    let bgClass = "";
    let label = "";
    if (status?.toLowerCase() === "claimed") {
      bgClass = "bg-green-500";
      label = "Claimed";
    } else if (status?.toLowerCase() === "unclaimed") {
      bgClass = "bg-yellow-500";
      label = "Unclaimed";
    } else {
      bgClass = "bg-gray-500";
      label = "Unknown";
    }
    return (
      <span
        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${bgClass} text-white`}
      >
        {label}
      </span>
    );
  };

  return (
    <>
      {/* TABLE */}
      <div className="bg-[#0f172a] rounded-xl shadow-lg p-4 sm:p-6 w-full overflow-x-auto">
        <div className="min-w-[1100px] md:min-w-[1250px] lg:min-w-[1400px]">
          {/* HEADER */}
          <div
            className="
              grid 
              grid-cols-[2fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr] 
              py-4 px-4 
              border-b border-gray-700 
              text-[10px] sm:text-xs md:text-sm 
              font-semibold uppercase tracking-wider text-gray-200
            "
          >
            <div className="col-span-1" />
            <div
              onClick={() => handleSort("_id")}
              className="cursor-pointer flex items-center"
            >
              Item No. {renderSortIcon("_id")}
            </div>
            <div
              onClick={() => handleSort("createdAt")}
              className="cursor-pointer flex items-center"
            >
              Time {renderSortIcon("createdAt")}
            </div>
            <div
              onClick={() => handleSort("date")}
              className="cursor-pointer flex items-center"
            >
              Date {renderSortIcon("date")}
            </div>

            <div>Type</div>
            <div>Category</div>
            <div>Amount</div>
            <div>Size</div>
            <div>Color</div>
            <div>Brand</div>
            <div>Unique ID</div>
            <div className="ml-7">Status</div>
          </div>

          {/* ROWS */}
          <div className="divide-y divide-gray-700">
            {sortedItems.map((item, index) => {
              const displayItem = item.foundItem || item.lostItem || item;

              const createdAt = new Date(item.createdAt);
              const time = createdAt.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              });
              const date = createdAt.toLocaleDateString();

              // IMAGE
              const imageUrl =
                getDisplayImageUrl(displayItem.claimInfo?.imageUuid) ||
                "https://placehold.co/40x40/0f172a/ffffff?text=?";

              const itemType =
                displayItem.type ||
                (item.foundItem ? "found" : item.lostItem ? "lost" : "unknown");

              return (
                <div
                  key={item._id}
                  onClick={() => {
                    setSelectedItem(item); // assign item
                    setModalOpen(true); // open modal
                  }}
                  className="
                    grid 
                    grid-cols-[2fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr] 
                    py-4 px-4 
                    items-center 
                    hover:bg-gray-800 transition-colors 
                    text-gray-100 
                    cursor-pointer 
                    text-[10px] sm:text-xs md:text-sm
                    active:scale-[0.99]
                  "
                >
                  {/* IMAGE + TEXT */}
                  <div className="flex items-center gap-3">
                    <img
                      className="h-10 w-10 rounded-full object-cover md:h-12 md:w-12"
                      src={imageUrl}
                      alt={displayItem.category}
                    />
                    <div className="space-y-0.5 md:space-y-1">
                      <div className="font-medium">
                        {displayItem.firstName} {displayItem.lastName}
                      </div>
                      <div className="text-gray-400 text-[9px] sm:text-xs">
                        {displayItem.email}
                      </div>
                      <div className="text-gray-400 text-[9px] sm:text-xs">
                        {displayItem.contactNumber}
                      </div>
                    </div>
                  </div>

                  <div className="font-medium">{index + 1}</div>
                  <div className="font-medium">{time}</div>
                  <div className="text-gray-400">{date}</div>

                  <div className="capitalize">{itemType}</div>
                  <div>{displayItem.category}</div>
                  <div>{displayItem.moneyAmount ?? "-"}</div>
                  <div>{displayItem.itemSize || "-"}</div>
                  <div>{displayItem.itemColor || "-"}</div>
                  <div>{displayItem.brandType || "-"}</div>
                  <div>{displayItem.uniqueIdentifier || "-"}</div>

                  <div className="flex justify-center">
                    {getStatusDisplay(item.status)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* MODAL — Pops up on row click */}
      <ClaimDetailsModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        item={selectedItem}
      />
    </>
  );
};

export default ClaimDataTable;
