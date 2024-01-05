import React from "react";
import PropTypes from "prop-types";

const TotalComponent = ({ total, title, description, icon: Icon }) => {
  return (
    <div className="mb-2 rounded shadow">
      <div className="bg-white p-4 relative">
        <h3 className="text-l mb-2 font-bold text-gray-700">{title}</h3>
        <div className="flex flex-col mb-2">
          <span className="text-sm text-gray-700 mr-2">{total}</span>
          <span className="text-sm text-gray-700">{description}</span>
        </div>
        <div className="absolute top-2 right-2">
          <div className="bg-gray-700 rounded-full p-2">
            {Icon && <Icon className="text-white" />}
          </div>
        </div>
      </div>
    </div>
  );
};

TotalComponent.propTypes = {
  total: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
};

export default TotalComponent;
