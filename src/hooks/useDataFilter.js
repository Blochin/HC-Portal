import { useMemo } from "react";
const useDataFilter = (data, filters, copyHeaders) => {
  return useMemo(() => {
    return data?.filter((item) => {
      if (Object.keys(filters).length === 0) {
        return true;
      }

      let globalSearch = "";

      if (Object.prototype.hasOwnProperty.call(filters, "global")) {
        globalSearch = filters["global"].toLowerCase();
      }

      return (
        Object.entries(filters)?.every(([key, value]) => {
          if (key === "global") {
            return true;
          }

          if (copyHeaders.includes(key)) {
            if (Array.isArray(item[key])) {
              if (Array.isArray(value)) {
                return value.every((filterValue) =>
                  item[key].includes(filterValue),
                );
              } else {
                return (
                  value === "" ||
                  item[key]
                    ?.toString()
                    ?.toLowerCase()
                    ?.includes(value?.toLowerCase())
                );
              }
            } else {
              return (
                value === "" ||
                item[key]
                  ?.toString()
                  ?.toLowerCase()
                  ?.includes(value?.toLowerCase())
              );
            }
          }
          return true;
        }) &&
        (Object.keys(item).some(
          (key) =>
            copyHeaders.includes(key) &&
            item[key] &&
            item[key].toString().toLowerCase().includes(globalSearch),
        ) ||
          globalSearch === "")
      );
    });
  }, [data, filters, copyHeaders]);
};

export default useDataFilter;
