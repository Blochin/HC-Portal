import { Table } from "flowbite-react";
import PropTypes from "prop-types";
import { HiArrowDown, HiArrowUp } from "react-icons/hi";
import { HiArrowsUpDown } from "react-icons/hi2";
import { formatLabel } from "../../utils/utils";

const CustomHeaderCell = ({ header, onSort, sortConfig }) => {
  return (
    <Table.HeadCell className={"text-start"}>
      {renderHeaderCell(header, onSort, sortConfig)}
    </Table.HeadCell>
  );
};

CustomHeaderCell.propTypes = {
  header: PropTypes.string,
  onFilterChange: PropTypes.func,
  onSort: PropTypes.func,
  sortConfig: PropTypes.object,
};

function renderHeaderCell(header, onSort, sortConfig) {
  switch (header) {
    case "tags":
    case "edit":
      return null;
    default:
      return (
        <div className={"w-48 flex flex-col items-start"}>
          <div
            onClick={() => onSort(header)}
            className="flex items-center cursor-pointer"
          >
            <span>{formatLabel(header)}</span>
            {sortConfig.key === header ? (
              sortConfig.direction === "ascending" ? (
                <HiArrowUp className={"ml-1"} size={12} />
              ) : (
                <HiArrowDown className={"ml-1"} size={12} />
              )
            ) : (
              <HiArrowsUpDown className={"ml-1"} size={14} />
            )}
          </div>
        </div>
      );
  }
}

export default CustomHeaderCell;
