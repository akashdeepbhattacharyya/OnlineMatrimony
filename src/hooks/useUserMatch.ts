import { useState } from 'react';
import { Match } from '../models/Match';
import { useMatchRepository } from '../api/repositories/useMatchRepository';

export const useUserMatch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [data, setData] = useState<Match[] | string | undefined>(undefined);
  const matchRepository = useMatchRepository();

  const getPendingMatches = async (page: number, size: number = 1) => {
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

  const acceptMatch = async (matchId: number) => {
    setLoading(true);
    setError(undefined);
    setData(undefined);
    try {
      const response = await matchRepository.acceptMatch(matchId);
      if (response.status) {
        setData(response.data);
        return response.data;
      } else {
        setError(response.message || 'Failed to accept match');
        throw new Error(response.message || 'Failed to accept match');
      }
    } catch (err: any) {
      console.error('Accept match error:', err);
      setError(err.message || 'Failed to accept match');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const rejectMatch = async (matchId: number) => {
    setLoading(true);
    setError(undefined);
    setData(undefined);
    try {
      const response = await matchRepository.rejectMatch(matchId);
      if (response.status) {
        setData(response.data);
        return response.data;
      } else {
        setError(response.message || 'Failed to reject match');
        throw new Error(response.message || 'Failed to reject match');
      }
    } catch (err: any) {
      console.error('Reject match error:', err);
      setError(err.message || 'Failed to reject match');
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
    acceptMatch,
    rejectMatch,
  };
};
