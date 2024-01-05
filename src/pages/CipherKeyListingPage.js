import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListingTable from "../components/listing/ListingTable";
import { DataContext } from "../context/DataContext";
import { mapCipherKeyData } from "../utils/helpers";
import { useRepository } from "../context/RepositoryContext";
import { ALL, INIT } from "../repository/Repository";

const CipherKeyListingPage = () => {
  const navigate = useNavigate();
  const { allCipherKeyHeaders, lessCipherKeyHeaders } = useContext(DataContext);

  const [isLoading, setIsLoading] = useState(false);
  const [cipherKeys, setCipherKeys] = useState([]);
  const [error, setError] = useState(null);

  const { cipherKeyRepository } = useRepository();

  useEffect(() => {
    const initialCount = INIT;
    const fullLoadCount = ALL;

    const handleLoading = (loading) => {
      setIsLoading(loading);
    };

    const handleSuccess = (data, isInitialLoad) => {
      setCipherKeys(data);
      if (isInitialLoad) {
        cipherKeyRepository.getAll(
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

    cipherKeyRepository.getAll(
      initialCount,
      handleLoading,
      (data) => handleSuccess(data, true),
      handleError,
    );
  }, []);

  return (
    <>
      {isLoading || error ? (
        <div>Loading...</div>
      ) : (
        <div>
          <ListingTable
            fullHeaders={allCipherKeyHeaders}
            lessHeaders={lessCipherKeyHeaders}
            data={cipherKeys?.map((item) => mapCipherKeyData(item))}
            handleRowClick={(id) => navigate(`/dashboard/cipher-keys/${id}`)}
          />
        </div>
      )}
    </>
  );
};

export default CipherKeyListingPage;
