import CustomDropdown from "../inputs/dropdown/Dropdown";
import { useContext } from "react";
import { DataContext } from "../../../context/DataContext";
import PropTypes from "prop-types";
import { COLOR_FAILURE, COLOR_GRAY } from "../inputs/Colors";

const Solutions = ({ defaultValue, onChange, errorMessage }) => {
  const { solutions } = useContext(DataContext);

  return (
    <div className={"mb-6"}>
      <CustomDropdown
        name={"solution_id"}
        isMulti={false}
        isRequired={true}
        withMeta={false}
        data={solutions}
        value={
          defaultValue ? { id: defaultValue.id, value: defaultValue.name } : ""
        }
        label={"Solutions"}
        canAddNew={false}
        onSelect={(name, value) => onChange(name, value ? value.id : null)}
        color={errorMessage ? COLOR_FAILURE : COLOR_GRAY}
      />
      {errorMessage ? (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
          <span className="font-medium">{errorMessage}</span>
        </p>
      ) : null}
    </div>
  );
};
Solutions.propTypes = {
  defaultValue: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
};
export default Solutions;
