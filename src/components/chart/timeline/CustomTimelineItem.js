import PropTypes from "prop-types";
import { Timeline } from "flowbite-react";
import { HiCalendar } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
const CustomTimelineItem = ({ data }) => {
  const navigate = useNavigate();
  const stripHtmlTags = (htmlString) => {
    const doc = new DOMParser().parseFromString(htmlString, "text/html");
    return doc.body.textContent || "";
  };

  const handleRedirect = () => {
    navigate(`/dashboard/cryptograms/${data?.id}`);
  };
  return (
    <Timeline.Item
      onClick={handleRedirect}
      className={"border border-gray-200 rounded shadow p-2 cursor-pointer"}
    >
      <Timeline.Point icon={HiCalendar} />
      <Timeline.Content>
        <Timeline.Time>{data?.date}</Timeline.Time>
        <Timeline.Title>{data?.name}</Timeline.Title>
        <Timeline.Body>{stripHtmlTags(data?.description)}</Timeline.Body>
      </Timeline.Content>
    </Timeline.Item>
  );
};

CustomTimelineItem.propTypes = {
  data: PropTypes.object,
};
export default CustomTimelineItem;
