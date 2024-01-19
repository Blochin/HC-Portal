// dataSorter.js
import { useMemo } from "react";

const useDataSort = (data, sortConfig, parseDateFromObject) => {
  return useMemo(() => {
    let sortableItems = [...(data || [])];

    const isDate = (value) => {
      const date = new Date(value);
      return date instanceof Date && !isNaN(date);
    };

    if (sortConfig !== null && sortConfig.key) {
      sortableItems.sort((a, b) => {
        let valueA = a[sortConfig.key];
        let valueB = b[sortConfig.key];

        if (sortConfig.key === "date") {
          if (typeof valueA === "object") {
            valueA = parseDateFromObject(valueA);
          }
          if (typeof valueB === "object") {
            valueB = parseDateFromObject(valueB);
          }
        }

        let aIsDate = isDate(valueA);
        let bIsDate = isDate(valueB);

        if (aIsDate && bIsDate && sortConfig.key === "date") {
          valueA = new Date(valueA);
          valueB = new Date(valueB);
        } else if ((aIsDate || bIsDate) && sortConfig.key === "date") {
          return aIsDate ? -1 : 1;
        }

        if (typeof valueA === "string" && typeof valueB === "string") {
          valueA = valueA
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
          valueB = valueB
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
        }

        if (valueA < valueB) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (valueA > valueB) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }

    return sortableItems;
  }, [data, sortConfig, parseDateFromObject]);
};

export default useDataSort;
