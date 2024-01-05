import React, { createContext, useContext, useEffect } from "react";
import { INIT } from "../repository/Repository";
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

    cipherKeyRepository.getAll(
      INIT,
      () => {},
      () => {},
      () => {},
    );

    cipherKeyRepository.getMy(
      INIT,
      () => {},
      () => {},
      () => {},
    );
  }, []);

  return (
    <RepositoryContext.Provider
      value={{ cryptogramRepository, cipherKeyRepository }}
    >
      {children}
    </RepositoryContext.Provider>
  );
}
