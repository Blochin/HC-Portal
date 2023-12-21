import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Label, TextInput } from "flowbite-react";

const CustomTextInput = ({
  name,
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
    onChange(name, defaultValue ? defaultValue : null);
  }, [name, defaultValue]);

  return (
    <div className="flex flex-col gap-4 mb-6">
      <div>
        <div className="mb-2 block">
          <Label value={label} />
        </div>
        <TextInput
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
  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  defaultValue: PropTypes.string,
  errorMessage: PropTypes.string,
};

export default CustomTextInput;
