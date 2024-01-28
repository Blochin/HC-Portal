import PropTypes from "prop-types";
import CustomTimelineItem from "./CustomTimelineItem";
import { Timeline } from "flowbite-react";
const CustomTimeline = ({ data }) => {
  return (
    <Timeline>
      {data.map((item, index) => {
        return <CustomTimelineItem key={index} data={item} />;
      })}
    </Timeline>
  );
};
export default CustomTimeline;

CustomTimeline.propTypes = {
  data: PropTypes.object,
};
