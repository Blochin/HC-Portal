import Form from "components/form/Form";
import request from "utils/api";
import Locations from "components/form/custom_inputs/Locations";
import Tags from "components/form/custom_inputs/Tags";
import Thumbnail from "components/form/custom_inputs/Thumbnail";
import RichtextEditor from "components/form/inputs/RichtextEditor";
import CustomTextInput from "components/form/inputs/TextInput";
import DataGroups from "components/form/custom_inputs/DataGroups";
import CustomButton from "components/form/inputs/Button";
import Categories from "../components/form/custom_inputs/Categories";
import Availability from "../components/form/custom_inputs/Availability";
import Users from "../components/form/custom_inputs/Users";
import Solutions from "../components/form/custom_inputs/Solutions";
import Dates from "../components/form/custom_inputs/Dates";
import Languages from "../components/form/custom_inputs/Languages";
import { useState } from "react";
function CreateCryptogramPage() {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (name, value) => {
    const updatedErrors = { ...errors };
    updatedErrors[name] = null;
    setErrors(updatedErrors);

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    console.log(formData, { [name]: value });
  };

  const handleSubmit = () => {
    setErrors({});
    request
      .post("api/cryptograms", formData)
      .then((response) => {
        console.log("Form submitted successfully", response);
      })
      .catch((error) => {
        if (error.response) {
          setErrors(error.response.data.errors);
          setErrorMessage(error.response.data.message);
          console.log(error.response.data.errors);
        }
      });
  };
  return (
    <Form onSubmit={handleSubmit}>
      <CustomTextInput
        name="name"
        label={"Name"}
        placeholder="Name"
        onChange={(name, value) => handleChange(name, value)}
        errorMessage={errors.name ? errors.name[0] : null}
      />
      <Thumbnail
        name={"thumbnail_base64"}
        urlName={"thumbnail_link"}
        onSelect={(name, value) => handleChange(name, value)}
      />
      <RichtextEditor
        name={"description"}
        label={"Description"}
        onChange={(name, value) => handleChange(name, value)}
      />
      <Categories
        onChangeMainCategory={(name, value) => handleChange(name, value)}
        onChangeSubCategory={(name, value) => handleChange(name, value)}
        errorMessage={errors.category_id ? errors.category_id[0] : null}
      />
      <Dates onChange={(name, value) => handleChange(name, value)} />
      <Languages
        onChange={(name, value) => handleChange(name, value)}
        errorMessage={errors.language_id ? errors.language_id[0] : null}
      />
      <Locations
        onChangeContinent={(name, value) => handleChange(name, value)}
        onChangeLocationName={(name, value) => handleChange(name, value)}
        errorMessage={errors.continent ? errors.continent[0] : null}
      />
      <CustomTextInput
        onChange={(name, value) => handleChange(name, value)}
        name={"used_chars"}
        label={"Used Chars"}
        placeholder={"Used Chars"}
      />
      <Tags onChange={(name, value) => handleChange(name, value)} />
      <Availability
        onChangeAvailability={(name, value) => handleChange(name, value)}
        onChangeArchive={(name, value) => handleChange(name, value)}
        onChangeFolder={(name, value) => handleChange(name, value)}
        onChangeFond={(name, value) => handleChange(name, value)}
        availabilityErrorMessage={
          errors.availability ? errors.availability[0] : null
        }
        archiveErrorMessage={errors.archive ? errors.archive[0] : null}
        folderErrorMessage={errors.folder ? errors.folder[0] : null}
        fondErrorMessage={errors.fond ? errors.fond[0] : null}
      />
      <Solutions
        onChange={(name, value) => handleChange(name, value)}
        errorMessage={errors.solution_id ? errors.solution_id : null}
      />
      <Users
        onChangeSender={(name, value) => handleChange(name, value)}
        onChangeRecipient={(name, value) => handleChange(name, value)}
      />
      <DataGroups onChange={(name, value) => handleChange(name, value)} />
      <CustomButton type={"submit"} onClick={() => {}}>
        Submit
      </CustomButton>
    </Form>
  );
}

export default CreateCryptogramPage;
