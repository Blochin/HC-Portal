import { Table } from "flowbite-react";
import PropTypes from "prop-types";
import CustomTextInput from "../form/inputs/TextInput";
import { HiArrowDown, HiArrowUp } from "react-icons/hi";
import { HiArrowsUpDown } from "react-icons/hi2";

const CustomHeaderCell = ({ header, onFilterChange, onSort, sortConfig }) => {
  return (
    <Table.HeadCell className={"text-start"}>
      {renderHeaderCell(header, onFilterChange, onSort, sortConfig)}
    </Table.HeadCell>
  );
};

CustomHeaderCell.propTypes = {
  header: PropTypes.string,
  onFilterChange: PropTypes.func,
  onSort: PropTypes.func,
  sortConfig: PropTypes.object,
};

function renderHeaderCell(header, onFilterChange, onSort, sortConfig) {
  switch (header) {
    case "edit":
      return null;
    default:
      return (
        <div className={"w-48 flex flex-col items-start"}>
          <CustomTextInput
            size={"sm"}
            type="text"
            defaultValue={""}
            name={header}
            placeholder={`${header}`}
            onChange={(name, value) => onFilterChange(name, value)}
          />
          <div
            onClick={() => onSort(header)}
            className="flex items-center cursor-pointer"
          >
            <span>{header}</span>
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
