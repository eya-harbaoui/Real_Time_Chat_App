import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { AUTH_URL } from "../Endpoints";
import { useAuthContext } from "../context/AuthContext";
export const useLogin = () => {
  // State for tracking the loading status during the login process
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  // Function to handle the login process
  const login = async (formData) => {
    // Validate the form data before proceeding with the login
    const success = handleInputErrors(formData);
    if (!success) return;

    setLoading(true); // Set loading to true when starting the login process

    try {
      // Send POST request to the login endpoint with formData
      const response = await axios.post(`${AUTH_URL}/login`, formData);
      console.log("login response ", response.data);
      toast.success("Login successful");
      //store the user info in the localstorage
      localStorage.setItem("chat-user", JSON.stringify(response.data));
      //auth context
      setAuthUser(response.data);
    } catch (error) {
      // Handle the error based on the response from the backend
      if (error.response && error.response.data) {
        // Check if the error is related to wrong username or password
        if (error.response.data.error === "User not found") {
          toast.error("User not found");
        } else if (error.response.data.error === "Invalid password") {
          toast.error("Invalid password");
        } else {
          toast.error(
            error.response.data.error || "An error occurred during login."
          );
        }
      } else {
        toast.error(error.message || "An error occurred during login.");
      }
    } finally {
      setLoading(false); // Set loading to false after the process is complete
    }
  };

  return { loading, login };
};

// Function to handle input validation errors
const handleInputErrors = (formData) => {
  const { username, password } = formData;

  // Check if any required field is empty
  if (!username || !password) {
    toast.error("Please fill in all fields!");
    return false;
  }

  return true;
};
