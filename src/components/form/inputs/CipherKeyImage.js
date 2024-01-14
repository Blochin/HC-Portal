import ImageUploadDropzone from "./ImageUploadDropzone";
import { IMAGE_BASE64, IMAGE_LINK } from "./group/Types";
import { useState } from "react";
import CustomTextInput from "./TextInput";
import { ToggleSwitch } from "flowbite-react";
import PropTypes from "prop-types";

const CipherKeyImage = ({ defaultValue, onChange, removeComponent }) => {
  const [imageData, setImageData] = useState({
    structure: defaultValue?.structure ? defaultValue.structure : null,
    has_instructions: defaultValue?.has_instructions
      ? defaultValue.has_instructions
      : false,
    [IMAGE_BASE64]: defaultValue?.image_base64
      ? defaultValue?.image_base64
      : null,
    [IMAGE_LINK]: defaultValue?.image_link ? defaultValue?.image_link : null,
  });
  const handleImageUpload = (name, imageFile) => {
    setImageData({ ...imageData, [IMAGE_BASE64]: imageFile });
    onChange({ ...imageData, [IMAGE_BASE64]: imageFile });
  };

  const handleChange = (name, value) => {
    setImageData((prevImageData) => ({
      ...prevImageData,
      [name]: value,
    }));
    onChange({ ...imageData, [name]: value });
  };

  return (
    <div className="bg-gray-50 rounded border-2 border-dashed border-gray-300 p-5 mb-6">
      <ImageUploadDropzone
        defaultValue={imageData?.image_link}
        onSelect={handleImageUpload}
      />
      <CustomTextInput
        onChange={(name, value) => handleChange(name, value)}
        name={"structure"}
        defaultValue={imageData?.structure}
        label={"Key Structure Of Image"}
        placeholder={"Key Structure Of Image"}
      />
      <ToggleSwitch
        checked={imageData?.has_instructions}
        label={"Has Instructions"}
        onChange={(value) => handleChange("has_instructions", value)}
      />
      {removeComponent}
    </div>
  );
};

export default CipherKeyImage;

CipherKeyImage.propTypes = {
  defaultValue: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  removeComponent: PropTypes.node,
};
