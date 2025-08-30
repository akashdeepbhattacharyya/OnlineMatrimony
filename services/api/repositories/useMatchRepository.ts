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

  const acceptMatch = async (matchId: string): Promise<string> => {
    return handleApiResponse(
      apiClient.post(`/matches/action`, { matchId, action: 'ACCEPT' }),
    );
  };

  const rejectMatch = async (matchId: string): Promise<string> => {
    return handleApiResponse(
      apiClient.post(`/matches/action`, { matchId, action: 'REJECT' }),
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
    acceptMatch,
    rejectMatch,
    sendRequest,
    getMutualMatches,
  };
}
