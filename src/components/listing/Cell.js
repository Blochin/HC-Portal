import { Badge, Table } from "flowbite-react";
import PropTypes from "prop-types";
import { v4 as uuid } from "uuid";
import { truncateDescription } from "../../utils/utils";
import { Link } from "react-router-dom";

const CustomCell = ({ item, model, header, onClick }) => {
  return (
    <Table.Cell className={"text-start"}>
      {renderTableCell(header, model, item, onClick)}
    </Table.Cell>
  );
};

CustomCell.propTypes = {
  item: PropTypes.object,
  model: PropTypes.string,
  header: PropTypes.string,
  onClick: PropTypes.func,
};

function renderTableCell(header, model, item, onClick) {
  const apiModel = model === "cipher_key" ? "cipher-keys" : "cryptograms";
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
          <div className={"hover:underline ml-2 flex flex-col"}>
            <span>
              <Link
                onClick={(event) => {
                  event.stopPropagation();
                }}
                className={"hover:underline"}
                to={`/dashboard/${apiModel}/${item["id"]}`}
              >
                {item[header]}
              </Link>
            </span>
          </div>
        </div>
      );
    case "state":
      return (
        <div
          className={"w-full flex-row flex justify-between gap-2 items-center"}
        >
          <Badge color={setColor(item[header])} className={"w-max"}>
            {item[header]}
          </Badge>
          {item[header] !== "Rejected" && (
            <div
              onClick={onClick}
              className="font-medium text-blue-500 hover:underline dark:text-cyan-500"
            >
              Edit
            </div>
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
