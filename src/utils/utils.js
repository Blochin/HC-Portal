import { format, parseISO } from "date-fns";
import { toast } from "react-toastify";

export function parseDate(dateString) {
  if (dateString === undefined || dateString === null) {
    return null;
  }
  const parsedDate = parseISO(dateString);
  return format(parsedDate, "yyyy-MM-dd");
}

export const formatLabel = (string) => {
  return string
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export function parseHumanDate(dateString) {
  if (dateString === undefined || dateString === null) {
    return null;
  }
  const parsedDate = parseISO(dateString);
  return format(parsedDate, "yyyy.MM.dd");
}

export function parseDateFromString(str) {
  if (!str) {
    return null;
  }
  const datePattern = /\d{4}.\d{2}.\d{2}/;
  const match = str?.match(datePattern);

  if (match) {
    const dateString = match[0];
    return new Date(dateString);
  }

  return null;
}
export function parseDateFromObject(obj) {
  if (
    typeof obj === "object" &&
    obj?.props &&
    Array.isArray(obj.props.children)
  ) {
    for (const child of obj.props.children) {
      if (typeof child === "string") {
        const date = parseDateFromString(child);
        if (date) {
          return date;
        }
      }
    }
  }
  return null;
}

export const createImageHandler = (
  setComponentsFunction,
  createComponentData,
) => {
  return (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) {
      return;
    }

    const filePromises = files.map((file) => {
      const tempURL = URL.createObjectURL(file);

      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve({ base64: reader.result, tempURL, fileName: file.name });
        };
        reader.onerror = (error) => {
          URL.revokeObjectURL(tempURL);
          reject(error);
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(filePromises)
      .then((imagesData) => {
        const newComponents = imagesData.map((imageData) =>
          createComponentData(imageData),
        );
        setComponentsFunction((prevComponents) => [
          ...prevComponents,
          ...newComponents,
        ]);
      })
      .catch((error) => console.error("Error in processing files:", error))
      .finally(() => {
        event.target.value = null;
      });
  };
};

export function validateFormData(
  formData,
  requiredFields,
  setErrors,
  toastId,
  toastOptions,
) {
  let missingFields = requiredFields.filter((field) => formData[field] == null);
  let itContainArchive = missingFields.includes("archive");
  let itContainFolder = missingFields.includes("folder");
  let itContainFond = missingFields.includes("fond");
  let itContainAvailability = missingFields.includes("availability");

  missingFields = missingFields.filter((item) => {
    if (item === "availability") {
      return itContainArchive || itContainFond || itContainFolder;
    }
    if (item === "archive" || item === "fond" || item === "folder") {
      return itContainAvailability;
    }
    return true;
  });

  console.log(missingFields);

  if (missingFields.length > 0) {
    const errorMessages = {};
    missingFields.forEach((field) => {
      errorMessages[field] = [
        `The ${field.replace(/_/g, " ")} field is required.`,
      ];
    });
    setErrors(errorMessages);
    toast.update(toastId.current, {
      ...toastOptions,
      render: "The given data was invalid.",
      type: "error",
    });
    return false;
  }
  return true;
}

export const truncateDescription = (description, length) => {
  if (description.length > length) {
    return description.slice(0, length) + " ...";
  }
  return description;
};
