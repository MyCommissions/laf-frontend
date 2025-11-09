import React, { useState, useEffect } from "react";
import { X, Eye, EyeOff } from "lucide-react";
import { useAuthUser } from "../../../../domain/hooks/useCurrentUser";
import { useUserByRole, useUpdateUser } from "../../../../domain/hooks/useAuth";
import { ToastMessage } from "../../../components/ui/ToastMessage";

type UserRole = "user" | "admin";

interface UserInfo {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  mobile?: string;
  profile_picture?: string;
  roleId: number;
}

// Helpers
const getInitials = (first: string, last: string) => {
  return `${first[0] || ""}${last[0] || ""}`.toUpperCase();
};

const getProfileBgColor = (id: string | number) => {
  const colors = ["#3498db", "#e67e22", "#9b59b6", "#2ecc71", "#e74c3c"];
  const index = id
    ? id.toString().split("").reduce((acc, cur) => acc + cur.charCodeAt(0), 0) % colors.length
    : 0;
  return colors[index];
};

const Account: React.FC = () => {
  const { isLoading, isError } = useAuthUser();
  const { data: admin } = useUserByRole(1);
  const { data: user } = useUserByRole(2);
  const updateUserMutation = useUpdateUser();

  const [role, setRole] = useState<UserRole>("user");

  const [firstname, setFirstname] = useState("Firstname");
  const [lastname, setLastname] = useState("Lastname");
  const [email, setEmail] = useState("yourname@gmail.com");
  const [mobile, setMobile] = useState("Add number");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profilePicture, setProfilePicture] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState(false);

  // Error messages per field
  const [errors, setErrors] = useState<{
    firstname?: string;
    lastname?: string;
    email?: string;
    currentPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
  }>({});

  // Toast state
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState<"success" | "error" | "warning">("success");
  const [toastMessage, setToastMessage] = useState("");

  const userData: UserInfo | null = user ? (user as UserInfo) : null;
  const adminData: UserInfo | null = admin ? (admin as UserInfo) : null;

  useEffect(() => {
    const data = role === "user" ? userData : adminData;
    if (data) {
      setFirstname(data.firstname || "Firstname");
      setLastname(data.lastname || "Lastname");
      setEmail(data.email);
      setMobile(data.mobile ?? "Add number");
      setProfilePicture(data.profile_picture ?? "");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setErrors({});
      setShowPasswordFields(false);
    } else {
      setFirstname("Firstname");
      setLastname("Lastname");
      setEmail("yourname@gmail.com");
      setMobile("Add number");
      setProfilePicture("");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setErrors({});
      setShowPasswordFields(false);
    }
  }, [role, userData, adminData]);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleSave = () => {
    const data = role === "user" ? userData : adminData;
    if (!data?.id) return;

    const newErrors: typeof errors = {};

    if (!firstname.trim()) newErrors.firstname = "Firstname cannot be empty";
    if (!lastname.trim()) newErrors.lastname = "Lastname cannot be empty";
    if (!email.trim()) newErrors.email = "Email cannot be empty";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email format";

    if (showPasswordFields && newPassword) {
      if (role === "user" && !currentPassword)
        newErrors.currentPassword = "Please enter current password";
      if (newPassword !== confirmPassword)
        newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const payload: any = {
      firstname,
      lastname,
      email,
      mobile,
      roleId: role === "admin" ? 1 : 2,
    };

    if (showPasswordFields && newPassword) {
      payload.currentPassword = currentPassword;
      payload.newPassword = newPassword;
      payload.confirmPassword = confirmPassword;
    }

    updateUserMutation.mutate(
      { userId: data.id, payload },
      {
        onSuccess: () => {
          setIsEditing(false);
          setCurrentPassword("");
          setNewPassword("");
          setConfirmPassword("");
          setErrors({});
          setShowPasswordFields(false);
          setToastType("success");
          setToastMessage("Profile updated successfully");
          setShowToast(true);
        },
        onError: (err: any) => {
          const errorMessage =
            err?.response?.data?.message || err.message || `Failed to update ${role} profile`;
          setToastType("error");
          setToastMessage(errorMessage);
          setShowToast(true);
        },
      }
    );
  };

  const handleRoleSwitch = (newRole: UserRole) => {
    setRole(newRole);
    setIsEditing(false);
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        Loading account...
      </div>
    );
  if (isError)
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        Failed to load user info.
      </div>
    );

  const activeData = role === "user" ? userData : adminData;

  const renderInputWithError = (
    label: string,
    value: string,
    onChange: (val: string) => void,
    error?: string,
    type: string = "text",
    showToggle?: boolean,
    showValue?: boolean,
    onToggle?: () => void
  ) => (
    <div className="flex flex-col">
      <div className="flex justify-between items-center border-b border-gray-200 pb-3">
        <div className="text-gray-600 font-medium">{label}</div>
        <div className="flex items-center space-x-2">
          <input
            type={showValue ? "text" : type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="text-right border-none focus:ring-0 focus:outline-none"
          />
          {showToggle && onToggle && (
            <button onClick={onToggle} className="text-gray-400 hover:text-gray-600">
              {showValue ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
        </div>
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );

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
            {profilePicture ? (
              <img
                src={profilePicture}
                alt="Profile"
                className="w-full h-full rounded-full object-cover border-4 border-gray-300 shadow-md"
              />
            ) : (
              <div
                className="w-full h-full rounded-full flex items-center justify-center text-white text-2xl font-bold border-4 border-gray-300 shadow-md"
                style={{ backgroundColor: getProfileBgColor(activeData?.id || role) }}
              >
                {getInitials(firstname, lastname)}
              </div>
            )}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              {firstname} {lastname}
              <span className="text-xs ml-2 px-2 py-1 font-normal bg-gray-200 text-gray-700 rounded-full capitalize">
                {role}
              </span>
            </h2>
            <p className="text-sm text-gray-500">{email}</p>
          </div>
          <div className="ml-auto text-gray-400 hover:text-gray-600 cursor-pointer" onClick={handleEditToggle}>
            {isEditing ? <X size={24} /> : <span className="font-semibold">Edit</span>}
          </div>
        </div>

        {activeData && (
          <div className="space-y-6">
            {renderInputWithError("First name", firstname, setFirstname, errors.firstname)}
            {renderInputWithError("Last name", lastname, setLastname, errors.lastname)}
            {renderInputWithError("Email account", email, setEmail, errors.email, "email")}
            {renderInputWithError("Mobile number", mobile, setMobile)}

            {/* CHANGE PASSWORD BUTTON & CANCEL */}
            {isEditing && !showPasswordFields && (
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowPasswordFields(true)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  Change Password
                </button>
              </div>
            )}

            {isEditing && showPasswordFields && (
              <>
                {role === "user" &&
                  renderInputWithError(
                    "Current Password",
                    currentPassword,
                    setCurrentPassword,
                    errors.currentPassword,
                    "password",
                    true,
                    showCurrentPassword,
                    () => setShowCurrentPassword(!showCurrentPassword)
                  )}
                {renderInputWithError(
                  "New Password",
                  newPassword,
                  setNewPassword,
                  errors.newPassword,
                  "password",
                  true,
                  showNewPassword,
                  () => setShowNewPassword(!showNewPassword)
                )}
                {renderInputWithError(
                  "Confirm Password",
                  confirmPassword,
                  setConfirmPassword,
                  errors.confirmPassword,
                  "password",
                  true,
                  showConfirmPassword,
                  () => setShowConfirmPassword(!showConfirmPassword)
                )}

                {/* CANCEL BUTTON */}
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => {
                      setCurrentPassword("");
                      setNewPassword("");
                      setConfirmPassword("");
                      setShowPasswordFields(false);
                    }}
                    className="px-4 py-2 bg-red-200 text-red-700 rounded-lg hover:bg-red-300"
                  >
                    Cancel Change Password
                  </button>
                </div>
              </>
            )}

            {isEditing && (
              <div className="flex justify-end pt-4">
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            )}
          </div>
        )}

        {!activeData && (
          <div className="text-center text-gray-500 py-10">No {role} account found.</div>
        )}

        {/* Toast */}
        {showToast && (
          <ToastMessage
            type={toastType}
            message={toastMessage}
            onClose={() => setShowToast(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Account;
