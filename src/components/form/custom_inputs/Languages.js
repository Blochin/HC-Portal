import CustomDropdown from "../inputs/dropdown/Dropdown";
import { LAYOUT_FULL } from "../inputs/dropdown/trigger/Layout";
import { useContext } from "react";
import { DataContext } from "../../../context/DataContext";
import PropTypes from "prop-types";
import { COLOR_FAILURE, COLOR_GRAY } from "../inputs/Colors";

const Languages = ({ onChange, errorMessage }) => {
  const { languages } = useContext(DataContext);

  return (
    <div className={"mb-6"}>
      <CustomDropdown
        name={"language_id"}
        isMulti={false}
        withMeta={false}
        data={languages}
        layout={LAYOUT_FULL}
        label={"Language"}
        canAddNew={false}
        onSelect={(name, value) => onChange(name, value.id)}
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

Languages.propTypes = {
  onChange: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
};
export default Languages;
