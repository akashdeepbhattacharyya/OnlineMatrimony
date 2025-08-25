import { useState } from 'react';
import { Match } from '../../models/Match';
import { useMatchRepository } from '@/services/api/repositories/useMatchRepository';

export const useUserMatch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [data, setData] = useState<Match[] | string | undefined>(undefined);
  const matchRepository = useMatchRepository();

  const getBestMatches = async () => {
    setLoading(true);
    setError(undefined);
    setData([]);

    try {
      const response = await matchRepository.getBestMatches();
      setData(response);
      return response;
    } catch (err: any) {
      console.error('Get pending matches error:', err);
      setError(err.message || 'Failed to fetch pending matches');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const acceptMatch = async (matchId: string) => {
    setLoading(true);
    setError(undefined);
    setData(undefined);
    try {
      const response = await matchRepository.acceptMatch(matchId);
      setData(response);
      return response;
    } catch (err: any) {
      console.error('Accept match error:', err);
      setError(err.message || 'Failed to accept match');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const rejectMatch = async (matchId: string) => {
    setLoading(true);
    setError(undefined);
    setData(undefined);
    try {
      const response = await matchRepository.rejectMatch(matchId);
      setData(response);
      return response;
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
    getBestMatches,
    acceptMatch,
    rejectMatch,
  };
};
