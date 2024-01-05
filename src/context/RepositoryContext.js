import React, { createContext, useContext, useEffect } from "react";
import CryptogramRepository, { INIT } from "../repository/CryptogramRepository";

const RepositoryContext = createContext(null);

export function useRepository() {
  return useContext(RepositoryContext);
}

// eslint-disable-next-line react/prop-types
export function RepositoryProvider({ children }) {
  const cryptogramRepository = new CryptogramRepository();

  useEffect(() => {
    cryptogramRepository.getAll(
      INIT,
      () => {},
      () => {},
      () => {},
    );

    cryptogramRepository.getMy(
      INIT,
      () => {},
      () => {},
      () => {},
    );
  }, []);

  return (
    <RepositoryContext.Provider value={{ cryptogramRepository }}>
      {children}
    </RepositoryContext.Provider>
  );
}
