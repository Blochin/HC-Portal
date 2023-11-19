import React, { useEffect, useState } from "react";
import { Tabs } from "flowbite-react";
import { HiCloud, HiDocumentText, HiLink, HiTrash } from "react-icons/hi";
import PropTypes from "prop-types";
import CustomTextInput from "components/form/inputs/TextInput";
import CustomTextArea from "components/form/inputs/TextArea";
import ImageUploadDropzone from "components/form/inputs/ImageUploadDropzone";
import { DATA_TYPE_IMAGE, DATA_TYPE_LINK, DATA_TYPE_TEXT } from "./Types";

const Data = ({ selectedTab, removeComponent, onChange }) => {
  const [activeTab, setActiveTab] = useState(selectedTab ? selectedTab : 0);
  const [textAreaData, setTextAreaData] = useState({
    title: "",
    type: DATA_TYPE_TEXT,
    text: "",
  });
  const [linkData, setLinkData] = useState({
    title: "",
    type: DATA_TYPE_LINK,
    link: "",
  });
  const [imageData, setImageData] = useState({
    title: "",
    type: DATA_TYPE_IMAGE,
    image: null,
  });

  const handleTextAreaChange = (name, value) => {
    setTextAreaData({ ...textAreaData, type: DATA_TYPE_TEXT, [name]: value });
  };

  const handleLinkChange = (name, value) => {
    setLinkData({ ...linkData, type: DATA_TYPE_LINK, [name]: value });
  };

  const handleImageChange = (name, value) => {
    setImageData({ ...imageData, type: DATA_TYPE_IMAGE, [name]: value });
  };

  const handleImageUpload = (imageFile) => {
    setImageData({ ...imageData, [DATA_TYPE_IMAGE]: imageFile });
  };

  useEffect(() => {
    if (activeTab === 0) onChange(textAreaData);
    if (activeTab === 1) onChange(linkData);
    if (activeTab === 2) onChange(imageData);
    if (activeTab === 3) onChange(null);
  }, [textAreaData, linkData, imageData, activeTab]);

  return (
    <div className={"w-full"}>
      <Tabs
        color={"light"}
        aria-label="Default tabs"
        onActiveTabChange={(value) => setActiveTab(value)}
      >
        <Tabs.Item active={activeTab === 0} title="Text" icon={HiDocumentText}>
          <CustomTextInput
            name={"title"}
            label={"Title"}
            placeholder={"Title"}
            onChange={(name, value) => handleTextAreaChange(name, value)}
          />
          <CustomTextArea
            name={DATA_TYPE_TEXT}
            label={"Text"}
            placeholder={"Your text..."}
            onChange={(name, value) => handleTextAreaChange(name, value)}
          />
        </Tabs.Item>
        <Tabs.Item active={activeTab === 1} title="Link" icon={HiLink}>
          <CustomTextInput
            onChange={(name, value) => handleLinkChange(name, value)}
            name={"title"}
            label={"Title"}
            placeholder={"Title"}
          />
          <CustomTextInput
            onChange={(name, value) => handleLinkChange(name, value)}
            name={DATA_TYPE_LINK}
            label={"Link"}
            placeholder={"Link"}
          />
        </Tabs.Item>
        <Tabs.Item active={activeTab === 2} title="Image" icon={HiCloud}>
          <CustomTextInput
            onChange={(name, value) => handleImageChange(name, value)}
            name={"title"}
            label={"Title"}
            placeholder={"Title"}
          />
          <ImageUploadDropzone onSelect={handleImageUpload} />
        </Tabs.Item>
        <Tabs.Item active={activeTab === 3} title="Remove" icon={HiTrash}>
          {removeComponent}
        </Tabs.Item>
      </Tabs>
    </div>
  );
};

Data.propTypes = {
  removeComponent: PropTypes.node,
  selectedTab: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};

export default Data;
