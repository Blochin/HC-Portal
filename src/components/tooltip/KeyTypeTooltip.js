import { List, Tooltip } from "flowbite-react";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi";
import React from "react";

const KeyTypeTooltip = () => {
  return (
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
      <HiOutlineQuestionMarkCircle size={20} className={"text-gray-500"} />
    </Tooltip>
  );
};

export default KeyTypeTooltip;
