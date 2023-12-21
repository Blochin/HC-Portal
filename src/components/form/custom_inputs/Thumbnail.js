import ImageCrop from "components/form/inputs/ImageCrop";
import { useState } from "react";
import CustomTextInput from "components/form/inputs/TextInput";
import PropTypes from "prop-types";

const Thumbnail = ({ name, defaultValue, urlName, onSelect }) => {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);
  const handleImage = (name, value) => {
    setImage(value);
    setUrl(null);
    onSelect(name, value);
  };

  const handleUrl = (name, value) => {
    setUrl(value);
    setImage(null);
    onSelect(name, value);
  };
  return (
    <div>
      {!url && (
        <ImageCrop
          name={name}
          onSelect={(name, value) => handleImage(name, value)}
        />
      )}

      {!image && (
        <CustomTextInput
          defaultValue={defaultValue}
          onChange={(name, value) => handleUrl(name, value)}
          name={urlName}
          label={"Thumbnail Url"}
          placeholder={"Thumbnail Url"}
        />
      )}
    </div>
  );
};

Thumbnail.propTypes = {
  defaultValue: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  urlName: PropTypes.string.isRequired,
};
export default Thumbnail;
