import React, { useState } from "react";
import AuthForm from "../components/Auth/AuthForm";
import { FaRegCircleUser } from "react-icons/fa6";
import { useLogin } from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();

  const handleInputChange = (field, value) => {
    setFormData((prev) => {
      return { ...prev, [field]: value };
    });
  };
  const loginFields = [
    {
      type: "text",
      placeholder: "Enter username ...",
      label: "Username",
      onChange: (e) => handleInputChange("username", e.target.value),
    },
    {
      type: "password",
      placeholder: "Enter password ...",
      label: "Password",
      onChange: (e) => handleInputChange("password", e.target.value),
    },
  ];

  // formData state

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  //A custom hook that provides a signup function to handle the sign-up process + a loading state to track if the sign-up is in progress
  const { loading, login } = useLogin();

  // A function that is called when the form is submitted
  const handleSubmit = async () => {
    await login(formData);
    navigate("/");
  };
  const handleLinkButton = () => {
    navigate("/signup");
  };

  return (
    <div className="flex justify-center w-96">
      <AuthForm
        title="Login In"
        buttonText="Login"
        fields={loginFields}
        linkText="Don't have an account"
        icon={<FaRegCircleUser className="size-14 text-purple-600" />}
        handleSubmit={handleSubmit}
        handleLinkButton={handleLinkButton}
      />
    </div>
  );
};
