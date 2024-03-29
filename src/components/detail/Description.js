import React from "react";
import PropTypes from "prop-types";
import { truncateDescription } from "../../utils/utils";

const Description = ({ data, truncate = false }) => {
  return (
    <div>
      <div
        className={"w-full text-2 whitespace-pre-wrap break-keep ck"}
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
