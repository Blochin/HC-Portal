import React, { createContext, useContext } from "react";
import CryptogramRepository from "../repository/CryptogramRepository";
import CipherKeyRepository from "../repository/CipherKeyRepository";

const RepositoryContext = createContext(null);

export function useRepository() {
  return useContext(RepositoryContext);
}

// eslint-disable-next-line react/prop-types
export function RepositoryProvider({ children }) {
  const cryptogramRepository = new CryptogramRepository();
  const cipherKeyRepository = new CipherKeyRepository();

  return (
    <RepositoryContext.Provider
      value={{ cryptogramRepository, cipherKeyRepository }}
    >
      {children}
    </RepositoryContext.Provider>
  );
}
