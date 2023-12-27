export function parseDate(dateString) {
  if (dateString === undefined) {
    return null;
  }
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
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
          resolve({ base64: reader.result, tempURL });
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
