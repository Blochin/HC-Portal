import React, { useState } from "react";
import Data from "components/form/inputs/group/Data";
import { Button } from "flowbite-react";
import PropTypes from "prop-types";
import { v4 as uuid } from "uuid";
import CustomTextInput from "components/form/inputs/TextInput";

const DataGroup = ({
  description,
  defaultValue,
  selectedTab,
  onChange,
  removeComponent,
}) => {
  const [dataComponents, setDataComponents] = useState(
    defaultValue ? defaultValue : [{ id: uuid() }],
  );
  const [groupDescription, setGroupDescription] = useState(description);

  const handleDataChange = (id, newData) => {
    setDataComponents((prevComponents) => {
      const updatedComponents = prevComponents.map((comp) =>
        comp.id === id ? { ...comp, ...newData } : comp,
      );

      onChange(updatedComponents, groupDescription);
      return updatedComponents;
    });
  };

  const addData = () => {
    setDataComponents((prevComponents) => [...prevComponents, { id: uuid() }]);
  };

  const removeData = (id) => {
    const filteredComponents = dataComponents.filter((comp) => comp.id !== id);
    onChange(filteredComponents, groupDescription);
    setDataComponents(filteredComponents);
  };

  return (
    <div className="bg-gray-50 rounded border-2 border-dashed border-gray-300 p-5 mb-6">
      <CustomTextInput
        defaultValue={groupDescription}
        name="description"
        label={"Group Description"}
        placeholder="Group Description"
        onChange={(name, value) => {
          setGroupDescription(value);
          onChange(dataComponents, value);
        }}
      />
      <div className="bg-gray-100 rounded border-2 border-dashed border-gray-300 p-5">
        {dataComponents.map((component) => (
          <React.Fragment key={component.id}>
            <div className={"flex w-full justify-center mb-6"}>
              <Data
                selectedTab={selectedTab}
                defaultValue={component}
                key={component.id}
                onChange={(newData) => handleDataChange(component.id, newData)}
                removeComponent={
                  <Button
                    color={"red"}
                    onClick={() => removeData(component.id)}
                  >
                    Confirm Remove Data
                  </Button>
                }
              />
            </div>
          </React.Fragment>
        ))}
        {removeComponent}
        <Button color={"green"} onClick={addData}>
          Add Data
        </Button>
      </div>
    </div>
  );
};

DataGroup.propTypes = {
  description: PropTypes.string,
  defaultValue: PropTypes.object,
  onChange: PropTypes.func,
  selectedTab: PropTypes.number,
  removeComponent: PropTypes.node,
};

export default DataGroup;
