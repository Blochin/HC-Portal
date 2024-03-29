import { List, Tooltip } from "flowbite-react";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi";
import React from "react";

const CompleteStructureTooltip = () => {
  return (
    <Tooltip
      content={
        <div>
          Cipher key structure. Combination of P + C + H, separated with comma.
          P - plain text element type (by size):
          <List className={"text-gray-400"}>
            <List.Item>1 - letters</List.Item>
            <List.Item>2 - bigrams</List.Item>
            <List.Item>3 - trigrams</List.Item>
            <List.Item>V - codes (variable length)</List.Item>
            <List.Item>0 - nulls</List.Item>
            <List.Item>(N - numbers)</List.Item>
          </List>
          C - cipher text element char type:
          <List className={"text-gray-400"}>
            <List.Item>l - letters</List.Item>
            <List.Item>s - symbols</List.Item>
            <List.Item>n - numbers</List.Item>
            <List.Item>d - double letters (e.g. tt, ll)</List.Item>
            <List.Item>m - markups</List.Item>
            <List.Item>g - strings</List.Item>
          </List>
          H - if homophonic:
          <List className={"text-gray-400"}>
            <List.Item>p - partially homophonic</List.Item>
            <List.Item>f - fully homophonic</List.Item>
          </List>
        </div>
      }
    >
      <HiOutlineQuestionMarkCircle size={20} className={"text-gray-500 ml-2"} />
    </Tooltip>
  );
};

export default CompleteStructureTooltip;
