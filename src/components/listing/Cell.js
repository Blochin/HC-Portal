import { Badge, Button, Table } from "flowbite-react";
import PropTypes from "prop-types";

const CustomCell = ({ item, header, onClick }) => {
  return (
    <Table.Cell className={"text-start"}>
      {renderTableCell(header, item, onClick)}
    </Table.Cell>
  );
};

CustomCell.propTypes = {
  item: PropTypes.object,
  header: PropTypes.string,
  onClick: PropTypes.func,
};

function renderTableCell(header, item, onClick) {
  switch (header) {
    case "name":
      return (
        <div className={"flex flex-row items-center"}>
          <img
            className={"w-16 h-16 rounded-full object-fill"}
            src={item["thumb"]}
          />
          <span className={"ml-2"}>{item[header]}</span>
        </div>
      );
    case "state":
      return (
        <Badge color={"light"} className={"w-max"}>
          {item[header]}
        </Badge>
      );
    case "edit":
      return (
        <Button size={"xs"} className={"w-max"} onClick={onClick}>
          Edit
        </Button>
      );
    default:
      return item[header];
  }
}

export default CustomCell;
