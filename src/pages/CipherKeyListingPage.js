import PropTypes from "prop-types";
import { useContext } from "react";
import { CipherKeyContext } from "../context/CipherKeyContext";
import { useNavigate } from "react-router-dom";
import ListingTable from "../components/listing/ListingTable";
import { DataContext } from "../context/DataContext";

const CipherKeyListingPage = ({ my }) => {
  const navigate = useNavigate();
  const {
    allCipherKeysMapped,
    myAllCipherKeysMapped,
    isLoadingAll,
    isLoadingMy,
  } = useContext(CipherKeyContext);

  const {
    allCipherKeyHeaders,
    myAllCipherKeyHeaders,
    lessCipherKeyHeaders,
    myLessCipherKeyHeaders,
  } = useContext(DataContext);

  const isLoading = my ? isLoadingMy : isLoadingAll;
  const data = my ? myAllCipherKeysMapped : allCipherKeysMapped;
  const fullHeaders = my ? myAllCipherKeyHeaders : allCipherKeyHeaders;
  const lessHeaders = my ? myLessCipherKeyHeaders : lessCipherKeyHeaders;

  const handleEdit = (event, id) => {
    event.stopPropagation();
    navigate(`/dashboard/cipher-keys/edit/${id}`);
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
            handleRowClick={(id) => navigate(`/dashboard/cipher-keys/${id}`)}
            handleEditClick={(event, id) => handleEdit(event, id)}
          />
        </div>
      )}
    </>
  );
};

CipherKeyListingPage.propTypes = {
  my: PropTypes.bool,
};
export default CipherKeyListingPage;
