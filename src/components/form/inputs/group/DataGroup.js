import React, { useState } from "react";
import Data from "components/form/inputs/group/Data";
import { Button } from "flowbite-react";
import PropTypes from "prop-types";
import { v4 as uuid } from "uuid";
import CustomTextInput from "components/form/inputs/TextInput";

const DataGroup = ({ selectedTab, onChange, removeComponent }) => {
  const [dataComponents, setDataComponents] = useState([{ id: uuid() }]);
  const [groupDescription, setGroupDescription] = useState("");

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
    setDataComponents((prevComponents) =>
      prevComponents.filter((comp) => comp.id !== id),
    );
  };

  return (
    <div className="bg-gray-50 rounded border-2 border-dashed border-gray-300 p-5 mb-6">
      <CustomTextInput
        name="description"
        label={"Group Description"}
        placeholder="Group Description"
        onChange={(name, value) => {
          setGroupDescription(value);
          onChange(dataComponents, value);
        }}
      />
      <div className="bg-gray-100 rounded border-2 border-dashed border-gray-300 p-5">
        {dataComponents.map(({ id }) => (
          <React.Fragment key={id}>
            <div className={"flex w-full justify-center mb-6"}>
              <Data
                selectedTab={selectedTab}
                key={id}
                onChange={(newData) => handleDataChange(id, newData)}
                removeComponent={
                  <Button color={"red"} onClick={() => removeData(id)}>
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
  onChange: PropTypes.func,
  selectedTab: PropTypes.number,
  removeComponent: PropTypes.node,
};

export default DataGroup;
