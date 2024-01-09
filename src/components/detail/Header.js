import PropTypes from "prop-types";
import { Badge, Button } from "flowbite-react";
import CustomAlert from "./CustomAlert";
import React, { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import CustomGallery from "./CustomGallery";

// eslint-disable-next-line no-unused-vars
const Header = ({
  className,
  image,
  title,
  tags,
  onClone,
  state,
  onEdit,
  note,
  createdBy,
  galleryData,
}) => {
  const [displayNote, setDisplayNote] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    if (createdBy?.id === user?.id && user?.id) {
      setDisplayNote(true);
    }
  });
  console.log(galleryData);
  const handleGalleryClick = () => {
    setIsGalleryOpen(!isGalleryOpen);
    console.log(isGalleryOpen);
  };

  return (
    <div className={className}>
      <div className="bg-gray-300 p-5">
        <div className="flex flex-col md:flex-row gap-4 justify-start md:items-center">
          <div className="w-full md:w-auto">
            <img src={image} alt={title} className="max-w-full" />
          </div>
          <div className="flex flex-col w-full justify-center">
            {displayNote && (
              <CustomAlert
                state={state}
                onEdit={onEdit}
                note={note}
                heading={null}
                text={""}
              />
            )}

            <div className="mb-6">
              <div className="text-xl font-semibold">{title}</div>
              <div className="flex flex-row gap-2 mb-4">
                {tags.map((tag, index) => (
                  <Badge color={"light"} key={index}>
                    {tag.name}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <div className="flex flex-row gap-2">
                <Button size={"xs"} onClick={onClone}>
                  Clone
                </Button>
                <Button size={"xs"}>Export PDF</Button>
                <Button size={"xs"} onClick={handleGalleryClick}>
                  Gallery
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isGalleryOpen && galleryData.length > 0 && (
        <CustomGallery
          data={galleryData}
          isGalleryOpen={isGalleryOpen}
          setIsGalleryOpen={setIsGalleryOpen}
        />
      )}
    </div>
  );
};

Header.propTypes = {
  className: PropTypes.array,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  tags: PropTypes.array.isRequired,
  onClone: PropTypes.func,
  onExport: PropTypes.func,
  state: PropTypes.string,
  onEdit: PropTypes.func,
  note: PropTypes.string,
  createdBy: PropTypes.object,
  galleryData: PropTypes.object,
};

export default Header;
