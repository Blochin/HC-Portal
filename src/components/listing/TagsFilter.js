import CustomDropdown from "../form/inputs/dropdown/Dropdown";
import PropTypes from "prop-types";
import useTags from "../../hooks/useTags";
import { COLOR_GRAY_FLOATING } from "../form/inputs/Colors";
import { FLOATING_LAYOUT_DEFAULT } from "../form/inputs/dropdown/trigger/Layout";

const TagsFilter = ({ defaultValue, onChange }) => {
  const tags = useTags();

  const handleChange = (name, values) => {
    const mappedValues = values.map((item) => {
      return item.value;
    });
    onChange(name, mappedValues);
  };

  return (
    <CustomDropdown
      name={"tags"}
      label={"Tags Filter"}
      value={defaultValue}
      layout={FLOATING_LAYOUT_DEFAULT}
      canAddNew={true}
      isMulti={true}
      withMeta={false}
      className={"mb-6"}
      data={tags}
      color={COLOR_GRAY_FLOATING}
      triegger={null}
      onSelect={(name, values) => handleChange(name, values)}
    />
  );
};

TagsFilter.propTypes = {
  defaultValue: PropTypes.array,
  onChange: PropTypes.func.isRequired,
};

export default TagsFilter;
