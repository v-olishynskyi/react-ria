import { useState, useEffect, useCallback } from "react";
import Axios from "axios";

export default (url) => {
  const baseUrl = "https://developers.ria.com/dom/";
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState({});

  const doFetch = useCallback((options = {}) => {
    setOptions(options);
    setIsLoading(true);
  }, []);

  useEffect(() => {
    let skipGetResponseAfterDestroy = false;
    const requestOptions = {
      ...options,
    };

    if (!isLoading) return;

    Axios(`${baseUrl}${url}`, requestOptions)
      .then((res) => {
        if (!skipGetResponseAfterDestroy) {
          setIsLoading(false);
          setResponse(res.data);
        }
      })
      .catch((error) => {
        if (!skipGetResponseAfterDestroy) {
          setIsLoading(false);
          setError(error);
        }
      });

    return () => {
      skipGetResponseAfterDestroy = true;
    };
  }, [isLoading, options, url]);

  return [{ isLoading, response, error }, doFetch];
};
