import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import ListingTable from "../components/listing/ListingTable";
import { DataContext } from "../context/DataContext";
import { mapCipherKeyData } from "../utils/helpers";
import useCipherKeys from "../hooks/useCipherKeys";

const CipherKeyListingPage = () => {
  const navigate = useNavigate();

  const { allCipherKeyHeaders, lessCipherKeyHeaders } = useContext(DataContext);
  const { isLoading, cipherKeys, error } = useCipherKeys(false);
  return (
    <>
      {isLoading || error ? (
        <div>Loading...</div>
      ) : (
        <div>
          <ListingTable
            model={"cipher_key"}
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
