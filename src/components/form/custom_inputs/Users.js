import CustomDropdown from "../inputs/dropdown/Dropdown";
import { LAYOUT_FULL } from "../inputs/dropdown/trigger/Layout";
import { useContext } from "react";
import { DataContext } from "../../../context/DataContext";
import PropTypes from "prop-types";

const Users = ({ onChangeSender, onChangeRecipient }) => {
  const { persons } = useContext(DataContext);
  return (
    <div className={"flex justify-center gap-6 mb-6"}>
      <div className={"w-full"}>
        <CustomDropdown
          name={"sender"}
          isMulti={false}
          withMeta={false}
          layout={LAYOUT_FULL}
          data={persons}
          label={"Sender"}
          canAddNew={true}
          onSelect={(name, value) => {
            onChangeSender(name, value ? value.value : null);
          }}
        />
      </div>
      <div className={"w-full"}>
        <CustomDropdown
          name={"recipient"}
          isMulti={false}
          withMeta={false}
          layout={LAYOUT_FULL}
          data={persons}
          label={"Recipient"}
          canAddNew={true}
          onSelect={(name, value) => {
            onChangeRecipient(name, value ? value.value : null);
          }}
        />
      </div>
    </div>
  );
};

Users.propTypes = {
  onChangeSender: PropTypes.func.isRequired,
  onChangeRecipient: PropTypes.func.isRequired,
};

export default Users;
