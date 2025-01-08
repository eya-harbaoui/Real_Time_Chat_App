// This component provide a form for authenfication (signup or login)
import React from "react";
import { FormField } from "./FormField";
import { CiLogin } from "react-icons/ci";

const AuthForm = ({
  title,
  buttonText,
  fields,
  icon,
  linkText,
  handleSubmit,
  handleLinkButton,
}) => {
  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit();
  };
  return (
    <div className="flex-col items-center justify-center">
      {/*Title*/}
      <div className="text-center mb-5">
        <h1 className="text-xl font-semibold text-gray-900">
          Welcome to <span className="text-purple-600">Talkio !</span>
        </h1>
      </div>
      {/*Form Card*/}
      <div className="card-body items-center bg-base-100 shadow-xl rounded-lg">
        <div>{icon}</div>
        <h2 className="card-title">{title}</h2>
        <form className="space-y-1 w-72" onSubmit={onSubmit}>
          {fields.map((field, index) => (
            <FormField
              key={index}
              inputType={field.type}
              inputPlaceholder={field.placeholder}
              fieldLabel={field.label}
              selectOptions={field.selectOptions}
              selectText={field.selectText}
              onChange={field.onChange}
            />
          ))}
          <div>
            <button
              type="submit"
              className="btn w-72 mt-2 bg-purple-600 border-purple-600 hover:bg-purple-600 hover:bg-opacity-90 hover:border-purple-600"
            >
              <span className="flex items-center justify-center text-base font-medium text-white">
                <CiLogin className="size-6" />
                {buttonText}
              </span>
            </button>
          </div>
        </form>
        <div className="flex-col items-center justify-center mt-2 text-center">
          <a
            className="text-sm text-purple-600 underline cursor-pointer hover:text-opacity-70"
            onClick={handleLinkButton}
          >
            {linkText}
          </a>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
