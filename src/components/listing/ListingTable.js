import PropTypes from "prop-types";
import { Button, Table } from "flowbite-react";
import { useEffect, useMemo, useState } from "react";
import CustomPagination from "../Pagination";
import Dropdown from "../form/inputs/dropdown/Dropdown";
import CustomCell from "./Cell";
import CustomHeaderCell from "./HeaderCell";
import { parseDateFromObject } from "../../utils/utils";
import Filters from "./Filters";
import { HiOutlineFunnel } from "react-icons/hi2";

const ListingTable = ({
  fullHeaders,
  hideSearchBar = false,
  lessHeaders,
  data,
  handleRowClick,
  handleEditClick,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [copyHeaders, setCopyHeaders] = useState(lessHeaders);
  const [totalPages, setTotalPages] = useState(0);
  const [filters, setFilters] = useState({});
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [perPage, setPerPage] = useState(10);
  const [addFilters, setAddFilters] = useState(false);

  const perPageOptions = [
    { value: "5" },
    { value: "10" },
    { value: "25" },
    { value: "50" },
  ];

  const handleFilterChange = (key, value) => {
    if (value === "") {
      if (filters.length === 0) {
        setFilters([]);
        return;
      }
      setFilters(filters);
    }
    setFilters({
      ...filters,
      [key]: value,
    });
  };

  const filteredData = useMemo(() => {
    return data?.filter((item) => {
      if (Object.keys(filters).length === 0) {
        return true;
      }

      let globalSearch = "";

      if (Object.prototype.hasOwnProperty.call(filters, "global")) {
        globalSearch = filters["global"].toLowerCase();
      }

      return (
        Object.entries(filters).every(([key, value]) => {
          if (key === "global") {
            return true;
          }

          return item[key]
            ?.toString()
            ?.toLowerCase()
            ?.includes(value?.toLowerCase());
        }) &&
        (Object.values(item).some(
          (val) => val && val.toString().toLowerCase().includes(globalSearch),
        ) ||
          globalSearch === "")
      );
    });
  }, [data, filters]);

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedAndFilteredData = useMemo(() => {
    let sortableItems = [...(filteredData || [])];

    const isDate = (value) => {
      const date = new Date(value);
      return date instanceof Date && !isNaN(date);
    };

    if (sortConfig !== null && sortConfig.key) {
      sortableItems.sort((a, b) => {
        let valueA = a[sortConfig.key];
        let valueB = b[sortConfig.key];

        if (sortConfig.key === "date") {
          if (typeof valueA == "object") {
            valueA = parseDateFromObject(valueA);
          }
          if (typeof valueB == "object") {
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
  }, [filteredData, sortConfig]);

  useEffect(() => {
    if (filteredData) {
      const totalItems = filteredData.length;
      const pages = Math.ceil(totalItems / perPage);
      setTotalPages(pages);
    }
  }, [filteredData, perPage]);

  const handleHeaders = () => {
    setAddFilters(!addFilters);
    if (!addFilters === true) {
      setCopyHeaders(fullHeaders);
    } else {
      setCopyHeaders(lessHeaders);
      setFilters({});
    }
  };

  useEffect(() => {
    setCopyHeaders(addFilters ? fullHeaders : lessHeaders);
  }, [fullHeaders, lessHeaders, addFilters]);

  return (
    <div>
      {!hideSearchBar && (
        <div className={"flex flex-row justify-between items-center"}>
          <div></div>
        </div>
      )}

      <Filters
        headers={fullHeaders.map((item) => ({
          value: item,
          is_checked: copyHeaders.includes(item),
        }))}
        onSelectHeaders={(headers) =>
          setCopyHeaders(headers.map((item) => item.value))
        }
        onFilterChange={(key, value) => handleFilterChange(key, value)}
        data={data}
        pagination={
          <div className={"w-32"}>
            <Dropdown
              isMulti={false}
              withMeta={false}
              value={{ value: perPage }}
              data={perPageOptions}
              name={"per_page"}
              canAddNew={false}
              canRemove={false}
              onSelect={(name, value) =>
                setPerPage(value?.value ? parseInt(value.value) : perPage)
              }
            />
          </div>
        }
        fullHeaders={
          <Button
            label={"Add Filters"}
            color={"gray"}
            checked={addFilters}
            onClick={handleHeaders}
          >
            <HiOutlineFunnel className={"mr-1"} />
            {!addFilters ? "Full Filters" : "Less Filters"}
          </Button>
        }
      />

      <div className={"overflow-x-auto shadow-lg"}>
        <Table striped hoverable>
          <Table.Head>
            {copyHeaders?.map((header) => (
              <CustomHeaderCell
                key={header}
                header={header}
                sortConfig={sortConfig}
                onSort={handleSort}
                onFilterChange={handleFilterChange}
              />
            ))}
          </Table.Head>
          <Table.Body className="divide-y">
            {sortedAndFilteredData
              ?.slice(
                (currentPage - 1) * perPage,
                (currentPage - 1) * perPage + perPage,
              )
              ?.map((item, index) => {
                return (
                  <Table.Row
                    className={"cursor-pointer"}
                    key={index}
                    onClick={() => handleRowClick(item["id"])}
                  >
                    {copyHeaders.map((header) => (
                      <CustomCell
                        key={`${header}-${index}`}
                        item={item}
                        header={header}
                        onClick={(event) => handleEditClick(event, item["id"])}
                      />
                    ))}
                  </Table.Row>
                );
              })}
          </Table.Body>
        </Table>
      </div>
      <CustomPagination
        current={currentPage}
        onChangeCurrent={(page) => setCurrentPage(page)}
        totalPages={totalPages}
      />
    </div>
  );
};

export default ListingTable;

ListingTable.propTypes = {
  fullHeaders: PropTypes.array,
  hideSearchBar: PropTypes.bool,
  lessHeaders: PropTypes.array,
  data: PropTypes.array,
  handleSort: PropTypes.func,
  sortConfig: PropTypes.object,
  handleRowClick: PropTypes.func,
  handleEditClick: PropTypes.func,
  handleFilterChange: PropTypes.func,
  currentPage: PropTypes.number,
  perPage: PropTypes.number,
};
