import React, { createContext, useEffect, useState } from "react";
import api from "../utils/api";
import { mapCryptogramData } from "./helpers";
import { useUser } from "./UserContext";

export const CryptogramContext = createContext();
// eslint-disable-next-line react/prop-types
export const CryptogramProvider = ({ children }) => {
  const [allCryptogramsMapped, setAllCryptogramsMapped] = useState(null);
  const [myAllCryptogramsMapped, setMyAllCryptogramsMapped] = useState(null);
  const [isLoadingAll, setIsLoadingAll] = useState(true);
  const [isLoadingMy, setIsLoadingMy] = useState(true);

  const { user } = useUser();

  useEffect(() => {
    api
      .get("api/cryptograms?detailed=1")
      .then((response) => {
        if (response?.data?.data?.data) {
          const mappedAllCryptograms = response.data.data.data.map((item) =>
            mapCryptogramData(item),
          );
          setAllCryptogramsMapped(mappedAllCryptograms);
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
      .get("api/cryptograms/my?detailed=1")
      .then((response) => {
        if (response?.data?.data?.data) {
          const mappedAllCryptograms = response.data.data.data.map((item) =>
            mapCryptogramData(item),
          );
          setMyAllCryptogramsMapped(mappedAllCryptograms);
          setIsLoadingMy(false);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [user]);

  const contextValue = {
    allCryptogramsMapped,
    myAllCryptogramsMapped,
    isLoadingAll,
    isLoadingMy,
  };

  return (
    <CryptogramContext.Provider value={contextValue}>
      {children}
    </CryptogramContext.Provider>
  );
};
