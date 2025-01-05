import React from "react";
import AuthForm from "../components/Auth/AuthForm";
import { LuUserRoundPlus } from "react-icons/lu";
export const SignUp = () => {
  const signUpFields = [
    {
      type: "text",
      placeholder: "Enter your full name ...",
      label: "Full Name",
    },
    { type: "text", placeholder: "Enter your username ...", label: "Username" },
    {
      type: "select",
      placeholder: "Select you gender",
      label: "Gender",
      selectOptions: [
        {
          key: 1,
          text: "Male",
        },
        {
          key: 2,
          text: "Female",
        },
      ],
      selectText: "Choose gender",
    },
    { type: "password", placeholder: "Enter password ...", label: "Password" },
    {
      type: "password",
      placeholder: "Confirm password ...",
      label: "Confirm Password",
    },
  ];

  return (
    <AuthForm
      title="Sign Up"
      buttonText="Sign Up"
      fields={signUpFields}
      linkText="Already have an account ?"
      icon={<LuUserRoundPlus className="size-14 text-purple-600" />}
    />
  );
};
