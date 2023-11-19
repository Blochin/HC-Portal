import CustomTextInput from "../inputs/TextInput";
import { Label, Radio } from "flowbite-react";
import { useState } from "react";
import PropTypes from "prop-types";

const Dates = ({ onChange }) => {
  const [dateType, setDateType] = useState("date");

  const handleDate = (name, value) => {
    onChange(name, value);
  };

  const handleChange = (event) => {
    const eventValue = event.target.value;
    setDateType(eventValue);
    if (eventValue === "date") {
      onChange("date_around", null);
    } else if (eventValue === "date_around") {
      onChange("date", null);
    }
  };
  return (
    <div>
      <fieldset className="flex flex-row gap-4 mb-6">
        <legend className="mb-4">Chose Date</legend>
        <div className="flex items-center gap-2">
          <Radio
            onChange={(event) => handleChange(event)}
            name="dates"
            value="date"
            defaultChecked
          />
          <Label htmlFor="united-state">Exact Date</Label>
        </div>
        <div className="flex items-center gap-2">
          <Radio
            onChange={(event) => handleChange(event)}
            name="dates"
            value="date_around"
          />
          <Label>Around Date</Label>
        </div>
        <div className="w-full">
          {dateType === "date_around" && (
            <div className={"w-full"}>
              <CustomTextInput
                name={"date_around"}
                label={"Date Around"}
                onChange={(name, value) => handleDate(name, value)}
              />
            </div>
          )}
          {dateType === "date" && (
            <div className={"w-full"}>
              <CustomTextInput
                type={"date"}
                name={"date"}
                label={"Date"}
                onChange={(name, value) => handleDate(name, value)}
              />
            </div>
          )}
        </div>
      </fieldset>
    </div>
  );
};

Dates.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default Dates;
