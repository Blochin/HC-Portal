import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListingTable from "../components/listing/ListingTable";
import { DataContext } from "../context/DataContext";
import { mapCipherKeyData } from "../utils/helpers";
import { useRepository } from "../context/RepositoryContext";
import { ALL, INIT } from "../repository/Repository";

const CipherKeyListingPage = () => {
  const navigate = useNavigate();
  const { myAllCipherKeyHeaders, myLessCipherKeyHeaders } =
    useContext(DataContext);

  const [isLoading, setIsLoading] = useState(false);
  const [cipherKeys, setCipherKeys] = useState([]);
  const [error, setError] = useState(null);

  const { cipherKeyRepository } = useRepository();

  useEffect(() => {
    const initialCount = INIT;
    let fullLoadCount = ALL;

    const handleLoading = (loading) => {
      setIsLoading(loading);
    };

    const handleError = (error) => {
      setError(error);
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
