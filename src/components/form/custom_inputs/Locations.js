import { useContext, useState } from "react";
import { DataContext } from "context/DataContext";
import CustomDropdown from "components/form/inputs/dropdown/Dropdown";
import PropTypes from "prop-types";

const Locations = ({ onChangeContinent, onChangeLocationName }) => {
  const { continents, locations } = useContext(DataContext);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const handleLocations = (name, continent) => {
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
          onSelect={(name, value) => onChangeLocationName(name, value.value)}
        />
      </div>
    </div>
  );
};

Locations.propTypes = {
  onChangeContinent: PropTypes.func.isRequired,
  onChangeLocationName: PropTypes.func.isRequired,
};

export default Locations;
