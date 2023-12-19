import { useContext, useState } from "react";
import { DataContext } from "context/DataContext";
import CustomDropdown from "components/form/inputs/dropdown/Dropdown";
import PropTypes from "prop-types";
import { COLOR_FAILURE, COLOR_GRAY } from "../inputs/Colors";

const Locations = ({
  onChangeContinent,
  onChangeLocationName,
  errorMessage,
}) => {
  const { continents, locations } = useContext(DataContext);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const handleLocations = (name, continent) => {
    if (!continent) {
      onChangeContinent(name, null);
      setFilteredLocations([]);
      return;
    }
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
    onChangeContinent(name, continent.value);
  };

  return (
    <div className={"mb-6"}>
      <div className={"flex justify-center"}>
        <div className={"w-1/3"}>
          <CustomDropdown
            name={"continent"}
            label={"Continent"}
            value=""
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
            label={"Location"}
            value={""}
            layout={"right"}
            canAddNew={true}
            isMulti={false}
            withMeta={false}
            data={filteredLocations}
            onSelect={(name, value) =>
              onChangeLocationName(name, value ? value.value : null)
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
  onChangeContinent: PropTypes.func.isRequired,
  onChangeLocationName: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
};

export default Locations;
