import { handleApiResponse } from '@/utils/handleApiResponse';
import { Match, MutualMatch, ReceivedMatch, SentMatch } from '@/models/Match';
import { apiClient } from '../HttpClient';

export function useMatchRepository() {

  const getBestMatches = async (): Promise<Match[]> => {
    return handleApiResponse(apiClient.get(`/matches/findBestMatches`));
  };

  const getSentMatches = async (): Promise<SentMatch[]> => {
    return handleApiResponse(apiClient.get(`/matches/getSendRequestList`));
  };

  const getReceivedMatches = async (): Promise<ReceivedMatch[]> => {
    return handleApiResponse(apiClient.get(`/matches/getReceiveRequests`));
  };

  const acceptOrRejectMatch = async (matchId: string, action: 'ACCEPT' | 'REJECT'): Promise<string> => {
    return handleApiResponse(
      apiClient.post(`/matches/action`, { matchId, action }),
    );
  };

  const rejectMatch = async (matchId: string): Promise<string> => {
    return handleApiResponse(
      apiClient.post(`/matches/matchReject/${matchId}`),
    );
  };

  const sendRequest = async (userId: number): Promise<Match> => {
    return handleApiResponse(
      apiClient.post(`/matches/sendRequest/${userId}`),
    );
  };

  const getMutualMatches = async (): Promise<MutualMatch[]> => {
    return handleApiResponse(apiClient.get(`/matches/mutual`));
  };

  return {
    getBestMatches,
    getSentMatches,
    getReceivedMatches,
    acceptOrRejectMatch,
    rejectMatch,
    sendRequest,
    getMutualMatches,
  };
}
