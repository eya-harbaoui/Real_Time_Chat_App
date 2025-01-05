import React from "react";
import AuthForm from "../components/Auth/AuthForm";
import { FaRegCircleUser } from "react-icons/fa6";

export const Login = () => {
  const loginFields = [
    { type: "text", placeholder: "Enter username ...", label: "Username" },
    { type: "password", placeholder: "Enter password ...", label: "Password" },
  ];

  return (
    <AuthForm
      title="Login In"
      buttonText="Login"
      fields={loginFields}
      linkText="Don't have an account"
      icon={<FaRegCircleUser className="size-14 text-purple-600" />}
    />
  );
};
