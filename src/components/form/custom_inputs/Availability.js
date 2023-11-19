import { Label, Radio } from "flowbite-react";
import { useContext, useState } from "react";
import CustomTextInput from "../inputs/TextInput";
import { DataContext } from "../../../context/DataContext";
import CustomDropdown from "../inputs/dropdown/Dropdown";
import { LAYOUT_FULL } from "../inputs/dropdown/trigger/Layout";
import PropTypes from "prop-types";

const Availability = ({
  onChangeAvailability,
  onChangeArchive,
  onChangeFond,
  onChangeFolder,
}) => {
  const [availability, setAvailability] = useState("archive");
  const { archives, fonds, folders } = useContext(DataContext);
  const [selectedFonds, setSelectedFonds] = useState([]);
  const [selectedFolders, setSelectedFolders] = useState([]);
  const handleChange = (event) => {
    const eventValue = event.target.value;
    setAvailability(eventValue);
    if (eventValue === "other") {
      onChangeAvailability("availability", null);
    } else if (eventValue === "archive") {
      onChangeArchive("archive", null);
      onChangeFond("fond", null);
      onChangeFolder("folder", null);
    }
  };

  const handleFilter = (object, keyObject, searchObject, searchKey) => {
    const filtered = object.filter((value) => {
      return value[keyObject] === searchObject[searchKey];
    });

    if (filtered.length === 0) {
      return [];
    }

    return filtered[0].value;
  };

  const handleArchive = (name, archive) => {
    const selectedFonds = handleFilter(fonds, "archive", archive, "value");
    setSelectedFonds(selectedFonds);
    onChangeArchive(name, archive.value);
  };

  const handleFond = (name, fond) => {
    const selectedFond = handleFilter(
      folders,
      "archive_id",
      fond,
      "archive_id",
    );

    const selectedFolder = handleFilter(selectedFond, "name", fond, "value");

    setSelectedFolders(selectedFolder);
    onChangeArchive(name, fond.value);
  };

  return (
    <div>
      <fieldset className="flex flex-row gap-4 mb-6">
        <legend className="mb-4">Chose Availability</legend>
        <div className="flex items-center gap-2">
          <Radio
            onChange={(event) => handleChange(event)}
            name="availability"
            value="archive"
            defaultChecked
          />
          <Label htmlFor="united-state">Archive</Label>
        </div>
        <div className="flex items-center gap-2">
          <Radio
            onChange={(event) => handleChange(event)}
            name="availability"
            value="other"
          />
          <Label>Other</Label>
        </div>
        <div className="w-full">
          {availability === "other" && (
            <CustomTextInput
              name={"availability"}
              onChange={(name, value) => onChangeAvailability(name, value)}
              label={"Other"}
              placeholder={"Other"}
            />
          )}
        </div>
      </fieldset>
      {availability === "archive" && (
        <div>
          <div>
            <CustomDropdown
              name={"archive"}
              isMulti={false}
              layout={LAYOUT_FULL}
              value={""}
              withMeta={false}
              data={archives}
              label={"Archive"}
              canAddNew={true}
              onSelect={(name, value) => handleArchive(name, value)}
            />
          </div>
          <div>
            <CustomDropdown
              name={"fond"}
              isMulti={false}
              layout={LAYOUT_FULL}
              value={""}
              withMeta={false}
              data={selectedFonds}
              label={"Fond"}
              canAddNew={true}
              onSelect={(name, value) => handleFond(name, value)}
            />
          </div>
          <div>
            <CustomDropdown
              name={"folder"}
              isMulti={false}
              layout={LAYOUT_FULL}
              value={""}
              withMeta={false}
              data={selectedFolders}
              label={"Folder"}
              canAddNew={true}
              onSelect={(name, value) => onChangeFolder(name, value.value)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

Availability.propTypes = {
  onChangeAvailability: PropTypes.func.isRequired,
  onChangeArchive: PropTypes.func.isRequired,
  onChangeFond: PropTypes.func.isRequired,
  onChangeFolder: PropTypes.func.isRequired,
};
export default Availability;
