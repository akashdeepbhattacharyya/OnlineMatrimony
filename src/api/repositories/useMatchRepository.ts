import { ApiResponse, PagedResponse } from '@/src/models/ApiResponse';
import { handleApiResponse } from '@/src/utils/handleApiResponse';
import { useHttpClient } from '../useHttpClient';
import { useAuth } from '@/src/context/AuthContext';
import { Match } from '@/src/models/Match';

export function useMatchRepository() {
  const { token } = useAuth();
  const client = useHttpClient({}, token?.accessToken);

  const getMatches = async (
    page: number,
    size: number,
    status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'MUTUAL' = 'PENDING',
  ): Promise<ApiResponse<PagedResponse<Match>>> => {
    return handleApiResponse(
      client.get(`/matches?page=${page}&size=${size}&status=${status}`),
    );
  };

  return {
    getMatches,
  };
}
