import { useContext } from "react";
import { DataContext } from "context/DataContext";
import CustomDropdown from "../inputs/dropdown/Dropdown";
import PropTypes from "prop-types";

const Tags = ({ defaultValue, onChange }) => {
  const { tags } = useContext(DataContext);

  const handleChange = (name, values) => {
    const mappedValues = values.map((item) => {
      return item.value;
    });
    onChange(name, mappedValues);
  };

  return (
    <CustomDropdown
      name={"tags"}
      label={"Tags"}
      value={defaultValue}
      layout={"full"}
      canAddNew={true}
      isMulti={true}
      withMeta={false}
      className={"mb-6"}
      data={tags}
      onSelect={(name, values) => handleChange(name, values)}
    />
  );
};

Tags.propTypes = {
  defaultValue: PropTypes.array,
  onChange: PropTypes.func.isRequired,
};

export default Tags;
