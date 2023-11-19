import React from "react";
import PropTypes from "prop-types";
import { Label, TextInput } from "flowbite-react";

const CustomTextInput = ({
  name,
  label,
  type = "text",
  placeholder,
  onChange,
  defaultValue,
}) => {
  const handleChange = (event) => {
    const { name, value } = event.target;
    onChange(name, value);
  };
  return (
    <div className="flex flex-col gap-4">
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
          className={"mb-6"}
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
};

export default CustomTextInput;
