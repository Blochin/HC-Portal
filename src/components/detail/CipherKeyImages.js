import PropTypes from "prop-types";
import { Accordion, List, Tooltip } from "flowbite-react";
import React from "react";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi";

const CipherKeyImages = ({ images }) => {
  console.log();
  return (
    <Accordion alwaysOpen={true}>
      {images?.map((image, index) => {
        return (
          <Accordion.Panel key={index}>
            <Accordion.Title>Image - {index + 1}</Accordion.Title>
            <Accordion.Content className={"p-3 px-5"}>
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
                              <List.Item>V - codes (variable length)</List.Item>
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

                  <img src={image?.url.thumb} />
                </div>
                <div className={"border-b-2 mt-4 mb-2"}></div>
              </div>
            </Accordion.Content>
          </Accordion.Panel>
        );
      })}
    </Accordion>
  );
};

export default CipherKeyImages;

CipherKeyImages.propTypes = {
  images: PropTypes.array,
};
