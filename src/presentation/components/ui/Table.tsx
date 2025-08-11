import React, { useState } from "react";
import {
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
} from "lucide-react";

export type SortDirection = "asc" | "desc";

export type Column<T> = {
  key: keyof T;
  label: string;
  sortable?: boolean;
};

interface SortableTableProps<T> {
  data: T[];
  columns: Column<T>[];
  filterKey?: keyof T;
  enableFilter?: boolean;
  customSort?: (a: T, b: T, key: keyof T, direction: SortDirection) => number;
}

export function SortableTable<T extends Record<string, any>>({
  data,
  columns,
  filterKey,
  enableFilter = true,
  customSort,
}: SortableTableProps<T>) {
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [filter, setFilter] = useState("");

  const requestSort = (key: keyof T) => {
    if (sortKey === key) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const getSortIcon = (key: keyof T) => {
    if (sortKey !== key) return <ChevronsUpDown size={14} />;
    return sortDirection === "asc" ? (
      <ChevronUp size={14} />
    ) : (
      <ChevronDown size={14} />
    );
  };

  const filteredData = enableFilter && filterKey
    ? data.filter((row) =>
        String(row[filterKey]).toLowerCase().includes(filter.toLowerCase())
      )
    : data;

  const sortedData = sortKey
    ? [...filteredData].sort((a, b) => {
        if (customSort) {
          return customSort(a, b, sortKey, sortDirection);
        }

        const aVal = a[sortKey];
        const bVal = b[sortKey];

        if (typeof aVal === "string" && typeof bVal === "string") {
          return sortDirection === "asc"
            ? aVal.localeCompare(bVal)
            : bVal.localeCompare(aVal);
        }

        if (typeof aVal === "number" && typeof bVal === "number") {
          return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
        }

        return 0;
      })
    : filteredData;

  return (
    <div className="flex flex-col h-full border rounded overflow-hidden">
      {enableFilter && filterKey && (
        <div className="p-2 border-b">
          <input
            type="text"
            placeholder={`Filter by ${String(filterKey)}...`}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          />
        </div>
      )}

        <table className="min-w-full text-sm border-collapse">
          <thead className="sticky top-0 z-10 bg-[#B4E197]">
            <tr>
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className={`text-left py-2 px-3 border-b ${
                    col.sortable ? "cursor-pointer select-none" : ""
                  }`}
                  onClick={() => col.sortable && requestSort(col.key)}
                >
                  <div className="flex items-center gap-1">
                    {col.label} {col.sortable && getSortIcon(col.key)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
        </table>
      <div className="overflow-auto">
        <table className="min-w-full text-sm border-collapse">
          <tbody>
            {sortedData.length > 0 ? (
              sortedData.map((row, index) => (
                <tr key={index} className="border-b">
                  {columns.map((col) => (
                    <td key={String(col.key)} className="py-2 px-3">
                      {String(row[col.key])}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center py-4 text-gray-500"
                >
                  No items found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
