import React, { useRef, useState } from "react";
import Data from "components/form/inputs/group/Data";
import { Button } from "flowbite-react";
import PropTypes from "prop-types";
import { v4 as uuid } from "uuid";
import CustomTextInput from "components/form/inputs/TextInput";
import { createImageHandler } from "../../../../utils/utils";
import { IMAGE_BASE64 } from "./Types";

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
  const fileInputRef = useRef(null);

  const handleDataChange = (id, newData) => {
    setDataComponents((prevComponents) => {
      const updatedComponents = prevComponents.map((comp) =>
        comp.id === id ? { ...comp, ...newData } : comp,
      );
      console.log(updatedComponents);
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

  const handleMultipleImages = createImageHandler(
    setDataComponents,
    ({ base64, tempURL, fileName }) => ({
      id: uuid(),
      type: "image",
      title: fileName,
      [IMAGE_BASE64]: base64,
      image: { original: tempURL },
    }),
  );
  const openFileSelector = () => {
    fileInputRef.current.click();
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
        <div className={"flex flex-row justify-between mb-6"}>
          <div>
            <Button color={"green"} onClick={addData}>
              Add Data
            </Button>
          </div>
          <div>
            <input
              type="file"
              multiple
              accept="image/*"
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={handleMultipleImages}
            />
            <Button color="light" onClick={openFileSelector}>
              Add More Images
            </Button>
          </div>
        </div>
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
