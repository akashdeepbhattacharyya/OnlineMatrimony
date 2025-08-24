import { handleApiResponse } from '@/utils/handleApiResponse';
import { Match } from '@/models/Match';
import { apiClient } from '../HttpClient';

export function useMatchRepository() {

  const getBestMatches = async (): Promise<Match[]> => {
    return handleApiResponse(apiClient.get(`/matches/findBestMatches`));
  };

  const acceptMatch = async (matchId: number): Promise<string> => {
    return handleApiResponse(
      apiClient.post(`/matches/action`, { matchId, action: 'ACCEPT' }),
    );
  };

  const rejectMatch = async (matchId: number): Promise<string> => {
    return handleApiResponse(
      apiClient.post(`/matches/action`, { matchId, action: 'REJECT' }),
    );
  };

  return {
    getBestMatches,
    acceptMatch,
    rejectMatch,
  };
}
