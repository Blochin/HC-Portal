import React, { useEffect, useRef, useState } from "react";
import { HiTrash } from "react-icons/hi";
import DataGroup from "../inputs/group/DataGroup";
import { Button } from "flowbite-react";
import { v4 as uuid } from "uuid";
import PropTypes from "prop-types";
import { IMAGE_BASE64 } from "../inputs/group/Types";
import { createImageHandler } from "../../../utils/utils";

const DataGroups = ({ defaultValue, onChange }) => {
  const fileInputRef = useRef(null);

  const [dataGroupComponents, setDataGroupComponents] = useState(
    defaultValue ? defaultValue : [],
  );

  const handleGroupData = (id, group, description) => {
    setDataGroupComponents((prevComponents) =>
      prevComponents.map((comp) =>
        comp.id === id ? { id, data: group, description: description } : comp,
      ),
    );
  };

  const addDataGroup = () => {
    setDataGroupComponents((prevComponents) => [
      ...prevComponents,
      { id: uuid(), description: "" },
    ]);
  };

  const addPredefinedGroup = () => {
    setDataGroupComponents((prevComponents) => [
      ...prevComponents,
      { id: uuid(), description: "", selectedTab: 0 },
      { id: uuid(), description: "", selectedTab: 1 },
      { id: uuid(), description: "", selectedTab: 2 },
    ]);
  };

  const removeDataGroup = (id) => {
    setDataGroupComponents((prevComponents) =>
      prevComponents.filter((comp) => comp.id !== id),
    );
  };

  useEffect(() => {
    onChange("groups", JSON.stringify(dataGroupComponents));
  }, [dataGroupComponents]);

  const handleMultipleImages = createImageHandler(
    setDataGroupComponents,
    ({ base64, tempURL }) => ({
      id: uuid(),
      data: [
        {
          type: "image",
          [IMAGE_BASE64]: base64,
          image: { original: tempURL },
        },
      ],
      description: "",
      selectedTab: 2,
    }),
  );

  const openFileSelector = () => {
    fileInputRef.current.click();
  };

  return (
    <div>
      {dataGroupComponents.map(({ id, selectedTab, description, data }) => (
        <div key={id} className="flex flex-col relative">
          <DataGroup
            description={description ? description : ""}
            defaultValue={data}
            selectedTab={selectedTab}
            onChange={(group, description) =>
              handleGroupData(id, group, description)
            }
            removeComponent={
              <HiTrash
                size={24}
                className="rounded-2xl absolute top-1 right-1 p-1 border-1 shadow-lg cursor-pointer"
                onClick={() => removeDataGroup(id)}
              />
            }
          />
        </div>
      ))}
      <div className="w-full flex flex-row justify-between mb-4">
        <Button color="light" onClick={addPredefinedGroup}>
          Add PredefinedGroups
        </Button>
        <Button color="green" onClick={addDataGroup}>
          Add Data Group
        </Button>
      </div>
      <div className={"mb-6"}>
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
  );
};

DataGroups.propTypes = {
  defaultValue: PropTypes.object,
  onChange: PropTypes.func,
};
export default DataGroups;