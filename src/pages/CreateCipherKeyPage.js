import Form from "components/form/Form";
import Locations from "components/form/custom_inputs/Locations";
import Tags from "components/form/custom_inputs/Tags";
import RichtextEditor from "components/form/inputs/RichtextEditor";
import CustomTextInput from "components/form/inputs/TextInput";
import Categories from "../components/form/custom_inputs/Categories";
import Availability from "../components/form/custom_inputs/Availability";
import Languages from "../components/form/custom_inputs/Languages";
import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Checkbox, Label, Tooltip } from "flowbite-react";
import { toast } from "react-toastify";
import CipherKeyDates from "../components/form/custom_inputs/CipherKeyDates";
import CipherKeyUsers from "../components/form/custom_inputs/CipherKeyUsers";
import CipherKeyImages from "../components/form/custom_inputs/CipherKeyImages";
import KeyTypes from "../components/form/custom_inputs/KeyTypes";
import { toastOptions } from "../components/ToastOptions";
import { useRepository } from "../context/RepositoryContext";
import PairCryptograms from "../components/form/custom_inputs/PairCryptograms";
import { validateFormData } from "../utils/utils";
import CustomAlert from "../components/detail/CustomAlert";
import CustomTextArea from "../components/form/inputs/TextArea";
import UsedCharsTooltip from "../components/tooltip/UsedCharsTooltip";
import CompleteStructureTooltip from "../components/tooltip/CompleteStructureTooltip";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi";
function CreateCipherKeyPage({ edit = false }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [cipherKeyData, setCipherKeyData] = useState(null);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [notEraseData, setNotEraseData] = useState(false);
  const { cipherKeyRepository } = useRepository();
  const toastId = useRef(null);
  const [thumbnail, setThumbnail] = useState(null);

  const requiredFields = [
    "archive",
    "fond",
    "folder",
    "availability",
    "category_id",
    "continent",
    "language_id",
    "name",
    "complete_structure",
    "key_type",
    "language_id",
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
    console.log(formData, { [name]: value });
  };

  const adjustData = (data, addAction) => {
    const copyData = { ...data };

    if (!addAction) {
      return copyData;
    }

    copyData.state = null;
    copyData.images = null;

    return copyData;
  };

  useEffect(() => {
    const addAction = window.location.href.includes("add");
    if (id == null) {
      setIsLoading(false);
      return;
    }
    cipherKeyRepository.get(
      id,
      (isLoading) => setIsLoading(isLoading),
      (data) => {
        setCipherKeyData(adjustData(data, addAction));
        setThumbnail(data?.images?.[0]?.url?.original);
      },
      () => {},
    );
  }, [id]);

  console.log(cipherKeyData);

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
      cipherKeyRepository.edit(
        id,
        formData,
        () => {},
        (data, message) => {
          toast.update(toastId.current, {
            ...toastOptions,
            render: message,
            type: "success",
          });
          navigate(`/dashboard/cipher-keys/${data.id}`);
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
      cipherKeyRepository.set(
        formData,
        () => {},
        (data, message) => {
          toast.update(toastId.current, {
            ...toastOptions,
            render: message,
            type: "success",
          });
          if (!notEraseData) {
            navigate(`/dashboard/cipher-keys/${data.id}`);
          } else {
            window.location.href = `/dashboard/cipher-keys/add/${data.id}}`;
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
    }
  };
  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Form onSubmit={handleSubmit}>
          {cipherKeyData && cipherKeyData?.state && (
            <div className={"mb-6"}>
              <CustomAlert
                state={cipherKeyData?.state?.title}
                note={cipherKeyData?.note}
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
            defaultValue={cipherKeyData?.name}
            label={"Name"}
            placeholder="Name"
            onChange={(name, value) => handleChange(name, value)}
            errorMessage={errors?.name?.[0]}
          />
          <div className={"mb-6"}>
            <div className={"flex flex-row gap-3"}>
              <Label className={"mb-2"}>Thumbnail</Label>
              <Tooltip
                content={
                  "Thumbnail is generated form first image attached in form"
                }
              >
                <HiOutlineQuestionMarkCircle
                  className={"text-gray-500"}
                  size={20}
                />
              </Tooltip>
            </div>
            <img
              src={thumbnail ? thumbnail : "/missing_image.jpeg"}
              alt="Cropped"
              className="w-full h-64 p-1 object-contain border-dashed border-2 rounded-lg"
            />
          </div>
          <RichtextEditor
            defaultValue={cipherKeyData?.description}
            name={"description"}
            label={"Description"}
            onChange={(name, value) => handleChange(name, value)}
          />
          <Categories
            defaultValueMainCategory={
              cipherKeyData?.sub_category
                ? {
                    id: cipherKeyData?.sub_category?.id,
                    value: cipherKeyData?.sub_category?.name,
                  }
                : {
                    id: cipherKeyData?.category?.id,
                    value: cipherKeyData?.category?.name,
                  }
            }
            defaultValueSubCategory={
              cipherKeyData?.sub_category && {
                id: cipherKeyData?.category?.id,
                value: cipherKeyData?.category?.name,
              }
            }
            onChange={(name, value) => handleChange(name, value)}
            errorMessage={errors?.category_id?.[0]}
          />
          <CipherKeyDates
            defaultAroundDateValue={cipherKeyData?.used_around}
            defaultFromDateValue={cipherKeyData?.used_from}
            defaultToDateValue={cipherKeyData?.used_to}
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
            tooltip={<UsedCharsTooltip />}
          />
          <Tags
            model={"cipher_key"}
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
            placeholder={"Complete Structure"}
            tooltip={<CompleteStructureTooltip />}
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

          <PairCryptograms
            onSelect={(name, value) => handleChange(name, value)}
            defaultValue={cipherKeyData?.cryptograms_id}
          />
          <CipherKeyImages
            defaultValue={cipherKeyData?.images}
            getThumbnail={(thumbnail) => {
              if (thumbnail !== null) {
                setThumbnail(thumbnail);
              }
            }}
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

export default CreateCipherKeyPage;

CreateCipherKeyPage.propTypes = {
  edit: PropTypes.bool,
};
