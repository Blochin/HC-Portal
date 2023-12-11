import { Badge, Table } from "flowbite-react";
import PropTypes from "prop-types";

const General = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <Table striped>
        <Table.Head>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Value</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              Main Category
            </Table.Cell>
            <Table.Cell>{data.category.name}</Table.Cell>
          </Table.Row>
          {data.category.children.length > 0 && (
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                Sub Category
              </Table.Cell>
              <Table.Cell>
                <div className={"flex flex-wrap gap-1"}>
                  {data.category.children.map((subCategory, index) => (
                    <Badge color={"light"} key={index}>
                      {subCategory.name}
                    </Badge>
                  ))}
                </div>
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </div>
  );
};

General.propTypes = {
  data: PropTypes.array.isRequired,
};

export default General;
