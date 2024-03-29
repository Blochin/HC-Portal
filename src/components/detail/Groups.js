import { Accordion } from "flowbite-react";
import PropTypes from "prop-types";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Lightbox from "yet-another-react-lightbox";
import React, { useState } from "react";
const Groups = ({ data }) => {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [imgToDisplay, setImgToDisplay] = useState(null);

  const handleClose = () => {
    setIsGalleryOpen(false);
  };

  const handleGallery = (img) => {
    setIsGalleryOpen(true);
    setImgToDisplay([{ src: img }]);
  };
  return (
    <div>
      <Accordion alwaysOpen={true}>
        {data.datagroups.map((group, index) => {
          return (
            <Accordion.Panel key={index}>
              <Accordion.Title>{group.description}</Accordion.Title>
              <Accordion.Content className={"p-3 px-5"}>
                {group.data.map((data, index) => {
                  return (
                    <div key={index}>
                      <div>
                        <h1 className={"font-bold"}>{data.title}</h1>
                        <a className={"text-blue-600"} href={data.link}>
                          {data.link}
                        </a>
                        <p>{data.text}</p>
                        {data.image && (
                          <img
                            className={"cursor-pointer"}
                            onClick={() => handleGallery(data?.image.large)}
                            src={data.image.thumb}
                          />
                        )}
                      </div>
                      <div className={"border-b-2 mt-4 mb-2"}></div>
                    </div>
                  );
                })}
              </Accordion.Content>
            </Accordion.Panel>
          );
        })}
      </Accordion>
      <Lightbox
        zoom={{
          scrollToZoom: true,
          maxZoomPixelRatio: 10,
        }}
        carousel={{ finite: imgToDisplay?.length <= 1 }}
        render={{
          buttonPrev: imgToDisplay?.length <= 1 ? () => null : undefined,
          buttonNext: imgToDisplay?.length <= 1 ? () => null : undefined,
        }}
        slides={imgToDisplay}
        open={isGalleryOpen}
        index={imgToDisplay?.length - 1}
        close={handleClose}
        plugins={[Fullscreen, Zoom]}
      />
    </div>
  );
};

Groups.propTypes = {
  data: PropTypes.array.isRequired,
};
export default Groups;
