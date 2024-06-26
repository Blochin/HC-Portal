import React from "react";
import PropTypes from "prop-types";
import { Alert } from "flowbite-react";
import { HiInformationCircle, HiPencil } from "react-icons/hi";

const CustomAlert = ({ state, onEdit, note, model = "entity", children }) => {
  let alertColor;
  let text;

  switch (state) {
    case "Approved":
      alertColor = "success";
      text = `Admin note: Your ${model} was approved.`;
      break;
    case "Rejected":
      alertColor = "failure";
      text = `Admin note: Your ${model} was rejected.`;
      break;
    case "Revise":
      alertColor = "warning";
      children
        ? (text = `Your ${model} was revised. You need to correct the entry before accepting.`)
        : (text = `Your ${model} was revised. You need to correct the entry before accepting. Reviewer comments are available in the edit mode.`);
      break;
    case "Awaiting":
      alertColor = "info";
      text = `Admin note: Your ${model} is waiting for revision.`;
      break;
    default:
      alertColor = "default";
  }

  return (
    <Alert
      additionalContent={
        <AdditionalContent
          text={text}
          onEdit={onEdit}
          state={state}
          note={note}
        >
          {children}
        </AdditionalContent>
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
  model: PropTypes.string,
  children: PropTypes.node,
};

function AdditionalContent({ text, onEdit, state, note, children }) {
  return (
    <>
      <div className="mb-4 mt-2 text-sm text-cyan-700 dark:text-cyan-800">
        {"Admin note: " + text}
      </div>
      {children && note && (
        <div
          className={
            "px-3 py-4 bg-gray-50 rounded-md border border-gray-300 mb-4"
          }
        >
          <div className={"text-black"}>{note}</div>
        </div>
      )}

      <div className="flex">
        {children}
        {state === "Revise" && !children && (
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

AdditionalContent.propTypes = {
  text: PropTypes.string.isRequired,
  onEdit: PropTypes.func,
  state: PropTypes.string.isRequired,
  note: PropTypes.string,
  children: PropTypes.node,
};
export default CustomAlert;
