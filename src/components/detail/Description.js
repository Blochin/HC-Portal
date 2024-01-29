import PropTypes from "prop-types";

const Description = ({ data }) => {
  // this should be stored in css config.
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

    Array.from(doc.querySelectorAll("ul")).forEach((element) => {
      element.classList.add("list-disc", "pl-4");
    });

    Array.from(doc.querySelectorAll("ol")).forEach((element) => {
      element.classList.add("list-decimal", "pl-4");
    });

    Array.from(doc.querySelectorAll("a")).forEach((element) => {
      element.classList.add("text-blue-500", "hover:underline");
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
