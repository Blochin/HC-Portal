import { FileInput, Label } from "flowbite-react";
import PropTypes from "prop-types";

const CustomFileUpload = ({ name, label, onChange }) => {
  const handleChange = (event) => {
    onChange(name, event.target.files[0]);
  };

  return (
    <>
      <div>
        <div className="mb-2">
          <div>
            <Label htmlFor={name} value={label} />
          </div>
          <FileInput
            onChange={(event) => handleChange(event)}
            id={name}
            sizing="sm"
          />
        </div>
      </div>
    </>
  );
};

CustomFileUpload.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
};

export default CustomFileUpload;
