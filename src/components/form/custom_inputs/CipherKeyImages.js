import CipherKeyImage from "../inputs/CipherKeyImage";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { HiTrash } from "react-icons/hi";
import { Button } from "flowbite-react";
import { v4 as uuid } from "uuid";

// eslint-disable-next-line react/prop-types
const CipherKeyImages = ({ onChange, defaultValue }) => {
  const [imagesComponents, setImagesComponents] = useState(
    defaultValue ? defaultValue : [],
  );

  const handleImageComponent = (id, image) => {
    setImagesComponents((prevComponents) =>
      prevComponents.map((comp) =>
        comp.id === id
          ? {
              id: id,
              structure: image?.structure,
              has_instructions: image?.has_instructions,
              image: image?.image,
            }
          : comp,
      ),
    );
    console.log(imagesComponents);
  };

  const addImageComponent = () => {
    setImagesComponents((prevComponents) => [
      ...prevComponents,
      { id: uuid(), structure: null, has_instructions: false, image: null },
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

  return (
    <div>
      {imagesComponents.map(({ id, data }) => (
        <div key={id} className="flex flex-col relative">
          <CipherKeyImage
            defaultValue={data}
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
      ))}
      <div className="w-full flex flex-row justify-between mb-6">
        <Button color="light" onClick={() => {}}>
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

CipherKeyImage.propTypes = {
  onChange: PropTypes.func.isRequired,
  defaultValue: PropTypes.object,
};
