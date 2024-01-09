import { useEffect, useState } from "react";
import { useRepository } from "../context/RepositoryContext";
import { ALL, INIT } from "../repository/Repository";

function useCryptograms(isMy) {
  const [isLoading, setIsLoading] = useState(false);
  const [cryptograms, setCryptograms] = useState([]);
  const [error, setError] = useState(null);
  const { cryptogramRepository } = useRepository();

  useEffect(() => {
    const initialCount = INIT;
    const fullLoadCount = ALL;

    const handleLoading = (loading) => {
      setIsLoading(loading);
    };

    const handleSuccess = (data, isInitialLoad) => {
      setCryptograms(data);
      if (isInitialLoad) {
        if (isMy) {
          cryptogramRepository.getMy(
            fullLoadCount,
            () => {},
            (fullData) => handleSuccess(fullData, false),
            handleError,
          );
        } else {
          cryptogramRepository.getAll(
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
      cryptogramRepository.getMy(
        initialCount,
        handleLoading,
        (data) => handleSuccess(data, true),
        handleError,
      );
    } else {
      cryptogramRepository.getAll(
        initialCount,
        handleLoading,
        (data) => handleSuccess(data, true),
        handleError,
      );
    }
  }, [cryptogramRepository]);

  return {
    isLoading,
    cryptograms,
    error,
  };
}

export default useCryptograms;
