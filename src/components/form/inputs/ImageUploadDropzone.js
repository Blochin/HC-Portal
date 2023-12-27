import { BiCloudUpload } from "react-icons/bi";
import PropTypes from "prop-types";
import { v4 as uuid } from "uuid";
import React, { useState } from "react";

const ImageUploadDropzone = ({ defaultValue, onSelect, accept }) => {
  const uniqueId = uuid();
  const [image, setImage] = useState(defaultValue ? defaultValue : null);
  const handleDragOver = (event) => {
    event.preventDefault();
  };
  const readFile = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      onSelect(file.name, reader.result);
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const handleDropZone = (event) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      readFile(event.dataTransfer.files[0]);
      event.dataTransfer.clearData();
    }
  };
  const handleFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      readFile(event.target.files[0]);
    }
  };

  return (
    <div className="flex items-center justify-center w-full mb-6">
      <label
        htmlFor={uniqueId}
        onDragOver={handleDragOver}
        onDrop={handleDropZone}
        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
      >
        {image ? (
          <div>
            <img
              src={image}
              alt="Cropped"
              className="w-full h-64 p-1 object-contain"
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <BiCloudUpload color={"gray"} size={32} />
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
        )}

        <input
          id={uniqueId}
          type="file"
          accept={accept}
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
};

ImageUploadDropzone.propTypes = {
  defaultValue: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  accept: PropTypes.string,
};

export default ImageUploadDropzone;
