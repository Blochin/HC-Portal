import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListingTable from "../components/listing/ListingTable";
import { DataContext } from "../context/DataContext";
import { mapCryptogramData } from "../utils/helpers";
import { useRepository } from "../context/RepositoryContext";
import { ALL, INIT } from "../repository/Repository";

const CryptogramListingPage = () => {
  const navigate = useNavigate();
  const { myAllCryptogramHeaders, myLessCryptogramHeaders } =
    useContext(DataContext);

  const [isLoading, setIsLoading] = useState(false);
  const [cryptograms, setCryptograms] = useState([]);
  const [error, setError] = useState(null);
  const { cryptogramRepository } = useRepository();

  useEffect(() => {
    const initialCount = INIT;
    const fullLoadCount = ALL;

    const handleLoading = (loading) => {
      setIsLoading(loading);
    };

    const handleError = (error) => {
      setError(error);
    };

    const handleSuccess = (data, isInitialLoad) => {
      setCryptograms(data);
      if (isInitialLoad) {
        cryptogramRepository.getMy(
          fullLoadCount,
          () => {},
          (fullData) => handleSuccess(fullData, false),
          handleError,
        );
      }
    };

    cryptogramRepository.getMy(
      initialCount,
      handleLoading,
      (data) => handleSuccess(data, true),
      handleError,
    );
  }, []);

  let lessHeaders = myLessCryptogramHeaders;
  let fullHeaders = myAllCryptogramHeaders;

  const handleEdit = (event, id) => {
    event.stopPropagation();
    navigate(`/dashboard/cryptograms/edit/${id}`);
  };
  return (
    <>
      {isLoading || error ? (
        <div>Loading...</div>
      ) : (
        <div>
          <ListingTable
            fullHeaders={fullHeaders}
            lessHeaders={lessHeaders}
            data={cryptograms?.map((item) => mapCryptogramData(item))}
            handleRowClick={(id) => navigate(`/dashboard/cryptograms/${id}`)}
            handleEditClick={(event, id) => handleEdit(event, id)}
          />
        </div>
      )}
    </>
  );
};
export default CryptogramListingPage;
