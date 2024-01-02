import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListingTable from "../components/listing/ListingTable";
import { DataContext } from "../context/DataContext";
import { mapCipherKeyData } from "../utils/helpers";
import CipherKeyRepository from "../repository/CipherKeyRepository";

const CipherKeyListingPage = () => {
  const navigate = useNavigate();
  const { myAllCipherKeyHeaders, myLessCipherKeyHeaders } =
    useContext(DataContext);

  const [isLoading, setIsLoading] = useState(false);
  const [cipherKeys, setCipherKeys] = useState([]);
  const [error, setError] = useState(null);

  const cipherKeyRepository = new CipherKeyRepository();

  useEffect(() => {
    const initialCount = 50;
    const fullLoadCount = 9999;

    const handleLoading = (loading) => {
      setIsLoading(loading);
    };

    const handleSuccess = (data, isInitialLoad) => {
      setCipherKeys(data);
      if (isInitialLoad) {
        cipherKeyRepository.getMy(
          fullLoadCount,
          () => {},
          (fullData) => handleSuccess(fullData, false),
          handleError,
        );
      }
    };

    const handleError = (error) => {
      setError(error);
    };

    cipherKeyRepository.getMy(
      initialCount,
      handleLoading,
      (data) => handleSuccess(data, true),
      handleError,
    );
  }, []);

  const handleEdit = (event, id) => {
    event.stopPropagation();
    navigate(`/dashboard/cipher-keys/edit/${id}`);
  };
  return (
    <>
      {isLoading || error ? (
        <div>Loading...</div>
      ) : (
        <div>
          <ListingTable
            fullHeaders={myAllCipherKeyHeaders}
            lessHeaders={myLessCipherKeyHeaders}
            data={cipherKeys?.map((item) => mapCipherKeyData(item))}
            handleRowClick={(id) => navigate(`/dashboard/cipher-keys/${id}`)}
            handleEditClick={(event, id) => handleEdit(event, id)}
          />
        </div>
      )}
    </>
  );
};

export default CipherKeyListingPage;
