import PropTypes from "prop-types";

const Description = ({ data }) => {
  const addClassToElements = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    Array.from(doc.querySelectorAll("h1")).forEach((element) => {
      element.classList.add("text-4xl");
    });

    Array.from(doc.querySelectorAll("h2")).forEach((element) => {
      element.classList.add("text-3xl");
    });

    Array.from(doc.querySelectorAll("h3")).forEach((element) => {
      element.classList.add("text-2xl");
    });

    return doc.documentElement.outerHTML;
  };

  return (
    <div>
      <div
        className={"w-full text-2"}
        dangerouslySetInnerHTML={{
          __html: addClassToElements(data.description ? data.description : ""),
        }}
      ></div>
    </div>
  );
};

Description.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Description;
