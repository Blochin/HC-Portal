import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import ListingTable from "../components/listing/ListingTable";
import PropTypes from "prop-types";
import { CryptogramContext } from "../context/CryptogramContext";
import { DataContext } from "../context/DataContext";

const CryptogramListingPage = ({ my }) => {
  const navigate = useNavigate();
  const {
    allCryptogramsMapped,
    myAllCryptogramsMapped,
    isLoadingAll,
    isLoadingMy,
  } = useContext(CryptogramContext);

  const {
    allCryptogramHeaders,
    myAllCryptogramHeaders,
    lessCryptogramHeaders,
    myLessCryptogramHeaders,
  } = useContext(DataContext);

  const isLoading = my ? isLoadingMy : isLoadingAll;
  const data = my ? myAllCryptogramsMapped : allCryptogramsMapped;
  const fullHeaders = my ? myAllCryptogramHeaders : allCryptogramHeaders;
  const lessHeaders = my ? myLessCryptogramHeaders : lessCryptogramHeaders;

  const handleEdit = (event, id) => {
    event.stopPropagation();
    navigate(`/dashboard/cryptograms/edit/${id}`);
  };
  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <ListingTable
            fullHeaders={fullHeaders}
            lessHeaders={lessHeaders}
            data={data}
            handleRowClick={(id) => navigate(`/dashboard/cryptograms/${id}`)}
            handleEditClick={(event, id) => handleEdit(event, id)}
          />
        </div>
      )}
    </>
  );
};
export default CryptogramListingPage;

CryptogramListingPage.propTypes = {
  my: PropTypes.bool,
};
