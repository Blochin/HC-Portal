import React from "react";
import PropTypes from "prop-types";
import { Button } from "flowbite-react";

const CustomButton = ({ type, children, onClick }) => {
  const handleClick = (event) => {
    if (type !== "submit") {
      event.preventDefault();
    }
    onClick(event);
  };
  return (
    <Button className={"mb-6"} type={type} onClick={handleClick}>
      {children}
    </Button>
  );
};

CustomButton.propTypes = {
  type: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

export default CustomButton;
