import { useState, useEffect } from 'react';
import createApiClient from '../utils/apiClient';
import { MarketType, StockInterface } from '../types';

const apiClient = createApiClient(
  import.meta.env.VITE_TWELVEDATA_BASE_URL,
  import.meta.env.VITE_TWELVEDATA_API_KEY,
);

export const useFetchStockList = (market: MarketType) => {
  const [data, setData] = useState<StockInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const url = `stocks?source=docs&exchange=${market}`;
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get(url);
        if (response.status !== 200) throw new Error();
        setData(response.data.data);
      } catch (error) {
        setError('Ups! Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [market]);

  return { data, loading, error };
};
