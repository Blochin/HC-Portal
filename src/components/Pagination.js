"use client";

import { Pagination } from "flowbite-react";
import { useState } from "react";
import PropTypes from "prop-types";

function CustomPagination({ current, onChangeCurrent, totalPages }) {
  const [currentPage, setCurrentPage] = useState(current);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    onChangeCurrent(page);
  };
  return (
    <div className="flex overflow-x-auto sm:justify-center">
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        showIcons
      />
    </div>
  );
}

export default CustomPagination;

CustomPagination.propTypes = {
  current: PropTypes.number.isRequired,
  onChangeCurrent: PropTypes.func.isRequired,
  totalPages: PropTypes.number.isRequired,
};
