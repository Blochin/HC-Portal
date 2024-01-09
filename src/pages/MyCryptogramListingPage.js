import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import ListingTable from "../components/listing/ListingTable";
import { DataContext } from "../context/DataContext";
import { mapCryptogramData } from "../utils/helpers";
import useCryptograms from "../hooks/useCryptograms";

const CryptogramListingPage = () => {
  const navigate = useNavigate();
  const { myAllCryptogramHeaders, myLessCryptogramHeaders } =
    useContext(DataContext);
  const { isLoading, cryptograms, error } = useCryptograms(true);

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
            fullHeaders={myAllCryptogramHeaders}
            lessHeaders={myLessCryptogramHeaders}
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
