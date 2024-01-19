import TextFieldTrigger from "../inputs/dropdown/trigger/TextFieldTrigger";
import { HiCursorClick } from "react-icons/hi";
import React, { useContext, useEffect, useState } from "react";
import { Button, Label, Modal } from "flowbite-react";
import { DataContext } from "../../../context/DataContext";
import ListingTable from "../../listing/ListingTable";
import { mapCipherKeyData } from "../../../utils/helpers";
import useCipherKeys from "../../../hooks/useCipherKeys";
import { useRepository } from "../../../context/RepositoryContext";
import PropTypes from "prop-types";

const PairCipherKey = ({ defaultValue, onSelect }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCipherKey, setSelectedCipherKey] = useState(null);
  const { allCipherKeyHeaders, lessCipherKeyHeaders } = useContext(DataContext);
  const { cipherKeyRepository } = useRepository();
  const { isLoading, cipherKeys, error } = useCipherKeys(false);
  const {
    isLoading: isLoadingMy,
    cipherKeys: cipherKeysMy,
    error: errorMy,
  } = useCipherKeys(true);

  const handleModal = (value) => {
    setModalOpen(value);
  };

  const handleRemove = (value, event) => {
    event.stopPropagation();
    setSelectedCipherKey(null);
  };

  const handleRowClick = (id) => {
    setModalOpen(false);
    cipherKeyRepository.get(
      id,
      () => {},
      (cipherKey) => {
        setSelectedCipherKey([
          {
            id: cipherKey?.id,
            value: cipherKey?.name,
          },
        ]);
      },
      () => {},
    );
  };

  useEffect(() => {
    onSelect(
      "cipher_key_id",
      selectedCipherKey?.[0]?.id ? selectedCipherKey?.[0]?.id : null,
    );
  }, [selectedCipherKey]);

  useEffect(() => {
    cipherKeyRepository.get(
      defaultValue,
      () => {},
      (cipherKey) => {
        setSelectedCipherKey([
          {
            id: cipherKey?.id,
            value: cipherKey?.name,
          },
        ]);
      },
      () => {},
    );
  }, [defaultValue]);

  return (
    <div className={"mb-6"}>
      <div className="mb-2 block">
        <Label value={"Pair Cipher Key"} />
      </div>
      <div
        onClick={() => handleModal(true)}
        className={`flex items-center justify-between bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
      >
        <TextFieldTrigger
          handleRemove={(value, event) => handleRemove(value, event)}
          selectedValues={selectedCipherKey}
          label={"Pair Cryptograms"}
        />
        <HiCursorClick className={"ms-1.5"} size={16} />
      </div>
      <Modal show={modalOpen} size={"6xl"} onClose={() => handleModal(false)}>
        <Modal.Header>Pair cipher key</Modal.Header>
        <Modal.Body>
          {(isLoading && isLoadingMy) || (error && errorMy) ? (
            <div>Loading</div>
          ) : (
            <ListingTable
              fullHeaders={allCipherKeyHeaders}
              lessHeaders={lessCipherKeyHeaders}
              data={[
                ...cipherKeysMy.map((item) => mapCipherKeyData(item)),
                ...(cipherKeys?.map((item) => mapCipherKeyData(item)) || []),
              ]}
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

PairCipherKey.propTypes = {
  defaultValue: PropTypes.number,
  onSelect: PropTypes.func.isRequired,
};
export default PairCipherKey;
