import React, { useRef, useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import PropTypes from "prop-types";
import ImageUploadDropzone from "./ImageUploadDropzone";
import CustomButton from "./Button";

// eslint-disable-next-line no-unused-vars
const ImageCropper = ({ defaultValue = null, name, onSelect }) => {
  const [image, setImage] = useState(defaultValue);
  const [croppedImage, setCroppedImage] = useState(defaultValue);
  const [acceptCroppedImage, setAcceptCroppedImage] = useState(!!defaultValue);
  const cropperRef = useRef(null);

  const handleFileSelect = (file) => {
    setImage(file);
    onSelect(name, file);
  };

  const onCrop = () => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    setCroppedImage(cropper.getCroppedCanvas().toDataURL());
  };

  return (
    <div className="flex-col">
      {!image && (
        <ImageUploadDropzone onSelect={handleFileSelect} accept={"image"} />
      )}
      <div className="overflow-hidden">
        {image && !acceptCroppedImage && (
          <Cropper
            src={image}
            guides={false}
            ref={cropperRef}
            crop={onCrop}
            className=" max-w-full h-64 border-2 border-gray-300 border-dashed p-1  mb-6"
          />
        )}
      </div>
      {croppedImage && (
        <div className={"mb-6"}>
          <img
            src={croppedImage}
            alt="Cropped"
            className="w-full h-64 border-2 border-gray-300 border-dashed object-contain p-1"
          />
        </div>
      )}
      {croppedImage && (
        <div className={"w-full flex flex-row justify-end"}>
          {!acceptCroppedImage && (
            <CustomButton
              type={"accept"}
              onClick={() => {
                setAcceptCroppedImage(!acceptCroppedImage);
                onSelect(name, croppedImage);
              }}
            >
              <span>Accept Thumbnail</span>
            </CustomButton>
          )}
          {acceptCroppedImage && (
            <CustomButton
              type={"deny"}
              onClick={() => {
                setAcceptCroppedImage(!acceptCroppedImage);
                setImage(null);
                setCroppedImage(null);
                onSelect(name, null);
              }}
            >
              <span>Deny Thumbnail</span>
            </CustomButton>
          )}
        </div>
      )}
    </div>
  );
};

ImageCropper.propTypes = {
  defaultValue: PropTypes.string,
  name: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default ImageCropper;
