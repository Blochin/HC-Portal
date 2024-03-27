import React from "react";
import PropTypes from "prop-types";
import { truncateDescription } from "../../utils/utils";

const Description = ({ data, truncate = false }) => {
  // this should be stored in css config.
  /*const addClassToElements = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    Array.from(doc.querySelectorAll("h2")).forEach((element) => {
      element.classList.add("text-5xl", "font-extrabold");
    });

    Array.from(doc.querySelectorAll("h3")).forEach((element) => {
      element.classList.add("text-4xl", "font-bold");
    });

    Array.from(doc.querySelectorAll("h4")).forEach((element) => {
      element.classList.add("text-3xl", "font-bold");
    });

    Array.from(doc.querySelectorAll("ul")).forEach((element) => {
      element.classList.add("list-disc", "pl-4");
    });

    Array.from(doc.querySelectorAll("ol")).forEach((element) => {
      element.classList.add("list-decimal", "pl-4");
    });

    Array.from(doc.querySelectorAll("a")).forEach((element) => {
      element.classList.add("text-blue-600", "hover:underline", "font-medium");
    });

    Array.from(doc.querySelectorAll("blockquote")).forEach((element) => {
      element.classList.add(
        "text-xl",
        "italic",
        "font-semibold",
        "text-gray-900",
        "ml-3",
      );
    });

    return doc.documentElement.outerHTML;
  };

   */

  return (
    <div>
      <div
        className={"w-full text-2 ck"}
        dangerouslySetInnerHTML={{
          __html: data.description
            ? truncate
              ? truncateDescription(data.description, 300)
              : data.description
            : "",
        }}
      ></div>
    </div>
  );
};

Description.propTypes = {
  data: PropTypes.object.isRequired,
  truncate: PropTypes.bool,
};

Description.defaultProps = {
  truncate: true,
};

export default Description;
