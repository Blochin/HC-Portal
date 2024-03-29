import PropTypes from "prop-types";
import { Badge, Dropdown } from "flowbite-react";
import CustomAlert from "./CustomAlert";
import React, { useState } from "react";
import { useUser } from "../../context/UserContext";
import CustomGallery from "./CustomGallery";
import { HiDotsVertical } from "react-icons/hi";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Lightbox from "yet-another-react-lightbox";

const Header = ({
  data,
  image,
  className,
  onClone,
  onEdit,
  galleryData,
  onExport,
}) => {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isThumbnailOpen, setIsThumbnailOpen] = useState(false);
  const [thumbnailToDisplay] = useState([{ src: image }]);
  const { user } = useUser();
  const isOwner = data?.created_by?.id === user?.id && user?.id;

  const handleGallery = () => {
    setIsGalleryOpen(!isGalleryOpen);
  };

  const handleThumbnail = () => {
    setIsThumbnailOpen(!isThumbnailOpen);
  };

  return (
    <div className={className}>
      <div className="shadow-2xl border border-gray-100 p-5">
        <div className="flex flex-col gap-4 justify-start lg:flex-row  lg:items-start">
          <div className={"lg:w-2/5"}>
            <div
              className={"cursor-pointer"}
              onClick={() => {
                setIsThumbnailOpen(true);
              }}
            >
              <img
                src={image}
                alt={data?.name}
                className="object-cover w-full max-h-[50vh]"
              />
            </div>
          </div>
          <div className={"lg:w-3/5"}>
            <div className="flex flex-col w-full justify-center">
              {isOwner && (
                <CustomAlert
                  state={data?.state?.title}
                  onEdit={onEdit}
                  note={data?.note}
                  heading={null}
                  text={""}
                />
              )}

              {data?.solution && (
                <div
                  className={
                    "py-1.5 px-2 bg-gray-100 w-max rounded mt-2 text-gray-500"
                  }
                >
                  {data?.solution?.name}
                </div>
              )}

              <div className="mb-6">
                <div className="text-xl font-sans text-gray-700 py-5">
                  <div
                    className={
                      "flex flex-row items-center justify-between border-b pb-1"
                    }
                  >
                    <span>{data?.name}</span>
                    {
                      <RenderOptions
                        onEdit={onEdit}
                        onClone={onClone}
                        onExport={onExport}
                        handleGallery={handleGallery}
                        createdBy={data?.created_by}
                        state={data?.state?.title}
                      />
                    }
                  </div>
                </div>
                <div className="flex flex-row gap-2 mb-4">
                  {data?.tags?.map((tag, index) => (
                    <Badge color={"light"} key={index}>
                      {tag.name}
                    </Badge>
                  ))}
                </div>
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
      <Lightbox
        zoom={{
          scrollToZoom: true,
          maxZoomPixelRatio: 10,
        }}
        carousel={{ finite: thumbnailToDisplay?.length <= 1 }}
        render={{
          buttonPrev: thumbnailToDisplay.length <= 1 ? () => null : undefined,
          buttonNext: thumbnailToDisplay.length <= 1 ? () => null : undefined,
        }}
        slides={thumbnailToDisplay}
        open={isThumbnailOpen}
        index={thumbnailToDisplay?.length - 1}
        close={handleThumbnail}
        plugins={[Fullscreen, Zoom]}
      />
    </div>
  );
};
const RenderOptions = ({
  onClone,
  onEdit,
  onExport,
  handleGallery,
  createdBy,
  state,
}) => {
  const { user } = useUser();
  const isOwner = createdBy?.id === user?.id && user?.id;

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
      {user && isOwner && state !== "Rejected" && (
        <Dropdown.Item onClick={onEdit}>Edit</Dropdown.Item>
      )}
      <Dropdown.Item onClick={onExport}>Export PDF</Dropdown.Item>
      <Dropdown.Item onClick={handleGallery}>Gallery</Dropdown.Item>
    </Dropdown>
  );
};

RenderOptions.propTypes = {
  onClone: PropTypes.func,
  onEdit: PropTypes.func,
  onExport: PropTypes.func,
  handleGallery: PropTypes.func,
  createdBy: PropTypes.object,
  state: PropTypes.string,
};

Header.propTypes = {
  data: PropTypes.object,
  image: PropTypes.string,
  className: PropTypes.array,
  onClone: PropTypes.func,
  onExport: PropTypes.func,
  onEdit: PropTypes.func,
  galleryData: PropTypes.object,
};

export default Header;
