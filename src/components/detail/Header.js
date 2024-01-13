import PropTypes from "prop-types";
import { Badge, Dropdown } from "flowbite-react";
import CustomAlert from "./CustomAlert";
import React, { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import CustomGallery from "./CustomGallery";
import { HiDotsVertical } from "react-icons/hi";

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
  const handleGallery = () => {
    setIsGalleryOpen(!isGalleryOpen);
    console.log(isGalleryOpen);
  };

  return (
    <div className={className}>
      <div className="shadow-2xl border border-gray-100 p-5">
        <div className="flex flex-col gap-4 justify-start lg:flex-row  lg:items-start">
          <div className={"lg:w-1/2"}>
            <div className="">
              <img src={image} alt={title} className="object-cover" />
            </div>
          </div>
          <div className={"lg:w-1/2"}>
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
                <div className="text-xl font-sans text-gray-700 py-5">
                  <div
                    className={
                      "flex flex-row items-center justify-between border-b pb-1"
                    }
                  >
                    <span>{title}</span>
                    {
                      <RenderOptions
                        onClone={onClone}
                        handleGalleryClick={handleGallery}
                      />
                    }
                  </div>
                </div>
                <div className="flex flex-row gap-2 mb-4">
                  {tags.map((tag, index) => (
                    <Badge color={"light"} key={index}>
                      {tag.name}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex flex-row gap-2"></div>
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
const RenderOptions = ({ onClone, handleGallery }) => {
  const { user } = useUser();
  return (
    <Dropdown
      label={"options"}
      renderTrigger={() => (
        <div>
          <HiDotsVertical
            size={24}
            className={
              "text-gray-500 bg-gray-100 p-0.5 rounded-full cursor-pointer shadow"
            }
          />
        </div>
      )}
    >
      {user && <Dropdown.Item onClick={onClone}>Clone</Dropdown.Item>}
      <Dropdown.Item>Export PDF</Dropdown.Item>
      <Dropdown.Item onClick={handleGallery}>Gallery</Dropdown.Item>
    </Dropdown>
  );
};

RenderOptions.propTypes = {
  onClone: PropTypes.func,
  handleGallery: PropTypes.func,
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
