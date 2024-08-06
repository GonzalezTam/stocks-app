import { useState, useEffect, useCallback } from 'react';
import createApiClient from '../utils/apiClient';
import { StockDetailResponseInterface } from '../types';
import { Dayjs } from 'dayjs';

const apiClient = createApiClient(
  import.meta.env.VITE_TWELVEDATA_BASE_URL,
  import.meta.env.VITE_TWELVEDATA_API_KEY,
);

export const useFetchStockDetail = (
  symbol: string,
  market: string,
  interval: string,
  startDate: Dayjs | null,
  endDate: Dayjs | null,
) => {
  const [data, setData] = useState<StockDetailResponseInterface>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  let url;
  if (startDate && endDate) {
    url = `/time_series?symbol=${symbol}&exchange=${market}&interval=${interval}&start_date=${startDate}&end_date=${endDate}`;
  } else {
    url = `/time_series?symbol=${symbol}&exchange=${market}&interval=${interval}`;
  }

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.get(url);
      if (response.status !== 200) throw new Error();
      setData(response.data);
    } catch (error) {
      setError('Ups! Something went wrong');
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};
