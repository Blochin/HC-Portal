import React, { useEffect, useState } from "react";
import { Tabs } from "flowbite-react";
import { HiCloud, HiDocumentText, HiLink, HiTrash } from "react-icons/hi";
import PropTypes from "prop-types";
import CustomTextInput from "components/form/inputs/TextInput";
import CustomTextArea from "components/form/inputs/TextArea";
import ImageUploadDropzone from "components/form/inputs/ImageUploadDropzone";
import {
  DATA_TYPE_IMAGE,
  DATA_TYPE_LINK,
  DATA_TYPE_TEXT,
  IMAGE_BASE64,
  IMAGE_LINK,
} from "./Types";

const Data = ({ selectedTab, defaultValue, removeComponent, onChange }) => {
  const resolveSelectedTab = (defaultData) => {
    if (!defaultData) {
      return 0;
    }
    if (defaultData[0].type === "text") {
      return 0;
    } else if (defaultData[0].type === "link") {
      return 1;
    } else if (defaultData[0].type === "image") {
      return 2;
    }
    return 0;
  };

  const [activeTab, setActiveTab] = useState(
    selectedTab ? selectedTab : resolveSelectedTab(defaultValue),
  );
  const [textAreaData, setTextAreaData] = useState({
    title:
      defaultValue && defaultValue[0].type === "text"
        ? defaultValue[0].title
        : "",
    type: DATA_TYPE_TEXT,
    text:
      defaultValue && defaultValue[0].type === "text"
        ? defaultValue[0].text
        : "",
  });
  const [linkData, setLinkData] = useState({
    title:
      defaultValue && defaultValue[0].type === "link"
        ? defaultValue[0].title
        : "",
    type: DATA_TYPE_LINK,
    link:
      defaultValue && defaultValue[0].type === "link"
        ? defaultValue[0].link
        : "",
  });
  const [imageData, setImageData] = useState({
    title:
      defaultValue && defaultValue[0].type === "image"
        ? defaultValue[0].title
        : "",
    type: DATA_TYPE_IMAGE,
    [IMAGE_BASE64]:
      defaultValue && defaultValue[0].type === "image"
        ? defaultValue[0]?.image_base64
        : "",
    [IMAGE_LINK]:
      defaultValue && defaultValue[0].type === "image"
        ? defaultValue[0]?.image?.original
        : "",
  });

  console.log(defaultValue);

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
    setImageData({ ...imageData, [IMAGE_BASE64]: imageFile });
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
            defaultValue={textAreaData.title}
            name={"title"}
            label={"Title"}
            placeholder={"Title"}
            onChange={(name, value) => handleTextAreaChange(name, value)}
          />
          <CustomTextArea
            name={DATA_TYPE_TEXT}
            defaultValue={textAreaData.text}
            label={"Text"}
            placeholder={"Your text..."}
            onChange={(name, value) => handleTextAreaChange(name, value)}
          />
        </Tabs.Item>
        <Tabs.Item active={activeTab === 1} title="Link" icon={HiLink}>
          <CustomTextInput
            defaultValue={linkData.title}
            onChange={(name, value) => handleLinkChange(name, value)}
            name={"title"}
            label={"Title"}
            placeholder={"Title"}
          />
          <CustomTextInput
            defaultValue={linkData.link}
            onChange={(name, value) => handleLinkChange(name, value)}
            name={DATA_TYPE_LINK}
            label={"Link"}
            placeholder={"Link"}
          />
        </Tabs.Item>
        <Tabs.Item active={activeTab === 2} title="Image" icon={HiCloud}>
          <CustomTextInput
            defaultValue={imageData.title}
            onChange={(name, value) => handleImageChange(name, value)}
            name={"title"}
            label={"Title"}
            placeholder={"Title"}
          />
          <ImageUploadDropzone
            defaultValue={imageData.image_link}
            onSelect={handleImageUpload}
          />
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
  defaultValue: PropTypes.object,
  selectedTab: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};

export default Data;
