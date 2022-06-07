import { useCallback, useState } from 'react';
import { useMessage } from './useMessage';

export const useApi = (
  apiCallback = () => { },
  options = {
    onSuccess: () => { },
    onError: () => { },
  },
) => {
  const { onError, onSuccess } = options;
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const showMessage = useMessage();

  const request = useCallback(
    async (params) => {
      setLoading(true);
      try {
        const response = await apiCallback(params);
        const data = response.data;
        onSuccess()
        showMessage(data.message)
        return data
      } catch (err) {
        onError()
        showMessage(err?.response?.data?.message)
        throw err;
      } finally {
        setLoading(false);
        error && setError(null);
      }
    },
    [apiCallback, onError, onSuccess],
  );

  return {
    loading,
    request,
  };
};
