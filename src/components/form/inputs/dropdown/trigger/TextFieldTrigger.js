import React from "react";
import { Label } from "flowbite-react";
import { HiX } from "react-icons/hi";
import PropTypes from "prop-types";

const TextFieldTrigger = ({ selectedValues, label, handleRemove }) => (
  <>
    {selectedValues.length === 0 ? (
      <Label className={"text-gray-500"}>{label}</Label>
    ) : (
      <div className="flex justify-center gap-0.5 items-center">
        <span>{selectedValues[0]?.value}</span>
        {handleRemove && (
          <HiX
            className={"hover:cursor-pointer"}
            onClick={(event) => handleRemove(selectedValues[0], event)}
          />
        )}
      </div>
    )}
  </>
);

TextFieldTrigger.propTypes = {
  selectedValues: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
  handleRemove: PropTypes.func,
};

export default TextFieldTrigger;
