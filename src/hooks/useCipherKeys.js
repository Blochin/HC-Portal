import { useState, useEffect } from "react";
import { ALL, INIT } from "../repository/Repository";
import { useRepository } from "../context/RepositoryContext";
function useCipherKeys(isMy) {
  const [isLoading, setIsLoading] = useState(false);
  const [cipherKeys, setCipherKeys] = useState([]);
  const [error, setError] = useState(null);
  const { cipherKeyRepository } = useRepository();

  useEffect(() => {
    const initialCount = INIT;
    const fullLoadCount = ALL;

    const handleLoading = (loading) => {
      setIsLoading(loading);
    };

    const handleSuccess = (data, isInitialLoad) => {
      setCipherKeys(data);
      if (isInitialLoad) {
        if (isMy) {
          cipherKeyRepository.getMy(
            fullLoadCount,
            () => {},
            (fullData) => handleSuccess(fullData, false),
            handleError,
          );
        } else {
          cipherKeyRepository.getAll(
            fullLoadCount,
            () => {},
            (fullData) => handleSuccess(fullData, false),
            handleError,
          );
        }
      }
    };

    const handleError = (error) => {
      setError(error);
    };

    if (isMy) {
      cipherKeyRepository.getMy(
        initialCount,
        handleLoading,
        (data) => handleSuccess(data, true),
        handleError,
      );
    } else {
      cipherKeyRepository.getAll(
        initialCount,
        handleLoading,
        (data) => handleSuccess(data, true),
        handleError,
      );
    }
  }, [cipherKeyRepository]);

  return {
    isLoading,
    cipherKeys,
    error,
  };
}

export default useCipherKeys;
