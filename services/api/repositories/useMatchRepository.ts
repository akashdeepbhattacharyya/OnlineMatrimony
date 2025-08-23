import { handleApiResponse } from '@/utils/handleApiResponse';
import { useHttpClient } from '../useHttpClient';
import { useAuth } from '@/context/AuthContext';
import { Match } from '@/models/Match';

export function useMatchRepository() {
  const { token, saveToken } = useAuth();
  const client = useHttpClient({}, token, saveToken);

  const getBestMatches = async (): Promise<Match[]> => {
    return handleApiResponse(client.get(`/matches/findBestMatches`));
  };

  const acceptMatch = async (matchId: number): Promise<string> => {
    return handleApiResponse(
      client.post(`/matches/action`, { matchId, action: 'ACCEPT' }),
    );
  };

  const rejectMatch = async (matchId: number): Promise<string> => {
    return handleApiResponse(
      client.post(`/matches/action`, { matchId, action: 'REJECT' }),
    );
  };

  return {
    getBestMatches,
    acceptMatch,
    rejectMatch,
  };
}
