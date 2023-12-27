import React, { createContext, useEffect, useState } from "react";
import api from "../utils/api";
import { mapCipherKeyData } from "./helpers";
import { useUser } from "./UserContext";

export const CipherKeyContext = createContext();
// eslint-disable-next-line react/prop-types
export const CipherKeyProvider = ({ children }) => {
  const [allCipherKeysMapped, setAllCipherKeysMapped] = useState(null);
  const [myAllCipherKeysMapped, setMyAllCipherKeysMapped] = useState(null);
  const [isLoadingAll, setIsLoadingAll] = useState(true);
  const [isLoadingMy, setIsLoadingMy] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    api
      .get("api/cipher-keys?detailed=1")
      .then((response) => {
        if (response?.data?.data?.data) {
          const mappedAllCipherKeys = response.data.data.data.map((item) =>
            mapCipherKeyData(item),
          );
          setAllCipherKeysMapped(mappedAllCipherKeys);
          setIsLoadingAll(false);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (!user) {
      return;
    }
    api
      .get("api/cipher-keys/my?detailed=1")
      .then((response) => {
        if (response?.data?.data?.data) {
          const mappedMyCipherKeys = response.data.data.data.map((item) =>
            mapCipherKeyData(item),
          );
          setMyAllCipherKeysMapped(mappedMyCipherKeys);
          setIsLoadingMy(false);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [user]);

  const contextValue = {
    allCipherKeysMapped,
    myAllCipherKeysMapped,
    isLoadingAll,
    isLoadingMy,
  };

  return (
    <CipherKeyContext.Provider value={contextValue}>
      {children}
    </CipherKeyContext.Provider>
  );
};
