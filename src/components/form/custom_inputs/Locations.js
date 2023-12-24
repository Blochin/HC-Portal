import { useContext, useState } from "react";
import { DataContext } from "context/DataContext";
import CustomDropdown from "components/form/inputs/dropdown/Dropdown";
import PropTypes from "prop-types";
import { COLOR_FAILURE, COLOR_GRAY } from "../inputs/Colors";

const Locations = ({
  defaultContinentValue,
  defaultLocationValue,
  onChange,
  errorMessage,
}) => {
  const { continents, locations } = useContext(DataContext);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const handleLocations = (name, continent) => {
    if (!continent) {
      onChange(name, null);
      setFilteredLocations([]);
      return;
    }
    onChange(name, continent.value);
    const filteredLocations = locations
      .filter((location) => {
        return (
          location.continent === continent.value && location.location !== null
        );
      })
      .map((location) => {
        return { value: location.location };
      });
    setFilteredLocations(filteredLocations);
  };

  return (
    <div className={"mb-6"}>
      <div className={"flex justify-center"}>
        <div className={"w-1/3"}>
          <CustomDropdown
            name={"continent"}
            isRequired={true}
            label={"Continent"}
            value={defaultContinentValue}
            layout={"left"}
            canAddNew={false}
            isMulti={false}
            withMeta={false}
            data={continents}
            onSelect={handleLocations}
            color={errorMessage ? COLOR_FAILURE : COLOR_GRAY}
          />
        </div>
        <div className={"w-2/3"}>
          <CustomDropdown
            name={"location_name"}
            isRequired={true}
            label={"Location"}
            value={defaultLocationValue}
            layout={"right"}
            canAddNew={true}
            isMulti={false}
            withMeta={false}
            data={filteredLocations}
            onSelect={(name, value) =>
              onChange(name, value ? value.value : null)
            }
            color={errorMessage ? COLOR_FAILURE : COLOR_GRAY}
          />
        </div>
      </div>
      {errorMessage ? (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
          <span className="font-medium">{errorMessage}</span>
        </p>
      ) : null}
    </div>
  );
};

Locations.propTypes = {
  defaultContinentValue: PropTypes.object,
  defaultLocationValue: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
};

export default Locations;
