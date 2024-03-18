import { useEffect, useState } from "react";
import CustomDropdown from "../inputs/dropdown/Dropdown";
import PropTypes from "prop-types";
import request from "../../../utils/api";

const Tags = ({ defaultValue, onChange }) => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    request.get("api/tags").then((response) => {
      const tags = response.data.data.map((item) => {
        return { value: item.name };
      });
      setTags(tags);
    });
  }, []);

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
