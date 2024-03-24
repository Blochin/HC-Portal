import React, { useState, useEffect, forwardRef } from "react";
import PropTypes from "prop-types";
import { Checkbox, Dropdown, Label, TextInput } from "flowbite-react";
import { HiChevronDown, HiSearch } from "react-icons/hi";
import { FLOATING_LAYOUT_DEFAULT, resolveLayoutClass } from "./trigger/Layout";
import BadgeTrigger from "./trigger/BadgeTrigger";
import TextFieldTrigger from "./trigger/TextFieldTrigger";
import { COLOR_GRAY, resolveColorClasses } from "../Colors";

// eslint-disable-next-line react/display-name
const CustomDropdown = forwardRef(
  (
    {
      label = null,
      isRequired,
      name,
      value = undefined,
      layout,
      canAddNew,
      isMulti,
      withMeta,
      data,
      onSelect,
      color = COLOR_GRAY,
      className,
      canRemove = true,
    },
    ref,
  ) => {
    const resolveDefaultSelectedValues = (value, isMulti) => {
      if (isMulti) {
        return Array.isArray(value)
          ? value.filter((item) => item?.value !== undefined)
          : [];
      } else {
        return value?.value !== undefined ? [value] : [];
      }
    };
    const [selectedValues, setSelectedValues] = useState(
      resolveDefaultSelectedValues(value, isMulti),
    );
    const [copyData, setCopyData] = useState(data);
    const [searchQuery, setSearchQuery] = useState("");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [checkboxNewValue, setCheckboxNewValue] = useState(false);

    const layoutClass = resolveLayoutClass(layout);
    const colorClass = resolveColorClasses(color);

    const handleSelect = (selectedItem) => {
      if (
        !selectedValues.some((item) => item.value === selectedItem.value) &&
        selectedItem.value.trim() !== ""
      ) {
        const newSelectedValues = isMulti
          ? [...selectedValues, selectedItem]
          : [selectedItem];
        setSelectedValues(newSelectedValues);
        onSelect(name, isMulti ? newSelectedValues : newSelectedValues[0]);
      }
      setSearchQuery("");
    };

    const handleSearchChange = (event) => {
      setSearchQuery(event.target.value);
    };

    useEffect(() => {
      if (!dropdownOpen) {
        setSearchQuery("");
      }
      setCopyData(data);
      onSelect(name, isMulti ? selectedValues : selectedValues[0]);
    }, [dropdownOpen, data]);

    const handleRemove = (valueToRemove, event) => {
      event.stopPropagation();
      const newSelectedValues = selectedValues.filter(
        (value) => value !== valueToRemove,
      );
      setSelectedValues(newSelectedValues);
      onSelect(name, isMulti ? newSelectedValues : newSelectedValues[0]);
    };

    const handleCheckbox = (event, item) => {
      event.stopPropagation();
      const updatedData = copyData.map((dataItem) => {
        if (dataItem.value === item.value) {
          return { ...dataItem, is_checked: event.target.checked };
        }
        return dataItem;
      });

      setCopyData(updatedData);
    };

    const handleCheckboxNewValue = (event) => {
      setCheckboxNewValue(event.target.checked);
    };

    const filteredData = copyData.filter((item) =>
      item?.value?.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    const reset = () => {
      setSelectedValues(resolveDefaultSelectedValues(undefined, isMulti));
    };

    React.useImperativeHandle(ref, () => ({
      reset: reset,
    }));

    return (
      <div className={`${className} flex flex-col gap-4`}>
        <div>
          {label && layout !== FLOATING_LAYOUT_DEFAULT && (
            <div className="mb-2 block">
              <Label value={label} />
              {isRequired && <span className="ml-1 text-red-500">*</span>}
            </div>
          )}

          <Dropdown
            inline={true}
            className={"overflow-y-auto max-h-48"}
            color={"light"}
            label={label}
            dismissOnClick={true}
            onToggle={() => setDropdownOpen(!dropdownOpen)}
            renderTrigger={() => (
              <div
                className={`flex items-center justify-between ${colorClass} text-sm ${layoutClass} focus:ring-blue-500 focus:border-blue-500 block w-full `}
              >
                {isMulti ? (
                  <BadgeTrigger
                    isRequired={isRequired}
                    selectedValues={selectedValues}
                    label={label}
                    handleRemove={canRemove ? handleRemove : null}
                  />
                ) : (
                  <TextFieldTrigger
                    isRequired={isRequired}
                    selectedValues={selectedValues}
                    label={label}
                    handleRemove={canRemove ? handleRemove : null}
                  />
                )}
                <span>
                  <HiChevronDown size={16} />
                </span>
              </div>
            )}
          >
            <Dropdown.Header className={"sticky top-0 bg-white z-10"}>
              <TextInput
                onKeyDown={(event) => event.stopPropagation()}
                icon={HiSearch}
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder={"Search"}
              />
            </Dropdown.Header>
            {filteredData
              .filter((item) => !selectedValues.includes(item))
              .map((item, index) => (
                <Dropdown.Item key={index} onClick={() => handleSelect(item)}>
                  <div className={"w-full flex justify-between"}>
                    <span>{item.value}</span>
                    {withMeta && (
                      <span
                        className={"flex flex-row items-center gap-1"}
                        onClick={(event) => handleCheckbox(event, item)}
                      >
                        <span>Is Main User</span>
                        <Checkbox checked={item.is_checked || false} />
                      </span>
                    )}
                  </div>
                </Dropdown.Item>
              ))}
            {canAddNew && (
              <>
                <Dropdown.Divider />
                <Dropdown.Item
                  onClick={() =>
                    handleSelect({
                      value: searchQuery,
                      is_checked: checkboxNewValue,
                    })
                  }
                >
                  <div className={"w-full flex justify-between"}>
                    <span className={"text-blue-600 text-sm"}>+ Add New</span>
                    {withMeta && (
                      <span
                        onClick={(event) => event.stopPropagation()}
                        className={"flex flex-row items-center gap-1"}
                      >
                        <span>Is Main User</span>

                        <Checkbox
                          onChange={handleCheckboxNewValue}
                          checked={checkboxNewValue}
                        />
                      </span>
                    )}
                  </div>
                </Dropdown.Item>
              </>
            )}
          </Dropdown>
        </div>
      </div>
    );
  },
);

CustomDropdown.propTypes = {
  label: PropTypes.string,
  isRequired: PropTypes.bool,
  name: PropTypes.string.isRequired,
  value: PropTypes.object,
  layout: PropTypes.string,
  size: PropTypes.string,
  canAddNew: PropTypes.bool.isRequired,
  isMulti: PropTypes.bool.isRequired,
  withMeta: PropTypes.bool.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelect: PropTypes.func.isRequired,
  color: PropTypes.string,
  className: PropTypes.string,
  canRemove: PropTypes.bool,
};

export default CustomDropdown;
