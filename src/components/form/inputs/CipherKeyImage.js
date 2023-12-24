import ImageUploadDropzone from "./ImageUploadDropzone";
import { DATA_TYPE_IMAGE } from "./group/Types";
import { useState } from "react";
import CustomTextInput from "./TextInput";
import { ToggleSwitch } from "flowbite-react";
import PropTypes from "prop-types";

const CipherKeyImage = ({ onChange, removeComponent }) => {
  const [imageData, setImageData] = useState({
    structure: null,
    has_instructions: false,
    image: null,
  });
  const handleImageUpload = (imageFile) => {
    setImageData({ ...imageData, [DATA_TYPE_IMAGE]: imageFile });
    onChange({ ...imageData, [DATA_TYPE_IMAGE]: imageFile });
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
      <ImageUploadDropzone onSelect={handleImageUpload} />
      <CustomTextInput
        onChange={(name, value) => handleChange(name, value)}
        name={"structure"}
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
  onChange: PropTypes.func.isRequired,
  removeComponent: PropTypes.node,
};
