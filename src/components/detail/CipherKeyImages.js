import PropTypes from "prop-types";
import { Accordion, List, Tooltip } from "flowbite-react";
import React, { useState } from "react";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi";
import Lightbox from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

const CipherKeyImages = ({ images }) => {
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
    <Accordion alwaysOpen={true}>
      <Accordion.Panel>
        <Accordion.Title>Images</Accordion.Title>
        <Accordion.Content className={"p-3 px-5"}>
          {images?.map((image, index) => {
            return (
              <div key={index}>
                <div>
                  <div>
                    <p>
                      Has Instructions:{" "}
                      {Boolean(image.has_instructions) === true ? "Yes" : "No"}
                    </p>
                    {image.structure && (
                      <div className={"flex flex-row items-center"}>
                        <p>Structure: {image.structure}</p>
                        <Tooltip
                          content={
                            <div>
                              Cipher key structure. Combination of P + C + H,
                              separated with comma. P - plain text element type
                              (by size):
                              <List className={"text-gray-400"}>
                                <List.Item>1 - letters</List.Item>
                                <List.Item>2 - bigrams</List.Item>
                                <List.Item>3 - trigrams</List.Item>
                                <List.Item>
                                  V - codes (variable length)
                                </List.Item>
                                <List.Item>0 - nulls</List.Item>
                                <List.Item>(N - numbers)</List.Item>
                              </List>
                              C - cipher text element char type:
                              <List className={"text-gray-400"}>
                                <List.Item>l - letters</List.Item>
                                <List.Item>s - symbols</List.Item>
                                <List.Item>n - numbers</List.Item>
                                <List.Item>
                                  d - double letters (e.g. tt, ll)
                                </List.Item>
                                <List.Item>m - markups</List.Item>
                                <List.Item>g - strings</List.Item>
                              </List>
                              H - if homophonic:
                              <List className={"text-gray-400"}>
                                <List.Item>p - partially homophonic</List.Item>
                                <List.Item>f - fully homophonic</List.Item>
                              </List>
                            </div>
                          }
                        >
                          <HiOutlineQuestionMarkCircle
                            size={20}
                            className={"text-gray-500 ml-2"}
                          />
                        </Tooltip>
                      </div>
                    )}

                    <div
                      className={
                        "mt-3 group hover:shadow-2xl transition-shadow duration-300"
                      }
                    >
                      <img
                        className={
                          "cursor-pointer transition-transform duration-300 transform group-hover:scale-105"
                        }
                        onClick={() => handleGallery(image?.url.large)}
                        src={image?.url.thumb}
                      />
                    </div>
                  </div>
                  <div className={"border-b-2 mt-4 mb-2"}></div>
                </div>
              </div>
            );
          })}
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
        </Accordion.Content>
      </Accordion.Panel>
    </Accordion>
  );
};

export default CipherKeyImages;

CipherKeyImages.propTypes = {
  images: PropTypes.array,
};
