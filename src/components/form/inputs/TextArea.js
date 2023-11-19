import { Label, Textarea } from "flowbite-react";
import React from "react";
import PropTypes from "prop-types";

const CustomTextArea = ({
  name,
  label,
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
        <Textarea
          name={name}
          placeholder={placeholder}
          onChange={(event) => handleChange(event)}
          defaultValue={defaultValue}
          className={"mb-6"}
        />
      </div>
    </div>
  );
};

CustomTextArea.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  defaultValue: PropTypes.string,
};

export default CustomTextArea;
