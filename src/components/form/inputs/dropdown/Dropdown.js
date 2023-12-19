import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Checkbox, Dropdown, Label, TextInput } from "flowbite-react";
import { HiArrowDown, HiSearch } from "react-icons/hi";
import { resolveLayoutClass } from "./trigger/Layout";
import BadgeTrigger from "./trigger/BadgeTrigger";
import TextFieldTrigger from "./trigger/TextFieldTrigger";
import { COLOR_GRAY, resolveColorClasses } from "../Colors";

const CustomDropdown = ({
  label,
  name,
  value = "",
  layout,
  canAddNew,
  isMulti,
  withMeta,
  data,
  onSelect,
  color = COLOR_GRAY,
}) => {
  const [selectedValues, setSelectedValues] = useState(
    value === "" ? [] : [value],
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

  return (
    <div className="flex flex-col gap-4">
      <div>
        <div className="mb-2 block">
          <Label value={label} />
        </div>
        <Dropdown
          inline={true}
          color={"light"}
          label={label}
          dismissOnClick={true}
          onToggle={() => setDropdownOpen(!dropdownOpen)}
          renderTrigger={() => (
            <div
              className={`flex items-center justify-between ${colorClass} text-sm ${layoutClass} focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
            >
              {isMulti ? (
                <BadgeTrigger
                  selectedValues={selectedValues}
                  label={label}
                  handleRemove={handleRemove}
                />
              ) : (
                <TextFieldTrigger
                  selectedValues={selectedValues}
                  label={label}
                  handleRemove={handleRemove}
                />
              )}
              <span>
                <HiArrowDown />
              </span>
            </div>
          )}
        >
          <Dropdown.Header>
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
            .slice(0, 15)
            .map((item, index) => (
              <Dropdown.Item key={index} onClick={() => handleSelect(item)}>
                <div className={"w-full flex justify-between"}>
                  <span>{item.value}</span>
                  {withMeta && (
                    <span onClick={(event) => handleCheckbox(event, item)}>
                      <Checkbox checked={item.is_checked || false} />
                    </span>
                  )}
                </div>
              </Dropdown.Item>
            ))}
          {canAddNew && (
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
                  <span onClick={(event) => event.stopPropagation()}>
                    <Checkbox
                      onChange={handleCheckboxNewValue}
                      checked={checkboxNewValue}
                    />
                  </span>
                )}
              </div>
            </Dropdown.Item>
          )}
        </Dropdown>
      </div>
    </div>
  );
};

CustomDropdown.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  layout: PropTypes.string,
  size: PropTypes.string,
  canAddNew: PropTypes.bool.isRequired,
  isMulti: PropTypes.bool.isRequired,
  withMeta: PropTypes.bool.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelect: PropTypes.func.isRequired,
  color: PropTypes.string,
};

export default CustomDropdown;
