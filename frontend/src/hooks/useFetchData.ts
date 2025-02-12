// hooks/useFetchData.ts
import { useState, useEffect } from 'react';

interface UseFetchDataProps<T> {
  fetchData: () => Promise<T>;
}

export const useFetchData = <T>({ fetchData }: UseFetchDataProps<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const fetchedData = await fetchData();
        setData(fetchedData);
      } catch (err) {
        setError('Failed to load data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [fetchData]);

  return { data, loading, error };
};
