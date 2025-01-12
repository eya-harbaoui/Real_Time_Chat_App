import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { AUTH_URL } from "../Endpoints/Endpoints";
import { useAuthContext } from "../context/AuthContext";

export const useUpdateProfile = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser, authUser } = useAuthContext();

 const updateProfile = async (profileData) => {
   const isValid = validateProfileData(profileData);
   if (!isValid) return false;

   setLoading(true);

   try {
     const response = await axios.post(`${AUTH_URL}/profile`, profileData, {
       withCredentials: true,
       headers: {
         "Content-Type": "multipart/form-data",
       },
     });

     if (response.data?.user) {
       toast.success("Profile updated successfully!");
       setAuthUser(response.data.user);
       localStorage.setItem("chat-user", JSON.stringify(response.data.user));
       return true;
     } else {
       throw new Error("Invalid response format");
     }
   } catch (error) {
     handleUpdateError(error);
     return false;
   } finally {
     setLoading(false);
   }
 };

  return { loading, updateProfile };
};

const validateProfileData = (profileData) => {
  const { fullName, email, currentPassword, newPassword, profilePic } =
    profileData;

  if (fullName !== undefined && fullName.trim() === "") {
    toast.error("Name cannot be empty if provided.");
    return false;
  }

  if (email !== undefined && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    toast.error("Please enter a valid email address.");
    return false;
  }

  if ((currentPassword && !newPassword) || (!currentPassword && newPassword)) {
    toast.error(
      "Both current and new password are required to change password."
    );
    return false;
  }

  if (newPassword && newPassword.length < 6) {
    toast.error("New password must be at least 6 characters long!");
    return false;
  }

  if (profilePic && !isValidImageFile(profilePic)) {
    toast.error("Please upload a valid image file (jpg, jpeg, png, gif)");
    return false;
  }

  if (profilePic && profilePic.size > 5 * 1024 * 1024) {
    toast.error("Profile picture must be less than 5MB");
    return false;
  }

  return true;
};

const isValidImageFile = (file) => {
  const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
  return validTypes.includes(file.type);
};

const handleUpdateError = (error) => {
  const errorMessage =
    error.response?.data?.error || error.message || "Failed to update profile.";
  toast.error(errorMessage);
  console.error("Profile update error:", error);
};
