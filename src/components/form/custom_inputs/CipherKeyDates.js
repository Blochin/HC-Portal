import CustomTextInput from "../inputs/TextInput";
import { Label, Radio } from "flowbite-react";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { parseDate } from "../../../utils/utils";
const RADIO_FROM_TO = "from_to";
const RADIO_EXACT_DATE = "date";
const RADIO_AROUND_DATE = "date_around";
const CipherKeyDates = ({
  defaultFromDateValue,
  defaultToDateValue,
  defaultAroundDateValue,
  onChange,
}) => {
  const [dateType, setDateType] = useState(RADIO_FROM_TO);

  const handleDate = (name, value) => {
    onChange(name, value);
  };

  const handleChange = (event) => {
    const eventValue = event.target.value;
    setDateType(eventValue);
    onChange("date_around", null);
    onChange("used_from", null);
    onChange("used_to", null);
  };

  const resolveDefaultOption = (
    defaultFromValue,
    defaultToDateValue,
    defaultAroundDateValue,
  ) => {
    let dateType = RADIO_FROM_TO;

    if (defaultToDateValue) {
      dateType = RADIO_FROM_TO;
    } else if (defaultFromValue) {
      dateType = RADIO_EXACT_DATE;
    } else if (defaultAroundDateValue) {
      dateType = RADIO_AROUND_DATE;
    }

    setDateType(dateType);
  };

  useEffect(() => {
    resolveDefaultOption(
      defaultFromDateValue,
      defaultToDateValue,
      defaultAroundDateValue,
    );
  }, [defaultFromDateValue, defaultToDateValue, defaultAroundDateValue]);

  return (
    <div className={"flex flex-col"}>
      <fieldset className="flex flex-row gap-4 mb-6">
        <legend className="mb-4">Chose Date</legend>
        <div className="flex items-center gap-2">
          <Radio
            onChange={(event) => handleChange(event)}
            name="dates"
            value={RADIO_FROM_TO}
            checked={dateType === RADIO_FROM_TO}
          />
          <Label htmlFor="united-state">Date From To</Label>
        </div>
        <div className="flex items-center gap-2">
          <Radio
            onChange={(event) => handleChange(event)}
            name="dates"
            value={RADIO_EXACT_DATE}
            checked={dateType === RADIO_EXACT_DATE}
          />
          <Label htmlFor="united-state">Exact Date</Label>
        </div>
        <div className="flex items-center gap-2">
          <Radio
            onChange={(event) => handleChange(event)}
            name="dates"
            value={RADIO_AROUND_DATE}
            checked={dateType === RADIO_AROUND_DATE}
          />
          <Label>Around Date</Label>
        </div>
      </fieldset>
      <div className="w-full">
        {dateType === "from_to" && (
          <div className={"flex justify-center gap-6 mb-6"}>
            <div className={"w-full"}>
              <CustomTextInput
                defaultValue={parseDate(defaultFromDateValue)}
                type={"date"}
                name={"used_from"}
                label={"Used From"}
                onChange={(name, value) => handleDate(name, value)}
              />
            </div>
            <div className={"w-full"}>
              <CustomTextInput
                defaultValue={parseDate(defaultToDateValue)}
                type={"date"}
                name={"used_to"}
                label={"Used To"}
                onChange={(name, value) => handleDate(name, value)}
              />
            </div>
          </div>
        )}
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
              defaultValue={parseDate(defaultFromDateValue)}
              type={"date"}
              name={"used_from"}
              label={"Date"}
              onChange={(name, value) => handleDate(name, value)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

CipherKeyDates.propTypes = {
  defaultFromDateValue: PropTypes.string,
  defaultToDateValue: PropTypes.string,
  defaultAroundDateValue: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default CipherKeyDates;
