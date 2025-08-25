import { handleApiResponse } from '@/utils/handleApiResponse';
import { Match } from '@/models/Match';
import { apiClient } from '../HttpClient';

export function useMatchRepository() {

  const getBestMatches = async (): Promise<Match[]> => {
    return handleApiResponse(apiClient.get(`/matches/findBestMatches`));
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

  const getMutualMatches = async (): Promise<Match[]> => {
    return handleApiResponse(apiClient.get(`/matches/mutual`));
  };

  return {
    getBestMatches,
    acceptMatch,
    rejectMatch,
    getMutualMatches,
  };
}
