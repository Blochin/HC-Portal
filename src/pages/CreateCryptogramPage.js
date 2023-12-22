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
import { useEffect, useState } from "react";
import CryptogramDetailPage from "./CryptogramDetailPage";
import PropTypes from "prop-types";
import api from "utils/api";
import { useParams } from "react-router-dom";
function CreateCryptogramPage() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [cryptogramData, setCryptogramData] = useState(null);
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

  useEffect(() => {
    if (id == null) {
      setIsLoading(false);
      return;
    }
    api
      .get(`api/cryptograms/${id}`)
      .then((responseData) => {
        console.log(responseData.data.data);
        setCryptogramData(responseData.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [id]);

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
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Form onSubmit={handleSubmit}>
          <CustomTextInput
            name="name"
            defaultValue={cryptogramData?.name}
            label={"Name"}
            placeholder="Name"
            onChange={(name, value) => handleChange(name, value)}
            errorMessage={errors?.name ? errors.name[0] : null}
          />
          <Thumbnail
            name={"thumbnail_base64"}
            defaultValue={cryptogramData?.thumb}
            urlName={"thumbnail_link"}
            onSelect={(name, value) => handleChange(name, value)}
          />
          <RichtextEditor
            defaultValue={cryptogramData?.description}
            name={"description"}
            label={"Description"}
            onChange={(name, value) => handleChange(name, value)}
          />
          <Categories
            defaultValueMainCategory={{
              id: cryptogramData?.category?.id,
              value: cryptogramData?.category?.name,
            }}
            onChange={(name, value) => handleChange(name, value)}
            errorMessage={errors?.category_id ? errors.category_id[0] : null}
          />
          <Dates
            defaultAroundDateValue={cryptogramData?.date_around}
            defautlDateValue={cryptogramData?.date}
            onChange={(name, value) => handleChange(name, value)}
          />
          <Languages
            defaultValue={{
              id: cryptogramData?.language?.id,
              value: cryptogramData?.language?.name,
            }}
            onChange={(name, value) => handleChange(name, value)}
            errorMessage={errors?.language_id ? errors.language_id[0] : null}
          />
          <Locations
            defaultContinentValue={{
              value: cryptogramData?.location?.continent,
            }}
            defaultLocationValue={{
              value: cryptogramData?.location?.name,
            }}
            onChange={(name, value) => handleChange(name, value)}
            errorMessage={errors?.continent ? errors.continent[0] : null}
          />
          <CustomTextInput
            onChange={(name, value) => handleChange(name, value)}
            name={"used_chars"}
            defaultValue={cryptogramData?.used_chars}
            label={"Used Chars"}
            placeholder={"Used Chars"}
          />
          <Tags
            defaultValue={cryptogramData?.tags?.map((tag) => ({
              id: tag?.id,
              value: tag?.name,
            }))}
            onChange={(name, value) => handleChange(name, value)}
          />
          <Availability
            defaultValueAvailability={cryptogramData?.availability}
            defaultValueArchive={cryptogramData?.folder}
            onChange={(name, value) => handleChange(name, value)}
            availabilityErrorMessage={
              errors?.availability ? errors.availability[0] : null
            }
            archiveErrorMessage={errors?.archive ? errors.archive[0] : null}
            folderErrorMessage={errors?.folder ? errors.folder[0] : null}
            fondErrorMessage={errors?.fond ? errors.fond[0] : null}
          />
          <Solutions
            defaultValue={cryptogramData?.solution}
            onChange={(name, value) => handleChange(name, value)}
            errorMessage={errors?.solution_id ? errors.solution_id : null}
          />
          <Users
            defaultSenderValue={cryptogramData?.sender}
            defaultRecipientValue={cryptogramData?.recipient}
            onChange={(name, value) => handleChange(name, value)}
          />
          <DataGroups
            defaultValue={cryptogramData?.datagroups}
            onChange={(name, value) => handleChange(name, value)}
          />
          <CustomButton type={"submit"} onClick={() => {}}>
            Submit
          </CustomButton>
        </Form>
      )}
    </>
  );
}

export default CreateCryptogramPage;

CryptogramDetailPage.propTypes = {
  id: PropTypes.number,
};
