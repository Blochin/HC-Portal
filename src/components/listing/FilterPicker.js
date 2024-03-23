import { useEffect, useState } from "react";
import { Checkbox, Table } from "flowbite-react";
import PropTypes from "prop-types";
import { formatLabel } from "../../utils/utils";

// eslint-disable-next-line no-unused-vars
const FilterPicker = ({ headers, onSelect }) => {
  const [selectedHeaders, setSelectedHeaders] = useState(headers);
  const handleSelect = (header) => {
    setSelectedHeaders((prevHeaders) => {
      return prevHeaders.map((prevHeader) =>
        prevHeader.value === header.value
          ? { ...prevHeader, is_checked: !header.is_checked }
          : prevHeader,
      );
    });
  };

  useEffect(() => {
    onSelect(selectedHeaders);
  }, [selectedHeaders]);

  return (
    <div className="overflow-x-auto">
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Column Name</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {selectedHeaders?.map((item, index) => {
            return (
              <Table.Row key={index}>
                <Table.Cell className="flex items-center">
                  <Checkbox
                    onClick={() => handleSelect(item)}
                    className={"cursor-pointer mr-3"}
                    checked={item.is_checked}
                  />
                  <span>{formatLabel(item.value)}</span>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
};

FilterPicker.propTypes = {
  headers: PropTypes.array,
  onSelect: Promise.function,
};
export default FilterPicker;
