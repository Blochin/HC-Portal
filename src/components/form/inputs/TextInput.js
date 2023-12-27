import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Label, TextInput } from "flowbite-react";

const CustomTextInput = ({
  name,
  size = "md",
  isRequired = false,
  label,
  type = "text",
  placeholder,
  onChange,
  defaultValue,
  errorMessage,
}) => {
  const handleChange = (event) => {
    const { name, value } = event.target;
    onChange(name, value);
  };

  useEffect(() => {
    if (defaultValue === undefined) {
      onChange(name, null);
      return;
    }
    onChange(name, defaultValue);
  }, [name, defaultValue]);

  return (
    <div className="flex flex-col gap-4 mb-6">
      <div>
        <div className="mb-2 block">
          <Label value={label} />
          {isRequired && <span className="ml-1 text-red-500">*</span>}
        </div>
        <TextInput
          sizing={size}
          name={name}
          type={type}
          placeholder={placeholder}
          onChange={(event) => handleChange(event)}
          defaultValue={defaultValue}
          color={errorMessage ? "failure" : "gray"}
          helperText={
            errorMessage ? (
              <span className="font-medium">{errorMessage}</span>
            ) : null
          }
        />
      </div>
    </div>
  );
};

CustomTextInput.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.string,
  isRequired: PropTypes.bool,
  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  defaultValue: PropTypes.string,
  errorMessage: PropTypes.string,
};

export default CustomTextInput;
