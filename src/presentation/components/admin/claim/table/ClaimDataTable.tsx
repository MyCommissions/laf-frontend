"use client";

import React, { useState, useMemo } from "react";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

interface Item {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  category: string;
  moneyAmount?: number;
  itemSize?: string;
  itemColor?: string;
  brandType?: string;
  uniqueIdentifier?: string;
  found?: boolean;
  imageUrl?: string;
  createdAt: string;
  status?: string;
}

// ✅ Dummy Data
const dummyItems: Item[] = [
  {
    _id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    contactNumber: "09123456789",
    category: "Wallet",
    moneyAmount: 500,
    itemSize: "Medium",
    itemColor: "Brown",
    brandType: "Levis",
    uniqueIdentifier: "A12345",
    found: true,
    imageUrl: "https://placehold.co/40x40/10B981/ffffff?text=JD",
    createdAt: new Date().toISOString(),
    status: "claimed",
  },
  {
    _id: "2",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane@example.com",
    contactNumber: "09876543210",
    category: "Umbrella",
    itemSize: "Large",
    itemColor: "Black",
    brandType: "Samsonite",
    uniqueIdentifier: "B67890",
    found: false,
    imageUrl: "https://placehold.co/40x40/10B981/ffffff?text=JS",
    createdAt: new Date().toISOString(),
    status: "claimed",
  },
  {
    _id: "3",
    firstName: "Carlos",
    lastName: "Reyes",
    email: "carlos@example.com",
    contactNumber: "09234567891",
    category: "Phone",
    brandType: "Samsung",
    uniqueIdentifier: "C54321",
    found: true,
    imageUrl: "https://placehold.co/40x40/10B981/ffffff?text=CR",
    createdAt: new Date().toISOString(),
    status: "claimed",
  },
];

const ClaimDataTable: React.FC = () => {
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
    if (!sortConfig.key) return dummyItems;

    const key = sortConfig.key as keyof Item | "date";

    return [...dummyItems].sort((a, b) => {
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
  }, [sortConfig]);

  const renderSortIcon = (key: keyof Item | "date") => {
    if (sortConfig.key !== key)
      return <ArrowUpDown size={14} className="inline ml-1 text-gray-400" />;
    return sortConfig.direction === "asc" ? (
      <ArrowUp size={14} className="inline ml-1 text-gray-400" />
    ) : (
      <ArrowDown size={14} className="inline ml-1 text-gray-400" />
    );
  };

  return (
    <div className="bg-[#0f172a] rounded-xl shadow-lg p-4 sm:p-6 w-full overflow-x-auto">
      <div className="min-w-[1000px]">
        {/* Table Header */}
        <div className="grid grid-cols-[2fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr] py-4 px-4 border-b border-gray-700 text-xs sm:text-sm font-semibold uppercase tracking-wider text-gray-200 select-none">
          <div className="col-span-1" />
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
          <div className="ml-7">Status</div>
        </div>

        {/* Table Rows */}
        <div className="divide-y divide-gray-700">
          {sortedItems.map((item: Item, index: number) => {
            const createdAt = new Date(item.createdAt);
            const time = createdAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
            const date = createdAt.toLocaleDateString();

            return (
              <div
                key={item._id}
                className="grid grid-cols-[2fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr] py-4 px-4 items-center hover:bg-gray-800 transition-colors text-gray-100 cursor-pointer text-xs sm:text-sm"
              >
                <div className="flex items-center gap-3">
                  <img
                    className="h-10 w-10 rounded-full object-cover"
                    src={item.imageUrl}
                    alt={item.category}
                  />
                  <div>
                    <div className="font-medium text-gray-100">
                      {item.firstName} {item.lastName}
                    </div>
                    <div className="text-xs text-gray-400">{item.email}</div>
                    <div className="text-xs text-gray-400">{item.contactNumber}</div>
                  </div>
                </div>

                <div className="font-medium text-gray-100">{index + 1}</div>
                <div className="font-medium text-gray-100">{time}</div>
                <div className="text-gray-400">{date}</div>
                <div className="text-gray-300">{item.category}</div>
                <div className="text-gray-300">{item.moneyAmount ?? "-"}</div>
                <div className="text-gray-300">{item.itemSize || "-"}</div>
                <div className="text-gray-300">{item.itemColor || "-"}</div>
                <div className="text-gray-300">{item.brandType || "-"}</div>
                <div className="text-gray-300">{item.uniqueIdentifier || "-"}</div>

                {/* ✅ Claimed Status (Green) */}
                <div className="flex justify-center">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-500 text-green-900">
                    Claimed
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ClaimDataTable;
