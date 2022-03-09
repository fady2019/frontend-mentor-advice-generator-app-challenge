import { useCallback, useState } from 'react';

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const sendRequest = useCallback(async (url, options) => {
    setIsLoading(true);

    try {
      const res = await fetch(url, options);

      if (!res.ok) {
        throw new Error('Something went wrong, try again!');
      }

      const data = await res.json();

      setResponse(data);
    } catch (err) {
      setError(err.message || 'Something went wrong!');
    }

    setIsLoading(false);
  }, []);

  return [sendRequest, response, isLoading, error];
};

export default useHttp;
