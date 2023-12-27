import Form from "components/form/Form";
import request from "utils/api";
import Locations from "components/form/custom_inputs/Locations";
import Tags from "components/form/custom_inputs/Tags";
import Thumbnail from "components/form/custom_inputs/Thumbnail";
import RichtextEditor from "components/form/inputs/RichtextEditor";
import CustomTextInput from "components/form/inputs/TextInput";
import DataGroups from "components/form/custom_inputs/DataGroups";
import Categories from "../components/form/custom_inputs/Categories";
import Availability from "../components/form/custom_inputs/Availability";
import CryptogramUsers from "../components/form/custom_inputs/CryptogramUsers";
import Solutions from "../components/form/custom_inputs/Solutions";
import CryptogramDates from "../components/form/custom_inputs/CryptogramDates";
import Languages from "../components/form/custom_inputs/Languages";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "utils/api";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Checkbox, Label } from "flowbite-react";
import { toast } from "react-toastify";
import { toastOptions } from "../components/ToastOptions";

function CreateCryptogramPage({ edit = false }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [cryptogramData, setCryptogramData] = useState(null);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [notEraseData, setNotEraseData] = useState(false);

  const handleEraseData = () => {
    setNotEraseData(!notEraseData);
  };
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
    const url = edit === true ? `api/cryptograms/${id}` : "api/cryptograms";
    setErrors({});
    request
      .post(url, formData)
      .then((response) => {
        toast.success(response.data.message, toastOptions);
        console.log("Form submitted successfully", response);
        if (!notEraseData) {
          navigate(`/dashboard/cryptograms/${response.data.data.id}`);
        }
      })
      .catch((error) => {
        if (error.response) {
          setErrors(error.response.data.errors);
          console.log(error.response.data.errors);
          toast.error(error.response.data.message, toastOptions);
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
            isRequired={true}
            defaultValue={cryptogramData?.name}
            label={"Name"}
            placeholder="Name"
            onChange={(name, value) => handleChange(name, value)}
            errorMessage={errors?.name?.[0]}
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
            errorMessage={errors?.category_id?.[0]}
          />
          <CryptogramDates
            defaultAroundDateValue={cryptogramData?.date_around}
            defaultDateValue={cryptogramData?.date}
            onChange={(name, value) => handleChange(name, value)}
          />
          <Languages
            defaultValue={{
              id: cryptogramData?.language?.id,
              value: cryptogramData?.language?.name,
            }}
            onChange={(name, value) => handleChange(name, value)}
            errorMessage={errors?.language_id?.[0]}
          />
          <Locations
            defaultContinentValue={{
              value: cryptogramData?.location?.continent,
            }}
            defaultLocationValue={{
              value: cryptogramData?.location?.name,
            }}
            onChange={(name, value) => handleChange(name, value)}
            errorMessage={errors?.continent?.[0]}
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
            availabilityErrorMessage={errors?.availability?.[0]}
            archiveErrorMessage={errors?.archive?.[0]}
            folderErrorMessage={errors?.folder?.[0]}
            fondErrorMessage={errors?.fond?.[0]}
          />
          <Solutions
            defaultValue={cryptogramData?.solution}
            onChange={(name, value) => handleChange(name, value)}
            errorMessage={errors?.solution_id}
          />
          <CryptogramUsers
            defaultSenderValue={cryptogramData?.sender}
            defaultRecipientValue={cryptogramData?.recipient}
            onChange={(name, value) => handleChange(name, value)}
          />
          <DataGroups
            defaultValue={cryptogramData?.datagroups}
            onChange={(name, value) => handleChange(name, value)}
          />
          <div className={"flex flex-row items-center"}>
            <Button type={"submit"} onClick={() => {}}>
              Submit
            </Button>
            <Label
              className={"ml-2 mr-1"}
              value={"Do not erase data after submit"}
            />
            <Checkbox
              checked={notEraseData}
              onClick={handleEraseData}
            ></Checkbox>
          </div>
        </Form>
      )}
    </>
  );
}

export default CreateCryptogramPage;

CreateCryptogramPage.propTypes = {
  edit: PropTypes.bool,
};
