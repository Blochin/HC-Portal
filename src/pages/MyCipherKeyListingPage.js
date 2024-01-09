import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import ListingTable from "../components/listing/ListingTable";
import { DataContext } from "../context/DataContext";
import { mapCipherKeyData } from "../utils/helpers";

import useCipherKeys from "../hooks/useCipherKeys";

const CipherKeyListingPage = () => {
  const navigate = useNavigate();
  const { myAllCipherKeyHeaders, myLessCipherKeyHeaders } =
    useContext(DataContext);
  const { isLoading, cipherKeys, error } = useCipherKeys(true);

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
