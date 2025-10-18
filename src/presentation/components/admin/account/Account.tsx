import React, { useState, ChangeEvent, useEffect } from "react";
import { Pencil, X } from "lucide-react";
import { useAuthUser } from "../../../../domain/hooks/useCurrentUser"

type UserRole = "user" | "admin";

const Account: React.FC = () => {
  const { data: currentUser, isLoading, isError } = useAuthUser();

  const [username, setUsername] = useState("Your name");
  const [email, setEmail] = useState("yourname@gmail.com");
  const [mobile, setMobile] = useState("Add number");
  const [password, setPassword] = useState("test");
  const [profilePicture, setProfilePicture] = useState(
    "https://placehold.co/100x100/3498db/FFFFFF?text=JD"
  );
  const [isEditing, setIsEditing] = useState(false);
  const [role, setRole] = useState<UserRole>("user");

  // ✅ Populate the fields once currentUser is fetched
  useEffect(() => {
    if (currentUser) {
      setUsername(currentUser.firstname + " " + currentUser.lastname || "Your name");
      setEmail(currentUser.email || "yourname@gmail.com");
      setRole(currentUser.role || "user");
      if (currentUser.profile_picture) {
        setProfilePicture(currentUser.profile_picture);
      }
    }
  }, [currentUser]);

  // ✅ Handle image upload (same as before)
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

  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleSave = () => {
    console.log("Saving profile data:", {
      username,
      email,
      mobile,
      password,
      role,
    });
    setIsEditing(false);
  };

  const handleRoleSwitch = (newRole: UserRole) => setRole(newRole);

  // ✅ Loading and error handling (no design change)
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        Loading account...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        Failed to load user info.
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-lg p-6">
        {/* Role Tabs */}
        <div className="flex justify-between mb-6 border-b-2 border-gray-200">
          <div
            className={`cursor-pointer px-4 py-2 font-semibold transition-colors duration-200 ${
              role === "user"
                ? "text-blue-500 border-b-2 border-blue-500"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => handleRoleSwitch("user")}
          >
            User
          </div>
          <div
            className={`cursor-pointer px-4 py-2 font-semibold transition-colors duration-200 ${
              role === "admin"
                ? "text-blue-500 border-b-2 border-blue-500"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => handleRoleSwitch("admin")}
          >
            Admin
          </div>
        </div>

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
          <div className="ml-auto text-gray-400 hover:text-gray-600 cursor-pointer">
            <X size={24} />
          </div>
        </div>

        {/* Profile Fields */}
        <div className="space-y-6">
          {/* Name */}
          <div className="flex justify-between items-center border-b border-gray-200 pb-3">
            <div className="text-gray-600 font-medium">Name</div>
            <div className="flex items-center">
              {isEditing ? (
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="text-right border-none focus:ring-0 focus:outline-none"
                />
              ) : (
                <span className="text-gray-800">{username}</span>
              )}
              <button
                onClick={handleEditToggle}
                className="ml-2 text-gray-400 hover:text-gray-600"
              >
                <Pencil size={16} />
              </button>
            </div>
          </div>

          {/* Email */}
          <div className="flex justify-between items-center border-b border-gray-200 pb-3">
            <div className="text-gray-600 font-medium">Email account</div>
            <div className="flex items-center">
              {isEditing ? (
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-right border-none focus:ring-0 focus:outline-none"
                />
              ) : (
                <span className="text-gray-800">{email}</span>
              )}
              <button
                onClick={handleEditToggle}
                className="ml-2 text-gray-400 hover:text-gray-600"
              >
                <Pencil size={16} />
              </button>
            </div>
          </div>

          {/* Mobile */}
          <div className="flex justify-between items-center border-b border-gray-200 pb-3">
            <div className="text-gray-600 font-medium">Mobile number</div>
            <div className="flex items-center">
              {isEditing ? (
                <input
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="text-right border-none focus:ring-0 focus:outline-none"
                />
              ) : (
                <span className="text-gray-800">{mobile}</span>
              )}
              <button
                onClick={handleEditToggle}
                className="ml-2 text-gray-400 hover:text-gray-600"
              >
                <Pencil size={16} />
              </button>
            </div>
          </div>

          {/* Password */}
          <div className="flex justify-between items-center border-b border-gray-200 pb-3">
            <div className="text-gray-600 font-medium">Password</div>
            <div className="flex items-center">
              {isEditing ? (
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="text-right border-none focus:ring-0 focus:outline-none"
                />
              ) : (
                <span className="text-gray-800">••••••••</span>
              )}
              <button
                onClick={handleEditToggle}
                className="ml-2 text-gray-400 hover:text-gray-600"
              >
                <Pencil size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={handleSave}
            className="w-full px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md transition-colors hover:bg-blue-600"
          >
            Save Change
          </button>
        </div>
      </div>
    </div>
  );
};

export default Account;
