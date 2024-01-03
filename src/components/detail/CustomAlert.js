import React from "react";
import PropTypes from "prop-types";
import { Alert } from "flowbite-react";
import { HiInformationCircle, HiPencil } from "react-icons/hi";

const CustomAlert = ({ state, onEdit, note }) => {
  let alertColor;
  let text;

  switch (state) {
    case "Approved":
      alertColor = "success";
      text = "Admin note: Your cryptogram was approved";
      break;
    case "Rejected":
      alertColor = "failure";
      text = "Admin note: Your cryptogram was rejected";
      break;
    case "Revise":
      alertColor = "warning";
      text = "Admin note: Your cryptogram is being revised";
      break;
    case "Awaiting":
      alertColor = "info";
      text = "Admin note: Your cryptogram is waiting for revision";
      break;
    default:
      alertColor = "default";
  }

  return (
    <Alert
      additionalContent={
        <ExampleAdditionalContent
          text={text}
          onEdit={onEdit}
          state={state}
          note={note}
        />
      }
      color={alertColor}
      icon={HiInformationCircle}
    >
      <span className="font-medium">{state} </span>
    </Alert>
  );
};

CustomAlert.propTypes = {
  state: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onEdit: PropTypes.func,
  note: PropTypes.string,
};

function ExampleAdditionalContent({ text, onEdit, state, note }) {
  return (
    <>
      <div className="mb-4 mt-2 text-sm text-cyan-700 dark:text-cyan-800">
        {note ? "Admin note: " + note : text}
      </div>
      <div className="flex">
        {state === "Revise" && (
          <button
            type="button"
            className="mr-2 inline-flex items-center rounded-lg bg-cyan-700 px-3 py-1.5 text-center text-xs font-medium text-white hover:bg-cyan-800 focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-800 dark:hover:bg-cyan-900"
            onClick={onEdit}
          >
            <HiPencil className="-ml-0.5 mr-2 h-4 w-4" />
            Edit
          </button>
        )}
      </div>
    </>
  );
}

ExampleAdditionalContent.propTypes = {
  text: PropTypes.string.isRequired,
  onEdit: PropTypes.func,
  state: PropTypes.string.isRequired,
  note: PropTypes.string,
};
export default CustomAlert;
