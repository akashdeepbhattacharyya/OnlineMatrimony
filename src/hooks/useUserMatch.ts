import { useState } from 'react';
import { Match } from '../models/Match';
import { useMatchRepository } from '../api/repositories/useMatchRepository';

export const useUserMatch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [data, setData] = useState<Match[]>([]);
  const matchRepository = useMatchRepository();

  const getPendingMatches = async (page: number, size: number) => {
    setLoading(true);
    setError(undefined);
    setData([]);

    try {
      const response = await matchRepository.getMatches(page, size, 'PENDING');
      if (response.status) {
        const result = response.data.content;
        setData(result);
        return result;
      } else {
        setError(response.message || 'Failed to fetch pending matches');
        throw new Error(response.message || 'Failed to fetch pending matches');
      }
    } catch (err: any) {
      console.error('Get pending matches error:', err);
      setError(err.message || 'Failed to fetch pending matches');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    data,
    getPendingMatches,
  };
};
