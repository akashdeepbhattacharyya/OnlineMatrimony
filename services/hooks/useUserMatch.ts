import { useState } from 'react';
import { Match, MatchedUserProfile, MutualMatch, ReceivedMatch, SentMatch } from '../../models/Match';
import { useMatchRepository } from '@/services/api/repositories/useMatchRepository';

export const useUserMatch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [data, setData] = useState<Match[] | MatchedUserProfile[] | string | undefined | Match | SentMatch[] | ReceivedMatch[] | MutualMatch[]>(undefined);
  const matchRepository = useMatchRepository();

  const getBestMatches = async () => {
    setLoading(true);
    setError(undefined);
    setData(undefined);

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

  const getSentMatches = async () => {
    setLoading(true);
    setError(undefined);
    setData(undefined);

    try {
      const response = await matchRepository.getSentMatches();
      setData(response);
      return response;
    } catch (err: any) {
      console.error('Get send matches error:', err);
      setError(err.message || 'Failed to fetch send matches');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getReceivedMatches = async () => {
    setLoading(true);
    setError(undefined);
    setData(undefined);

    try {
      const response = await matchRepository.getReceivedMatches();
      setData(response);
      return response;
    } catch (err: any) {
      console.error('Get received matches error:', err);
      setError(err.message || 'Failed to fetch received matches');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getMutualMatches = async () => {
    setLoading(true);
    setError(undefined);
    setData(undefined);

    try {
      const response = await matchRepository.getMutualMatches();
      setData(response);
      return response;
    } catch (err: any) {
      console.error('Get mutual matches error:', err);
      setError(err.message || 'Failed to fetch mutual matches');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const acceptOrRejectMatch = async (matchId: string, action: 'ACCEPT' | 'REJECT') => {
    setLoading(true);
    setError(undefined);
    setData(undefined);
    try {
      const response = await matchRepository.acceptOrRejectMatch(matchId, action);
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

  const sendRequest = async (userId: number) => {
    setLoading(true);
    setError(undefined);
    setData(undefined);
    try {
      const response = await matchRepository.sendRequest(userId);
      setData(response);
      return response;
    } catch (err: any) {
      console.error('Send request error:', err);
      setError(err.message || 'Failed to send request');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    data,
    sendRequest,
    getBestMatches,
    getSentMatches,
    getReceivedMatches,
    getMutualMatches,
    acceptOrRejectMatch,
    rejectMatch,
  };
};
