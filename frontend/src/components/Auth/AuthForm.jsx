import React from "react";
import { FormField } from "./FormField";
import { CiLogin } from "react-icons/ci";

const AuthForm = ({ title, buttonText, fields, icon, linkText }) => {
  return (
    <div className="flex-col items-center justify-center">
      <div className="text-center mb-5">
        <h1 className="text-xl font-semibold text-gray-900">
          Welcome to <span className="text-purple-600">Talkio !</span>
        </h1>
      </div>
      <div className="card-body items-center bg-base-100 shadow-xl rounded-lg">
        <div>{icon}</div>
        <h2 className="card-title">{title}</h2>
        <form className="space-y-1 w-72">
          {fields.map((field, index) => (
            <FormField
              key={index}
              inputType={field.type}
              inputPlaceholder={field.placeholder}
              fieldLabel={field.label}
              selectOptions={field.selectOptions}
              selectText={field.selectText}
            />
          ))}
        </form>
        <div className="flex-col items-center justify-center mt-2 text-center">
          <div>
            <button className="btn w-72 bg-purple-600 border-purple-600 hover:bg-purple-600 hover:bg-opacity-90 hover:border-purple-600">
              <span className="flex items-center justify-center text-base font-medium text-white">
                <CiLogin className="size-6" />
                {buttonText}
              </span>
            </button>
          </div>
          <div>
            <a className="text-sm text-purple-600 underline cursor-pointer hover:text-opacity-70">
              {linkText}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
