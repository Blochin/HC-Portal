import PropTypes from "prop-types";

const Description = ({ data }) => {
  return (
    <div>
      <div
        className={"w-full"}
        dangerouslySetInnerHTML={{ __html: data.description }}
      ></div>
    </div>
  );
};

Description.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Description;
