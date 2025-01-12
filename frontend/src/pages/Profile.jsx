// Profile.jsx
import React, { useState, useRef, useCallback } from "react";
import { useAuthContext } from "../context/AuthContext";
import { SideBar } from "../components/SideBar/SideBar";
import { CiImport } from "react-icons/ci";
import { MdOutlineModeEdit, MdLockReset } from "react-icons/md";
import { FormField } from "../components/Auth/FormField";
import { useUpdateProfile } from "../hooks/useUpdateProfile";
import { toast } from "react-hot-toast";

const Profile = () => {
  const { authUser } = useAuthContext();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);
  const [editedProfile, setEditedProfile] = useState({
    fullName: authUser?.fullName || "",
    email: authUser?.email || "",
    currentPassword: "",
    newPassword: "",
    profilePic: null,
  });

  const { loading, updateProfile } = useUpdateProfile();

  const handleEdit = useCallback(() => {
    setIsEditing(true);
    setEditedProfile((prev) => ({
      ...prev,
      fullName: authUser?.fullName || "",
      email: authUser?.email || "",
    }));
  }, [authUser]);

  const handleCancel = useCallback(() => {
    setIsEditing(false);
    setIsChangingPassword(false);
    setPreviewImage(null);
    setEditedProfile({
      fullName: authUser?.fullName || "",
      email: authUser?.email || "",
      currentPassword: "",
      newPassword: "",
      profilePic: null,
    });
  }, [authUser]);

  const handleSave = async () => {
    const formData = new FormData();

    if (editedProfile.fullName !== authUser?.fullName) {
      formData.append("fullName", editedProfile.fullName);
    }

    if (editedProfile.email !== authUser?.email) {
      formData.append("email", editedProfile.email);
    }

    if (
      isChangingPassword &&
      editedProfile.currentPassword &&
      editedProfile.newPassword
    ) {
      formData.append("currentPassword", editedProfile.currentPassword);
      formData.append("newPassword", editedProfile.newPassword);
    }

    if (editedProfile.profilePic) {
      formData.append("profilePic", editedProfile.profilePic);
    }

    formData.append("userId", authUser._id);

    // Log FormData entries for debugging
    for (let pair of formData.entries()) {
      console.log("FormData Entry:", pair[0], pair[1]);
    }

    const success = await updateProfile(formData);
    if (success) {
      handleCancel();
    }
  };

  const handleChange = useCallback(
    (field) => (e) => {
      setEditedProfile((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    },
    []
  );

  const handleImageClick = useCallback(() => {
    if (isEditing) {
      fileInputRef.current?.click();
    }
  }, [isEditing]);

  const handleImageChange = useCallback((e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }

      setEditedProfile((prev) => ({
        ...prev,
        profilePic: file,
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  return (
    <div className="min-h-screen flex">
      <SideBar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div className="flex-1 p-6">
        <div className="bg-white shadow-md rounded-lg p-8 max-w-4xl mx-auto space-y-8">
          {/* Header Section */}
          <div className="text-center">
            <h1 className="text-4xl font-semibold text-purple-600">Profile</h1>
          </div>

          {/* Content Section */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* Profile Image Section */}
            <div className="w-full md:w-1/3 space-y-4">
              <div
                className="aspect-square w-full bg-gray-100 rounded-lg overflow-hidden cursor-pointer relative group"
                onClick={handleImageClick}
              >
                <img
                  src={previewImage || authUser?.profilePic}
                  alt={`${authUser?.fullName}'s profile`}
                  className="object-cover w-full h-full"
                />
                {isEditing && (
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white text-sm">
                      Click to change photo
                    </span>
                  </div>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
              {isEditing && (
                <button
                  onClick={handleImageClick}
                  className="w-full px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg flex items-center justify-center gap-2 font-medium transition-colors"
                >
                  <CiImport size={20} />
                  Import Photo
                </button>
              )}
            </div>

            {/* Profile Details Section */}
            <div className="flex-1 space-y-6">
              {/* Email */}
              <div>
                {!isEditing ? (
                  <>
                    <h2 className="text-lg font-semibold text-gray-800">
                      Email
                    </h2>
                    <p className="text-md bg-gray-50 p-3 rounded-lg text-gray-700 shadow-sm">
                      {authUser?.email}
                    </p>
                  </>
                ) : (
                  <FormField
                    fieldLabel="Email"
                    inputType="email"
                    inputPlaceholder="Enter your email"
                    value={editedProfile.email}
                    onChange={handleChange("email")}
                  />
                )}
              </div>

              {/* Full Name */}
              <div>
                {!isEditing ? (
                  <>
                    <h2 className="text-lg font-semibold text-gray-800">
                      Full Name
                    </h2>
                    <p className="text-md bg-gray-50 p-3 rounded-lg text-gray-700 shadow-sm">
                      {authUser?.fullName}
                    </p>
                  </>
                ) : (
                  <FormField
                    fieldLabel="Full Name"
                    inputType="text"
                    inputPlaceholder="Enter your full name"
                    value={editedProfile.fullName}
                    onChange={handleChange("fullName")}
                  />
                )}
              </div>

              {/* Password */}
              <div>
                {!isEditing ? (
                  <>
                    <h2 className="text-lg font-semibold text-gray-800">
                      Password
                    </h2>
                    <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <p className="text-md text-gray-700">**********</p>
                    </div>
                  </>
                ) : (
                  <div className="space-y-4">
                    {!isChangingPassword ? (
                      <button
                        onClick={() => setIsChangingPassword(true)}
                        className="flex items-center gap-2 px-4 py-2 text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-50"
                      >
                        <MdLockReset size={20} />
                        Change Password
                      </button>
                    ) : (
                      <>
                        <FormField
                          fieldLabel="Current Password"
                          inputType="password"
                          inputPlaceholder="Enter your current password"
                          value={editedProfile.currentPassword}
                          onChange={handleChange("currentPassword")}
                        />
                        <FormField
                          fieldLabel="New Password"
                          inputType="password"
                          inputPlaceholder="Enter your new password"
                          value={editedProfile.newPassword}
                          onChange={handleChange("newPassword")}
                        />
                        <button
                          onClick={() => {
                            setIsChangingPassword(false);
                            setEditedProfile((prev) => ({
                              ...prev,
                              currentPassword: "",
                              newPassword: "",
                            }));
                          }}
                          className="text-sm text-gray-600 hover:text-gray-800"
                        >
                          Cancel password change
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                {!isEditing ? (
                  <button
                    onClick={handleEdit}
                    className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg flex items-center gap-2 font-medium transition-colors"
                  >
                    <MdOutlineModeEdit size={20} />
                    Edit Profile
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleSave}
                      className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                      disabled={loading}
                    >
                      {loading ? "Saving..." : "Save"}
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-6 py-3 bg-gray-400 hover:bg-gray-500 text-white rounded-lg font-medium transition-colors"
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
