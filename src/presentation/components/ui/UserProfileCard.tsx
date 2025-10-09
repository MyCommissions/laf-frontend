import React, { useState, ChangeEvent } from "react";
import { Pencil, X } from "lucide-react";

// Define a generic role type (customizable by parent)
export type UserRole = string;

// Props for the reusable component
interface UserProfileCardProps {
  username: string;
  email: string;
  mobile: string;
  password: string;
  role: UserRole;
  profilePicture?: string;
  onSave?: (data: {
    username: string;
    email: string;
    mobile: string;
    password: string;
    role: UserRole;
    profilePicture: string;
  }) => void;
  onClose?: () => void;
  allowRoleSwitch?: boolean;
  availableRoles?: UserRole[];
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({
  username: initialUsername,
  email: initialEmail,
  mobile: initialMobile,
  password: initialPassword,
  role: initialRole,
  profilePicture: initialPicture = "https://placehold.co/100x100/3498db/FFFFFF?text=JD",
  onSave,
  onClose,
  allowRoleSwitch = true,
  availableRoles = ["user", "admin"],
}) => {
  const [username, setUsername] = useState(initialUsername);
  const [email, setEmail] = useState(initialEmail);
  const [mobile, setMobile] = useState(initialMobile);
  const [password, setPassword] = useState(initialPassword);
  const [role, setRole] = useState<UserRole>(initialRole);
  const [profilePicture, setProfilePicture] = useState(initialPicture);
  const [isEditing, setIsEditing] = useState(false);

  // Handle image upload
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Save updates
  const handleSave = () => {
    const updatedData = { username, email, mobile, password, role, profilePicture };
    onSave?.(updatedData);
    setIsEditing(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-lg p-6">
        {/* Role switcher */}
        {allowRoleSwitch && (
          <div className="flex justify-between mb-6 border-b-2 border-gray-200">
            {availableRoles.map((r) => (
              <div
                key={r}
                className={`cursor-pointer px-4 py-2 font-semibold transition-colors duration-200 ${
                  role === r
                    ? "text-blue-500 border-b-2 border-blue-500"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setRole(r)}
              >
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </div>
            ))}
          </div>
        )}

        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <div className="relative w-24 h-24">
            <img
              src={profilePicture}
              alt="Profile"
              className="w-full h-full rounded-full object-cover border-4 border-gray-300 shadow-md"
            />
            <label
              htmlFor="file-upload"
              className="absolute bottom-0 right-0 p-2 bg-white rounded-full cursor-pointer shadow-md border border-gray-300"
            >
              <Pencil size={16} />
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              {username}
              <span className="text-xs ml-2 px-2 py-1 font-normal bg-gray-200 text-gray-700 rounded-full capitalize">
                {role}
              </span>
            </h2>
            <p className="text-sm text-gray-500">{email}</p>
          </div>
          {onClose && (
            <div
              onClick={onClose}
              className="ml-auto text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <X size={24} />
            </div>
          )}
        </div>

        {/* Details */}
        <div className="space-y-6">
          {[
            { label: "Name", value: username, set: setUsername, type: "text" },
            { label: "Email account", value: email, set: setEmail, type: "email" },
            { label: "Mobile number", value: mobile, set: setMobile, type: "tel" },
            { label: "Password", value: password, set: setPassword, type: "password" },
          ].map((field) => (
            <div
              key={field.label}
              className="flex justify-between items-center border-b border-gray-200 pb-3"
            >
              <div className="text-gray-600 font-medium">{field.label}</div>
              <div className="flex items-center">
                {isEditing ? (
                  <input
                    type={field.type}
                    value={field.value}
                    onChange={(e) => field.set(e.target.value)}
                    className="text-right border-none focus:ring-0 focus:outline-none"
                  />
                ) : (
                  <span className="text-gray-800">{field.value}</span>
                )}
                <button
                  onClick={() => setIsEditing((prev) => !prev)}
                  className="ml-2 text-gray-400 hover:text-gray-600"
                >
                  <Pencil size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Save button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={handleSave}
            className="w-full px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md transition-colors hover:bg-blue-600"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
