import React, { useEffect, useState } from "react";
import { HiTrash } from "react-icons/hi";
import DataGroup from "../inputs/group/DataGroup";
import { Button } from "flowbite-react";
import { v4 as uuid } from "uuid";
import PropTypes from "prop-types";

const DataGroups = ({ defaultValue, onChange }) => {
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
      { id: uuid(), name: "" },
    ]);
  };

  const addPredefinedGroup = () => {
    setDataGroupComponents((prevComponents) => [
      ...prevComponents,
      { id: uuid(), name: "", selectedTab: 0 },
      { id: uuid(), name: "", selectedTab: 1 },
      { id: uuid(), name: "", selectedTab: 2 },
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
      <div className="w-full flex flex-row justify-between mb-6">
        <Button color="light" onClick={addPredefinedGroup}>
          Add PredefinedGroups
        </Button>
        <Button color="green" onClick={addDataGroup}>
          Add Data Group
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
