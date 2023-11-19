import React from "react";
import { Badge, Label } from "flowbite-react";
import { HiX } from "react-icons/hi";
import PropTypes from "prop-types";

const BadgeTrigger = ({ selectedValues, label, handleRemove }) => (
  <div className="flex flex-wrap gap-1">
    {selectedValues.length === 0 && (
      <Label className={"text-gray-500"}>{label}</Label>
    )}
    {selectedValues.map((value, index) => (
      <Badge color={value?.is_checked ? "yellow" : "light"} key={index}>
        <div className="flex justify-center gap-1 items-center">
          <span>{value?.value}</span>
          <HiX
            className={"hover:cursor-pointer"}
            onClick={(event) => handleRemove(value, event)}
          />
        </div>
      </Badge>
    ))}
  </div>
);

BadgeTrigger.propTypes = {
  selectedValues: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
  handleRemove: PropTypes.func.isRequired,
};

export default BadgeTrigger;
