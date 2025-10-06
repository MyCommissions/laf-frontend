import React from "react";
import { Pencil } from "lucide-react";

// Define the User type (exported so you can reuse it elsewhere)
export interface User {
  id: number;
  name: string;
  email: string;
  contact: string;
  time: string;
  date: string;
  category: string;
  amount: string;
  size: string;
  color: string;
  brand: string;
  uid: string;
  status: "Pending" | "Matched" | "Claimed";
  imageUrl: string;
}

// Define component props
interface UserGridTableProps {
  users: User[]; // The list of users to display
  onEdit?: (user: User) => void; // Optional callback for edit icon
}

/**
 * UserGridTable Component
 * A reusable grid-style table for displaying user information.
 * Tailwind CSS is used for styling, preserving the original design.
 */
const UserGridTable: React.FC<UserGridTableProps> = ({ users, onEdit }) => {
  return (
    <div className="bg-[#0f172a] rounded-xl shadow-lg p-6 w-full max-w-20xl mx-auto">
      {/* Table Header */}
      <div className="grid grid-cols-12 py-4 px-6 border-b border-gray-700 text-sm font-semibold uppercase tracking-wider">
        <div className="col-span-2"></div>
        <div>Item No.</div>
        <div>Time</div>
        <div>Date</div>
        <div>Category</div>
        <div>Amount</div>
        <div>Size</div>
        <div>Color</div>
        <div>Brand</div>
        <div>Unique ID</div>
        <div>Status</div>
        <div></div>
      </div>

      {/* Table Rows */}
      <div className="divide-y divide-gray-700">
        {users.map((user) => (
          <div
            key={user.id}
            className="grid grid-cols-12 py-4 px-6 items-center hover:bg-gray-800 transition-colors"
          >
            <div className="col-span-2 flex items-center space-x-3">
              <img
                className="h-10 w-10 rounded-full object-cover"
                src={user.imageUrl}
                alt={user.name}
              />
              <div>
                <div className="text-sm font-medium text-white">{user.name}</div>
                <div className="text-xs text-gray-400">{user.email}</div>
                <div className="text-xs text-gray-400">{user.contact}</div>
              </div>
            </div>
            <div className="text-sm font-medium">{user.id}</div>
            <div className="text-sm font-medium">{user.time}</div>
            <div className="text-xs text-gray-400">{user.date}</div>
            <div className="text-xs text-gray-400">{user.category}</div>
            <div className="text-xs text-gray-400">{user.amount}</div>
            <div className="text-xs text-gray-400">{user.size}</div>
            <div className="text-xs text-gray-400">{user.color}</div>
            <div className="text-xs text-gray-400">{user.brand}</div>
            <div className="text-xs text-gray-400">{user.uid}</div>
            <div className="flex flex-row ml-7">
              <span
                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  user.status === "Pending"
                    ? "bg-yellow-400 text-yellow-900"
                    : user.status === "Matched"
                    ? "bg-blue-400 text-blue-900"
                    : "bg-green-400 text-green-900"
                }`}
              >
                {user.status}
              </span>
              <div
                className="ml-5 text-sm font-medium text-blue-400 cursor-pointer hover:underline"
                onClick={() => onEdit?.(user)}
              >
                <Pencil size={18} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserGridTable;
