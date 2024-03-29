import { List, Tooltip } from "flowbite-react";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi";
import React from "react";

const UsedCharsTooltip = () => {
  return (
    <Tooltip
      content={
        <div>
          Used character types, separated with comma.
          <br />
          Legend:
          <List className={"text-gray-400"}>
            <List.Item>l - letters</List.Item>
            <List.Item>s - symbols</List.Item>
            <List.Item>n - numbers</List.Item>
            <List.Item>d - double letters (e.g. tt, ll)</List.Item>
            <List.Item>m - markups</List.Item>
            <List.Item>g - strings</List.Item>
          </List>
        </div>
      }
    >
      <HiOutlineQuestionMarkCircle size={20} className={"text-gray-500 ml-2"} />
    </Tooltip>
  );
};

export default UsedCharsTooltip;
