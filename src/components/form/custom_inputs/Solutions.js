import CustomDropdown from "../inputs/dropdown/Dropdown";
import { useContext } from "react";
import { DataContext } from "../../../context/DataContext";
import PropTypes from "prop-types";

const Solutions = ({ onChange }) => {
  const { solutions } = useContext(DataContext);

  return (
    <div>
      <CustomDropdown
        name={"solution_id"}
        isMulti={false}
        withMeta={false}
        data={solutions}
        label={"Solutions"}
        canAddNew={false}
        onSelect={(name, value) => onChange(name, value.id)}
      />
    </div>
  );
};
Solutions.propTypes = {
  onChange: PropTypes.func.isRequired,
};
export default Solutions;
