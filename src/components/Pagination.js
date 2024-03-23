"use client";

import { Pagination } from "flowbite-react";
import PropTypes from "prop-types";
import useWindowResize from "../hooks/useWindowsResize";

function CustomPagination({ current, onChangeCurrent, totalPages }) {
  const isCollapsed = useWindowResize(640);

  const handlePageChange = (page) => {
    onChangeCurrent(page);
  };

  const isFirstPage = current === 1;
  const isLastPage = current === totalPages;

  return (
    <div className="flex flex-col overflow-x-auto items-center">
      <div className={"flex flex-row justify-center gap-3 items-center"}>
        <div
          className={`hidden md:flex text-gray-500 border p-1.5 mt-2 border-gray-300 rounded-lg cursor-pointer ${
            isFirstPage
              ? "opacity-50 pointer-events-none"
              : "hover:bg-gray-100 hover:text-gray-700"
          }`}
          onClick={() => {
            onChangeCurrent(1);
          }}
        >
          First
        </div>
        <Pagination
          layout={isCollapsed ? "table" : "pagination"}
          currentPage={current}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          showIcons
        />
        <div
          className={`hidden md:flex text-gray-500 border p-1.5 mt-2 border-gray-300 rounded-lg cursor-pointer ${
            isLastPage
              ? "opacity-50 pointer-events-none"
              : "hover:bg-gray-100 hover:text-gray-700"
          }`}
          onClick={() => {
            handlePageChange(totalPages);
          }}
        >
          Last
        </div>
      </div>
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
