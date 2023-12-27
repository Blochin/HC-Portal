import CustomTextInput from "../inputs/TextInput";
import { Label, Radio } from "flowbite-react";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { parseDate } from "../../../utils/utils";

const CryptogramDates = ({
  defaultAroundDateValue,
  defaultDateValue,
  onChange,
}) => {
  const [dateType, setDateType] = useState("date");

  const handleDate = (name, value) => {
    onChange(name, value);
  };

  const handleChange = (event) => {
    const eventValue = event.target.value;
    setDateType(eventValue);
    onChange("date_around", null);
    onChange("date", null);
  };

  useEffect(() => {
    setDateType(defaultAroundDateValue ? "date_around" : "date");
  }, [defaultAroundDateValue]);

  return (
    <div>
      <fieldset className="flex flex-row gap-4 mb-6">
        <legend className="mb-4">Chose Date</legend>
        <div className="flex items-center gap-2">
          <Radio
            onChange={(event) => handleChange(event)}
            name="dates"
            value="date"
            checked={dateType === "date"}
          />
          <Label htmlFor="united-state">Exact Date</Label>
        </div>
        <div className="flex items-center gap-2">
          <Radio
            onChange={(event) => handleChange(event)}
            name="dates"
            value="date_around"
            checked={dateType === "date_around"}
          />
          <Label>Around Date</Label>
        </div>
        <div className="w-full">
          {dateType === "date_around" && (
            <div className={"w-full"}>
              <CustomTextInput
                name={"date_around"}
                defaultValue={defaultAroundDateValue}
                label={"Date Around"}
                onChange={(name, value) => handleDate(name, value)}
              />
            </div>
          )}
          {dateType === "date" && (
            <div className={"w-full"}>
              <CustomTextInput
                defaultValue={parseDate(defaultDateValue)}
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

CryptogramDates.propTypes = {
  defaultAroundDateValue: PropTypes.string,
  defaultDateValue: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default CryptogramDates;
