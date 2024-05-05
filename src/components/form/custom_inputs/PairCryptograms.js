import { HiCursorClick } from "react-icons/hi";
import React, { useContext, useEffect, useState } from "react";
import { Button, Label, Modal } from "flowbite-react";
import { DataContext } from "../../../context/DataContext";
import ListingTable from "../../listing/ListingTable";
import { mapCryptogramData } from "../../../utils/helpers";
import { useRepository } from "../../../context/RepositoryContext";
import PropTypes from "prop-types";
import useCryptograms from "../../../hooks/useCryptograms";
import BadgeTrigger from "../inputs/dropdown/trigger/BadgeTrigger";

const PairCryptograms = ({ defaultValue, onSelect }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCryptograms, setSelectedCryptograms] = useState([]);
  const { allCryptogramHeaders, lessCryptogramHeaders } =
    useContext(DataContext);
  const { cryptogramRepository } = useRepository();
  const { isLoading, cryptograms, error } = useCryptograms(false);
  const {
    isLoading: isLoadingMy,
    cryptograms: cryptogramsMy,
    error: errorMy,
  } = useCryptograms(true);

  const handleModal = (value) => {
    setModalOpen(value);
  };

  const handleRowClick = (id) => {
    setModalOpen(false);
    cryptogramRepository.get(
      id,
      () => {},
      (cryptogram) => {
        setSelectedCryptograms((prevSelectedCryptograms) => {
          const isSelected = prevSelectedCryptograms?.some(
            (selected) => selected.id === cryptogram?.id,
          );
          if (!isSelected) {
            return [
              ...prevSelectedCryptograms,
              {
                id: cryptogram?.id,
                value: cryptogram?.name,
              },
            ];
          }
          return prevSelectedCryptograms;
        });
      },
      () => {},
    );
  };

  const handleRemove = (value, event) => {
    event.stopPropagation();
    setSelectedCryptograms((prevSelectedCryptograms) => {
      return prevSelectedCryptograms.filter(
        (selected) => selected.value !== value.value,
      );
    });
  };

  useEffect(() => {
    onSelect(
      "cryptograms_id",
      selectedCryptograms?.map((cryptogram) => cryptogram.id),
    );
  }, [selectedCryptograms]);

  useEffect(() => {
    const newSelectedCryptograms = [];
    if (!defaultValue) {
      return;
    }
    defaultValue.forEach((id) => {
      cryptogramRepository.get(
        id,
        () => {},
        (cryptogram) => {
          newSelectedCryptograms.push({
            id: cryptogram?.id,
            value: cryptogram?.name,
          });
          if (newSelectedCryptograms.length === defaultValue.length) {
            setSelectedCryptograms(newSelectedCryptograms);
          }
        },
        () => {
          console.error(`Error fetching data for defaultValue ${defaultValue}`);
        },
      );
    });
  }, [defaultValue]);

  return (
    <div className={"mb-6"}>
      <div className="mb-2 block">
        <Label value={"Pair Cryptograms"} />
      </div>
      <div
        onClick={() => handleModal(true)}
        className={`flex items-center justify-between bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
      >
        <BadgeTrigger
          selectedValues={selectedCryptograms}
          label={"Pair Cryptograms"}
          handleRemove={(value, event) => handleRemove(value, event)}
        />
        <HiCursorClick className={"ms-1.5"} size={16} />
      </div>
      <Modal show={modalOpen} size={"6xl"} onClose={() => handleModal(false)}>
        <Modal.Header>Pair Cryptogram</Modal.Header>
        <Modal.Body>
          {(isLoading && isLoadingMy) || (error && errorMy) ? (
            <div>Loading</div>
          ) : (
            <ListingTable
              model={"cryptogram"}
              fullHeaders={allCryptogramHeaders}
              lessHeaders={lessCryptogramHeaders}
              data={
                [
                  ...cryptogramsMy.map((item) => mapCryptogramData(item)),
                  ...(cryptograms?.map((item) => mapCryptogramData(item)) ||
                    []),
                ].reduce(
                  (acc, curr) => {
                    if (!acc.idSet.has(curr.id)) {
                      acc.idSet.add(curr.id);
                      acc.result.push(curr);
                    }
                    return acc;
                  },
                  { result: [], idSet: new Set() },
                ).result
              }
              handleRowClick={(id) => handleRowClick(id)}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button color="gray" onClick={() => handleModal(false)}>
            Decline
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

PairCryptograms.propTypes = {
  defaultValue: PropTypes.number,
  onSelect: PropTypes.func.isRequired,
};
export default PairCryptograms;
