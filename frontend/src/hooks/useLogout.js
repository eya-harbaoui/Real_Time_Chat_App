import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { AUTH_URL } from "../Endpoints/Endpoints";
import { useAuthContext } from "../context/AuthContext";
export const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  // Function to handle the logout process
  const logout = async () => {
    try {
      // Send POST request to the logout endpoint
      const response = await axios.post(`${AUTH_URL}/logout`, {
        withCredentials: true,
      });
      console.log("logout response ", response.data);
      toast.success("logout successful");
      //retreive the user info from the localstorage
      localStorage.removeItem("chat-user");
      //auth context
      setAuthUser(null);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout };
};
