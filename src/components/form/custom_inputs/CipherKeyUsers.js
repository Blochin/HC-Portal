import CustomDropdown from "../inputs/dropdown/Dropdown";
import { LAYOUT_FULL } from "../inputs/dropdown/trigger/Layout";
import { useContext } from "react";
import { DataContext } from "../../../context/DataContext";
import PropTypes from "prop-types";

const CryptogramUsers = ({ defaultValue, onChange }) => {
  const { persons } = useContext(DataContext);

  const handleSelect = (name, values) => {
    if (!values) {
      onChange(name, null);
      return;
    }
    const mappedValues = values.map((value) => {
      return {
        name: value.value,
        is_main_user: !!value?.is_checked,
      };
    });

    onChange(name, JSON.stringify(mappedValues));
  };

  return (
    <div className={"flex justify-center gap-6 mb-6"}>
      <div className={"w-full"}>
        <CustomDropdown
          name={"users"}
          isMulti={true}
          withMeta={true}
          value={defaultValue?.map((value) => {
            return {
              value: value?.person?.name,
              is_checked: Boolean(value?.is_main_user),
            };
          })}
          layout={LAYOUT_FULL}
          data={persons}
          label={"Users"}
          canAddNew={true}
          onSelect={(name, values) => {
            handleSelect(name, values);
          }}
        />
      </div>
    </div>
  );
};

CryptogramUsers.propTypes = {
  defaultValue: PropTypes.object,
  onChange: PropTypes.func.isRequired,
};

export default CryptogramUsers;
