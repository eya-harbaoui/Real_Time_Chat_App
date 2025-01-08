import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { AUTH_URL } from "../Endpoints";
import { useAuthContext } from "../context/AuthContext";
export const useSignup = () => {
  // State for tracking the loading status during the sign-up process
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  // Function to handle the sign-up process
  const signup = async (formData) => {
    // Validate the form data before proceeding with the signup
    const success = handleInputErrors(formData);
    if (!success) return;

    try {
      // Send POST request to the signup endpoint with formData
      const response = await axios.post(`${AUTH_URL}/signup`, formData);
      console.log("signup response ", response);
      toast.success("Signup successful");
      //store the user info in the localstorage
      localStorage.setItem("chat-user", JSON.stringify(response.data));
      //auth context
      setAuthUser(response.data);
    } catch (error) {
      // Handle the error based on the response from the backend
      if (error.response && error.response.data) {
        // Check if the error is related to username already existing
        if (error.response.data.error === "Username already exists") {
          toast.error(
            "Already registred ! Please choose another username or login."
          );
        } else {
          toast.error(
            error.response.data.error || "An error occurred during signup."
          );
        }
      } else {
        toast.error(error.message || "An error occurred during signup.");
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

// Function to handle input validation errors
const handleInputErrors = (formData) => {
  const { fullName, gender, username, password, confirmedPassword } = formData;
  console.log("formData", formData);

  // Check if any required field is empty
  if (!fullName || !gender || !username || !password || !confirmedPassword) {
    toast.error("Please fill in all fields!");
    return false;
  }

  // Check if the password and confirmed password match
  if (password !== confirmedPassword) {
    toast.error("Passwords do not match!");
    return false;
  }

  // Check if the password length is at least 6 characters
  if (password.length < 6) {
    toast.error("Password must be at least 6 characters long!");
    return false;
  }

  return true;
};
