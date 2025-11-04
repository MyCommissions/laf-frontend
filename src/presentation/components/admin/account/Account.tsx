import React, { useState, ChangeEvent, useEffect } from "react";
import { Pencil, X, Eye, EyeOff } from "lucide-react";
import { useAuthUser } from "../../../../domain/hooks/useCurrentUser";

type UserRole = "user" | "admin";

interface UserInfo {
  firstname: string;
  lastname: string;
  email: string;
  mobile: string;
  password: string;
  profile_picture: string;
  role: UserRole;
}

const Account: React.FC = () => {
  const { data: currentUser, isLoading, isError } = useAuthUser();

  // ✅ Dummy data for demonstration (user/admin)
  const dummyUser: UserInfo = {
    firstname: "John",
    lastname: "Doe",
    email: "john.doe@example.com",
    mobile: "+639123456789",
    password: "user12345",
    profile_picture: "https://placehold.co/100x100/3498db/FFFFFF?text=JD",
    role: "user",
  };

  const dummyAdmin: UserInfo = {
    firstname: "Admin",
    lastname: "Smith",
    email: "admin.smith@example.com",
    mobile: "+639876543210",
    password: "admin54321",
    profile_picture: "https://placehold.co/100x100/f59e0b/FFFFFF?text=AD",
    role: "admin",
  };

  // ✅ States
  const [username, setUsername] = useState("Your name");
  const [email, setEmail] = useState("yourname@gmail.com");
  const [mobile, setMobile] = useState("Add number");
  const [password, setPassword] = useState("test");
  const [showPassword, setShowPassword] = useState(false);
  const [profilePicture, setProfilePicture] = useState(
    "https://placehold.co/100x100/3498db/FFFFFF?text=JD"
  );
  const [isEditing, setIsEditing] = useState(false);
  const [role, setRole] = useState<UserRole>("user");

  // ✅ Automatically populate fields from currentUser or dummy
  useEffect(() => {
    if (currentUser) {
      setUsername(`${currentUser.firstname} ${currentUser.lastname}` || "Your name");
      setEmail(currentUser.email || "yourname@gmail.com");
      setRole(currentUser.role || "user");
      if (currentUser.profile_picture) {
        setProfilePicture(currentUser.profile_picture);
      }
    } else {
      // Default dummy user data
      populateData(dummyUser);
    }
  }, [currentUser]);

  // ✅ Function to populate account info
  const populateData = (data: UserInfo) => {
    setUsername(`${data.firstname} ${data.lastname}`);
    setEmail(data.email);
    setMobile(data.mobile);
    setPassword(data.password);
    setProfilePicture(data.profile_picture);
    setRole(data.role);
  };

  // ✅ Handle image upload
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

  // ✅ Edit toggle and save
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

  // ✅ Switch between User and Admin
  const handleRoleSwitch = (newRole: UserRole) => {
    setRole(newRole);
    if (newRole === "user") populateData(dummyUser);
    else populateData(dummyAdmin);
  };

  // ✅ Loading & Error (unchanged)
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
            </div>
          </div>

          {/* Password */}
          <div className="flex justify-between items-center border-b border-gray-200 pb-3">
            <div className="text-gray-600 font-medium">Password</div>
            <div className="flex items-center space-x-2">
              {isEditing ? (
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="text-right border-none focus:ring-0 focus:outline-none"
                />
              ) : (
                <span className="text-gray-800">
                  {showPassword ? password : "••••••••"}
                </span>
              )}

              {/* 👁️ Toggle password visibility */}
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
