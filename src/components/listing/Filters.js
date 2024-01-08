import PropTypes from "prop-types";
import { Button, FloatingLabel, Modal } from "flowbite-react";
import {
  HiArrowLeftCircle,
  HiArrowRightCircle,
  HiOutlineViewColumns,
} from "react-icons/hi2";
import { useEffect, useState } from "react";
import FilterPicker from "./FilterPicker";

const Filters = ({
  headers,
  data,
  pagination,
  onFilterChange,
  onSelectHeaders,
  fullHeaders,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredHeaders, setFilteredHeaders] = useState(
    headers.filter((item) => item.is_checked),
  );
  const [selectedHeaders, setSelectedHeaders] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [offset] = useState(4);

  useEffect(() => {
    setFilteredHeaders(headers.filter((item) => item.is_checked));
  }, [headers]);

  const handleOpenModal = (value) => {
    setIsModalOpen(value);
  };

  const handleSelectedHeaders = () => {
    setIsModalOpen(false);
    setPageIndex(0);
    setFilteredHeaders(selectedHeaders);
    onSelectHeaders(selectedHeaders);
  };

  const handleNext = () => {
    if (pageIndex * offset + offset >= filteredHeaders.length) {
      return;
    }
    setPageIndex(pageIndex + 1);
  };

  const handlePrevious = () => {
    if (pageIndex === 0) {
      return;
    }
    setPageIndex(pageIndex - 1);
  };
  return (
    <div>
      <div
        className={
          "flex flex-row justify-between items-center border-b border-gray-200 pb-4"
        }
      >
        <div className={"flex flex-row"}>
          <h3 className={"font-bold"}>Total Results:</h3>
          <span className={"text-gray-500 ml-3"}>{data?.length} records</span>
        </div>
        <div className={"flex flex-row gap-2 items-center"}>
          <div>{pagination}</div>
          <div>{fullHeaders}</div>
          <div>
            <Button onClick={() => handleOpenModal(true)} color={"gray"}>
              <HiOutlineViewColumns className={"mr-1"} />
              Manage columns
            </Button>
          </div>
        </div>
      </div>

      <div className={"mt-3 flex flex-row gap-5 items-center justify-between"}>
        <div className={"w-1/2"}>
          <FloatingLabel
            variant="standard"
            onChange={(event) => onFilterChange("global", event.target.value)}
            label="Global Filter"
          />
        </div>
        <div
          className={"flex flex-row items-center justify-between w-full gap-2"}
        >
          <div>
            <HiArrowLeftCircle
              onClick={handlePrevious}
              color={"gray"}
              cursor={"pointer"}
              size={32}
            />
          </div>
          <div className={"flex flex-row gap-4"}>
            {filteredHeaders &&
              filteredHeaders.map((header, index) => {
                const isVisible =
                  index >= pageIndex * offset &&
                  index < (pageIndex + 1) * offset;

                return (
                  <div
                    key={header.value}
                    style={{ display: isVisible ? "block" : "none" }}
                  >
                    <FloatingLabel
                      onChange={(event) =>
                        onFilterChange(header.value, event.target.value)
                      }
                      variant="standard"
                      label={header.value}
                    />
                  </div>
                );
              })}
          </div>
          <div>
            <HiArrowRightCircle
              onClick={handleNext}
              color={"gray"}
              cursor={"pointer"}
              size={32}
            />
          </div>
        </div>
      </div>
      <Modal
        show={isModalOpen}
        size={"md"}
        onClose={() => handleOpenModal(false)}
      >
        <Modal.Header>Manage Columns</Modal.Header>
        <Modal.Body>
          <FilterPicker
            headers={headers}
            onSelect={(headers) =>
              setSelectedHeaders(headers.filter((item) => item?.is_checked))
            }
          />
        </Modal.Body>
        <Modal.Footer className={"flex flex-row justify-betweens"}>
          <Button onClick={handleSelectedHeaders}>Accept Columns</Button>
          <Button color="gray" onClick={() => handleOpenModal(false)}>
            Decline
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default Filters;

Filters.propTypes = {
  headers: PropTypes.array,
  data: PropTypes.array,
  pagination: PropTypes.node,
  onFilterChange: Promise.func,
  onSelectHeaders: PropTypes.func,
  fullHeaders: PropTypes.node,
};
