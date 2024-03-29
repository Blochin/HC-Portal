import CipherKeyImage from "../inputs/CipherKeyImage";
import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { HiTrash } from "react-icons/hi";
import { Button } from "flowbite-react";
import { v4 as uuid } from "uuid";
import { IMAGE_BASE64, IMAGE_LINK } from "../inputs/group/Types";
import { createImageHandler } from "../../../utils/utils";

const CipherKeyImages = ({ onChange, getThumbnail, defaultValue }) => {
  const fileInputRef = useRef(null);
  const [imagesComponents, setImagesComponents] = useState(
    defaultValue
      ? defaultValue.map((item) => ({
          id: uuid(),
          structure: item.structure,
          has_instructions: item.has_instructions,
          [IMAGE_BASE64]: null,
          [IMAGE_LINK]: item.url?.original || null,
        }))
      : [],
  );

  const handleImageComponent = (id, image) => {
    setImagesComponents((prevComponents) =>
      prevComponents.map((comp) =>
        comp.id === id
          ? {
              id: id,
              structure: image?.structure,
              has_instructions: image?.has_instructions,
              [IMAGE_BASE64]: image?.image_base64,
              [IMAGE_LINK]: image?.image_link,
            }
          : comp,
      ),
    );
  };

  useEffect(() => {
    getThumbnail(imagesComponents?.[0]?.[IMAGE_BASE64]);
  }, [imagesComponents]);

  const addImageComponent = () => {
    setImagesComponents((prevComponents) => [
      ...prevComponents,
      {
        id: uuid(),
        structure: null,
        has_instructions: false,
        [IMAGE_BASE64]: null,
        [IMAGE_LINK]: null,
      },
    ]);
  };

  const removeImageComponent = (id) => {
    setImagesComponents((prevComponents) =>
      prevComponents.filter((comp) => comp.id !== id),
    );
  };

  useEffect(() => {
    onChange("images", JSON.stringify(imagesComponents));
  }, [imagesComponents]);

  const handleMultipleImages = createImageHandler(
    setImagesComponents,
    ({ base64, tempURL }) => ({
      id: uuid(),
      structure: null,
      has_instructions: false,
      [IMAGE_BASE64]: base64,
      [IMAGE_LINK]: tempURL,
    }),
  );

  const openFileSelector = () => {
    fileInputRef.current.click();
  };

  return (
    <div>
      {imagesComponents.map(
        ({
          id,
          structure,
          has_instructions,
          [IMAGE_BASE64]: imageBase64,
          [IMAGE_LINK]: imageLink,
        }) => (
          <div key={id} className="flex flex-col relative">
            <CipherKeyImage
              defaultValue={{
                structure,
                has_instructions,
                image_base64: imageBase64,
                image_link: imageLink,
              }}
              onChange={(image) => handleImageComponent(id, image)}
              removeComponent={
                <HiTrash
                  size={24}
                  className="rounded-2xl absolute top-1 right-1 p-1 border-1 shadow-lg cursor-pointer"
                  onClick={() => removeImageComponent(id)}
                />
              }
            />
          </div>
        ),
      )}
      <div className="w-full flex flex-row justify-between mb-6">
        <input
          type="file"
          multiple
          accept="image/*"
          style={{ display: "none" }}
          ref={fileInputRef}
          onChange={handleMultipleImages}
        />
        <Button color="light" onClick={openFileSelector}>
          Add Images At Once
        </Button>
        <Button color="green" onClick={addImageComponent}>
          Add Image
        </Button>
      </div>
    </div>
  );
};

export default CipherKeyImages;

CipherKeyImages.propTypes = {
  onChange: PropTypes.func.isRequired,
  getThumbnail: PropTypes.func,
  defaultValue: PropTypes.arrayOf(PropTypes.object), // Adjusted PropTypes
};
