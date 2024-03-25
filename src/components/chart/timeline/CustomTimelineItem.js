import PropTypes from "prop-types";
import { Timeline } from "flowbite-react";
//import { HiCalendar } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
const CustomTimelineItem = ({ data, model }) => {
  const navigate = useNavigate();
  const stripHtmlTags = (htmlString) => {
    const doc = new DOMParser().parseFromString(htmlString, "text/html");
    if (doc.body.textContent == "null") {
      return "";
    }
    return doc.body.textContent || "";
  };

  const handleRedirect = () => {
    navigate(`/dashboard/${model}/${data?.id}`);
  };
  console.log(data);
  return (
    <Timeline.Item
      onClick={handleRedirect}
      className={
        "ml-11 border border-gray-200 rounded shadow p-2 cursor-pointer"
      }
    >
      <img
        className={
          "absolute -left-3 flex h-12 w-12 items-center justify-center rounded-full bg-cyan-200 ring-8 ring-white dark:bg-cyan-900 dark:ring-gray-900"
        }
        src={data?.thumb}
      />
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
  model: PropTypes.string,
};
export default CustomTimelineItem;
