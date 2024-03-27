import { Badge, Button, Table } from "flowbite-react";
import PropTypes from "prop-types";
import { v4 as uuid } from "uuid";
import { truncateDescription } from "../../utils/utils";

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
    case "tags":
      return null;
    case "users":
      return (
        <div className="w-max flex flex-wrap">
          {item[header]?.map((user) => {
            return (
              <div key={uuid()} className={"mt-0.5 ml-0.5"}>
                <Badge color="light">{user}</Badge>
              </div>
            );
          })}
        </div>
      );
    case "name":
      return (
        <div className={"w-max flex flex-row items-center"}>
          <img
            className={"w-10 h-10 rounded-full object-fill"}
            src={item["thumb"] ? item["thumb"] : "/missing_image.jpeg"}
          />
          <span className={"ml-2"}>{item[header]}</span>
        </div>
      );
    case "state":
      return (
        <div
          className={"w-max flex-row flex justify-between gap-2 items-center"}
        >
          <Badge color={setColor(item[header])} className={"w-max"}>
            {item[header]}
          </Badge>
          {item[header] !== "Rejected" && (
            <Button size={"xs"} className={"w-max"} onClick={onClick}>
              Edit
            </Button>
          )}
        </div>
      );
    case "edit":
      return null;
    default:
      return (
        <div className={"w-max"}>
          {item[header]?.length
            ? truncateDescription(item[header], 50)
            : item[header]}
        </div>
      );
  }
}

const setColor = (value) => {
  switch (value) {
    case "Approved":
      return "success";

    case "Rejected":
      return "failure";

    case "Revise":
      return "warning";

    case "Awaiting":
      return "info";

    default:
      return "light";
  }
};

export default CustomCell;
