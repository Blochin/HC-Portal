"use client";

import { Pagination } from "flowbite-react";
import PropTypes from "prop-types";
import useWindowResize from "../hooks/useWindowsResize";

function CustomPagination({ current, onChangeCurrent, totalPages }) {
  const isCollapsed = useWindowResize(640);
  const handlePageChange = (page) => {
    onChangeCurrent(page);
  };
  return (
    <div className="flex flex-col overflow-x-auto items-center">
      <Pagination
        layout={isCollapsed ? "table" : "pagination"}
        currentPage={current}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        showIcons
      />
      {!isCollapsed && (
        <div>
          <span className={"font-light text-sm"}>Showing</span> {current}{" "}
          <span className={"font-light text-sm"}>of </span> {totalPages}{" "}
          <span className={"font-light text-sm"}>Pages</span>
        </div>
      )}
    </div>
  );
}

export default CustomPagination;

CustomPagination.propTypes = {
  current: PropTypes.number.isRequired,
  onChangeCurrent: PropTypes.func.isRequired,
  totalPages: PropTypes.number.isRequired,
};
