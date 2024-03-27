import CustomDropdown from "../inputs/dropdown/Dropdown";
import PropTypes from "prop-types";
import useTags from "../../../hooks/useTags";

const Tags = ({ defaultValue, onChange, model }) => {
  const tags = useTags(model);

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
  model: PropTypes.string,
};

export default Tags;
