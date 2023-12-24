import Form from "components/form/Form";
import request from "utils/api";
import Locations from "components/form/custom_inputs/Locations";
import Tags from "components/form/custom_inputs/Tags";
import RichtextEditor from "components/form/inputs/RichtextEditor";
import CustomTextInput from "components/form/inputs/TextInput";
import Categories from "../components/form/custom_inputs/Categories";
import Availability from "../components/form/custom_inputs/Availability";
import Languages from "../components/form/custom_inputs/Languages";
import { useEffect, useState } from "react";
import CryptogramDetailPage from "./CryptogramDetailPage";
import PropTypes from "prop-types";
import api from "utils/api";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Checkbox, Label } from "flowbite-react";
import { toast } from "react-toastify";
import CipherKeyDates from "../components/form/custom_inputs/CipherKeyDates";
import CipherKeyUsers from "../components/form/custom_inputs/CipherKeyUsers";
import CipherKeyImages from "../components/form/custom_inputs/CipherKeyImages";
import KeyTypes from "../components/form/custom_inputs/KeyTypes";
function CreateCryptogramPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [cipherKeyData, setCipherKeyData] = useState(null);
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
      .get(`api/cipher-keys/${id}`)
      .then((responseData) => {
        console.log(responseData.data.data);
        setCipherKeyData(responseData.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [id]);

  const handleSubmit = () => {
    setErrors({});
    console.log(notEraseData);
    request
      .post("api/cipher-keys", formData)
      .then((response) => {
        toast.success(response.data.message, {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        console.log("Form submitted successfully", response);
        if (!notEraseData) {
          navigate(`/dashboard/cryptograms/${response.data.data.id}`);
        }
      })
      .catch((error) => {
        if (error.response) {
          setErrors(error.response.data.data);
          console.log(error.response.data.data);
          toast.error(error.response.data.message, {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
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
            defaultValue={cipherKeyData?.name}
            label={"Name"}
            placeholder="Name"
            onChange={(name, value) => handleChange(name, value)}
            errorMessage={errors?.name?.[0]}
          />
          <RichtextEditor
            defaultValue={cipherKeyData?.description}
            name={"description"}
            label={"Description"}
            onChange={(name, value) => handleChange(name, value)}
          />
          <Categories
            defaultValueMainCategory={{
              id: cipherKeyData?.category?.id,
              value: cipherKeyData?.category?.name,
            }}
            onChange={(name, value) => handleChange(name, value)}
            errorMessage={errors?.category_id?.[0]}
          />
          <CipherKeyDates
            defaultAroundDateValue={cipherKeyData?.used_around}
            defaultFromDateValue={cipherKeyData?.used_from}
            defaultToDateValue={cipherKeyData?.used_to}
            defautlDateValue={cipherKeyData?.date}
            onChange={(name, value) => handleChange(name, value)}
          />
          <Languages
            defaultValue={{
              id: cipherKeyData?.language?.id,
              value: cipherKeyData?.language?.name,
            }}
            onChange={(name, value) => handleChange(name, value)}
            errorMessage={errors?.language_id?.[0]}
          />
          <Locations
            defaultContinentValue={{
              value: cipherKeyData?.location?.continent,
            }}
            defaultLocationValue={{
              value: cipherKeyData?.location?.name,
            }}
            onChange={(name, value) => handleChange(name, value)}
            errorMessage={errors?.continent?.[0]}
          />
          <CustomTextInput
            onChange={(name, value) => handleChange(name, value)}
            name={"used_chars"}
            defaultValue={cipherKeyData?.used_chars}
            label={"Used Chars"}
            placeholder={"Used Chars"}
          />
          <Tags
            defaultValue={cipherKeyData?.tags?.map((tag) => ({
              id: tag?.id,
              value: tag?.name,
            }))}
            onChange={(name, value) => handleChange(name, value)}
          />
          <Availability
            defaultValueAvailability={cipherKeyData?.availability}
            defaultValueArchive={cipherKeyData?.folder}
            onChange={(name, value) => handleChange(name, value)}
            availabilityErrorMessage={errors?.availability?.[0]}
            archiveErrorMessage={errors?.archive?.[0]}
            folderErrorMessage={errors?.folder?.[0]}
            fondErrorMessage={errors?.fond?.[0]}
          />

          <CustomTextInput
            onChange={(name, value) => handleChange(name, value)}
            errorMessage={errors?.complete_structure}
            isRequired={true}
            defaultValue={cipherKeyData?.complete_structure}
            name={"complete_structure"}
            label={"Complete Structure"}
          />

          <CipherKeyUsers
            defaultValue={cipherKeyData?.users}
            onChange={(name, value) => handleChange(name, value)}
          />

          <KeyTypes
            onChange={(name, value) => handleChange(name, value)}
            defaultValue={cipherKeyData?.key_type}
            errorMessage={errors?.key_type}
          />

          <CipherKeyImages
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

CryptogramDetailPage.propTypes = {
  id: PropTypes.number,
};
