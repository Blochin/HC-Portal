import React, { useContext } from "react";
import { DataContext } from "../../../context/DataContext";
import CustomDropdown from "../inputs/dropdown/Dropdown";
import PropTypes from "prop-types";
import { List, Tooltip } from "flowbite-react";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi";

const KeyTypes = ({ onChange, defaultValue, errorMessage }) => {
  const { keyTypes } = useContext(DataContext);
  return (
    <div className={"mb-6"}>
      <CustomDropdown
        isMulti={false}
        value={{ id: defaultValue?.id, value: defaultValue?.name }}
        withMeta={false}
        isRequired={true}
        data={keyTypes}
        name={"key_type"}
        label={"Key Type"}
        canAddNew={false}
        color={errorMessage ? "failure" : "gray"}
        onSelect={(name, value) => onChange(name, value?.id ?? null)}
        tooltip={
          <Tooltip
            content={
              <div>
                Key Type:
                <List className={"text-gray-400"}>
                  <List.Item>e - Encryption</List.Item>
                  <List.Item>d - Decryption</List.Item>
                  <List.Item>e/d - Encryption/Decryption</List.Item>
                </List>
              </div>
            }
          >
            <HiOutlineQuestionMarkCircle
              size={20}
              className={"text-gray-500"}
            />
          </Tooltip>
        }
      />
      {errorMessage ? (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
          <span className="font-medium">{errorMessage}</span>
        </p>
      ) : null}
    </div>
  );
};

export default KeyTypes;

KeyTypes.propTypes = {
  onChange: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  defaultValue: PropTypes.object,
};
