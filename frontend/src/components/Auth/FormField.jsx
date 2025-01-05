import React from "react";
//This component provide a form field (input/select)
export const FormField = ({
  fieldLabel = "",
  inputType = "text",
  inputPlaceholder = "",
  selectOptions = [],
  selectText = "",
  onChange,
}) => {
  return (
    <div className="space-y-2">
      {/*field lebel*/}
      <label className="text-base font-medium text-gray-900">
        {fieldLabel}
      </label>
      {/*input*/}
      {inputType !== "select" && (
        <div className="input input-md input-bordered flex items-center gap-2">
          <input
            type={inputType}
            className="grow"
            placeholder={inputPlaceholder}
            defaultValue={inputType === "password" ? "password" : undefined}
            onChange={onChange}
          />
        </div>
      )}
      {/*select*/}
      {inputType === "select" && (
        <div className="">
          <select
            className="select select-md select-bordered flex items-center gap-2 w-full max-w-xs"
            onChange={onChange}
          >
            <option disabled selected>
              {selectText}
            </option>
            {selectOptions.map((option) => (
              <option key={option.key}>{option.text}</option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};
