import PropTypes from "prop-types";
import { Accordion } from "flowbite-react";

const CipherKeyImages = ({ images }) => {
  return (
    <Accordion alwaysOpen={true}>
      {images?.map((image, index) => {
        return (
          <Accordion.Panel key={index}>
            <Accordion.Title>Image - {index + 1}</Accordion.Title>
            <Accordion.Content className={"p-3 px-5"}>
              <div>
                <div>
                  <h1 className={"font-bold"}>{image.structure}</h1>
                  <p>
                    Has instructions:{" "}
                    {Boolean(image.has_instructions) === true ? "Yes" : "No"}
                  </p>
                  <p>
                    Has structure:{" "}
                    {Boolean(image.structure) === true ? image.structure : "No"}
                  </p>
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
