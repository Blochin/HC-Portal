import CustomDropdown from "../inputs/dropdown/Dropdown";
import { LAYOUT_FULL } from "../inputs/dropdown/trigger/Layout";
import { useContext } from "react";
import { DataContext } from "../../../context/DataContext";
import PropTypes from "prop-types";

const Languages = ({ onChange }) => {
  const { languages } = useContext(DataContext);

  return (
    <div>
      <CustomDropdown
        name={"language_id"}
        isMulti={false}
        withMeta={false}
        data={languages}
        layout={LAYOUT_FULL}
        label={"Language"}
        canAddNew={false}
        onSelect={(name, value) => onChange(name, value.id)}
      />
    </div>
  );
};

Languages.propTypes = {
  onChange: PropTypes.func.isRequired,
};
export default Languages;
