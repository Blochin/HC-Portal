import Form from "components/form/Form";
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
import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Checkbox, Label } from "flowbite-react";
import { toast } from "react-toastify";
import { toastOptions } from "../components/ToastOptions";
import { useRepository } from "../context/RepositoryContext";
import PairCipherKey from "../components/form/custom_inputs/PairCipherKey";
import { validateFormData } from "../utils/utils";
import CustomAlert from "../components/detail/CustomAlert";
import CustomTextArea from "../components/form/inputs/TextArea";
import UsedCharsTooltip from "../components/tooltip/UsedCharsTooltip";

// eslint-disable-next-line no-unused-vars
function CreateCryptogramPage({ edit = false }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [cryptogramData, setCryptogramData] = useState(null);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [notEraseData, setNotEraseData] = useState(false);
  const { cryptogramRepository } = useRepository();
  const toastId = useRef(null);

  const requiredFields = [
    "archive",
    "fond",
    "folder",
    "availability",
    "category_id",
    "continent",
    "language_id",
    "name",
    "solution_id",
  ];

  const handleEraseData = () => {
    setNotEraseData(!notEraseData);
  };
  const handleChange = (name, value) => {
    const updatedErrors = { ...errors };
    if (value !== null) {
      updatedErrors[name] = null;
      setErrors(updatedErrors);
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const adjustData = (data, addAction) => {
    const copyData = { ...data };

    if (!addAction) {
      return copyData;
    }
    /*
    const datagroup = data?.datagroups?.map((datagroup) => {
      const filteredData = datagroup?.data?.map(
        (group) => group?.type !== "image",
      );
      return {
        ...datagroup,
        data: filteredData,
      };
    });
     */
    const datagroup = copyData?.datagroups?.map((datagroup) => {
      const modifiedData = datagroup?.data?.map((group) => {
        if (group?.type === "image") {
          return {
            ...group,
            image: "",
          };
        }
        return group;
      });
      return {
        ...datagroup,
        data: modifiedData,
      };
    });
    console.log(datagroup);
    copyData.datagroups = datagroup;
    copyData.state = null;
    copyData.thumb = null;
    return copyData;
  };

  useEffect(() => {
    const addAction = window.location.href.includes("add");
    if (id == null) {
      setIsLoading(false);
      return;
    }
    cryptogramRepository.get(
      id,
      (isLoading) => setIsLoading(isLoading),
      (data) => setCryptogramData(adjustData(data, addAction)),
      () => {},
    );
  }, [id]);

  const handleSubmit = () => {
    setErrors({});
    toastId.current = toast("Loading...", {
      ...toastOptions,
      autoClose: false,
    });

    const isValid = validateFormData(
      formData,
      requiredFields,
      setErrors,
      toastId,
      toastOptions,
    );
    if (!isValid) {
      return;
    }

    if (edit) {
      cryptogramRepository.edit(
        id,
        formData,
        () => {},
        (data, message) => {
          toast.update(toastId.current, {
            ...toastOptions,
            render: message,
            type: "success",
          });
          navigate(`/dashboard/cryptograms/${data.id}`);
        },
        (errors, message) => {
          setErrors(errors);
          toast.update(toastId.current, {
            ...toastOptions,
            render: message,
            type: "error",
          });
        },
      );
    } else {
      cryptogramRepository.set(
        formData,
        () => {},
        (data, message) => {
          toast.update(toastId.current, {
            ...toastOptions,
            render: message,
            type: "success",
          });
          if (!notEraseData) {
            navigate(`/dashboard/cryptograms/${data.id}`);
          } else {
            window.location.href = `/dashboard/cryptograms/add/${data.id}}`;
          }
        },
        (errors, message) => {
          setErrors(errors);
          toast.update(toastId.current, {
            ...toastOptions,
            render: message,
            type: "error",
          });
        },
      );
      //setFormData((prevFormData) => ({
      //  ...prevFormData,
      // groups: null,
      //}));
    }
  };

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Form onSubmit={handleSubmit}>
          {cryptogramData && cryptogramData?.state && (
            <div className={"mb-6"}>
              <CustomAlert
                state={cryptogramData?.state?.title}
                note={cryptogramData?.note}
                heading={null}
                text={""}
              >
                <div className={"w-full"}>
                  <CustomTextArea
                    label={"Your Note"}
                    onChange={(name, value) => handleChange(name, value)}
                    name={"note"}
                  />
                </div>
              </CustomAlert>
            </div>
          )}

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
            defaultValueMainCategory={
              cryptogramData?.sub_category
                ? {
                    id: cryptogramData?.sub_category?.id,
                    value: cryptogramData?.sub_category?.name,
                  }
                : {
                    id: cryptogramData?.category?.id,
                    value: cryptogramData?.category?.name,
                  }
            }
            defaultValueSubCategory={
              cryptogramData?.sub_category && {
                id: cryptogramData?.category?.id,
                value: cryptogramData?.category?.name,
              }
            }
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
            defaultLocationValue={
              cryptogramData?.location?.name && {
                value: cryptogramData?.location?.name,
              }
            }
            onChange={(name, value) => handleChange(name, value)}
            errorMessage={errors?.continent?.[0]}
          />
          <CustomTextInput
            onChange={(name, value) => handleChange(name, value)}
            name={"used_chars"}
            defaultValue={cryptogramData?.used_chars}
            label={"Used Chars"}
            placeholder={"Used Chars"}
            tooltip={<UsedCharsTooltip />}
          />
          <Tags
            model={"cryptogram"}
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
          <PairCipherKey
            defaultValue={cryptogramData?.cipher_key_id}
            onSelect={(name, value) => handleChange(name, value)}
          />
          <DataGroups
            defaultValue={cryptogramData?.datagroups}
            onChange={(name, value) => handleChange(name, value)}
          />
          <div className={"flex flex-row items-center justify-between"}>
            <Button type={"submit"} onClick={() => {}}>
              Submit
            </Button>
            {!edit && (
              <div>
                <Label
                  className={"ml-2 mr-1"}
                  value={"Do not erase data after submit"}
                />
                <Checkbox
                  checked={notEraseData}
                  onClick={handleEraseData}
                ></Checkbox>
              </div>
            )}
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
