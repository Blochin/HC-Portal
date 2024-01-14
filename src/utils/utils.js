import { format, parseISO } from "date-fns";

export function parseDate(dateString) {
  if (dateString === undefined || dateString === null) {
    return null;
  }
  const parsedDate = parseISO(dateString);
  return format(parsedDate, "yyyy-MM-dd");
}

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
