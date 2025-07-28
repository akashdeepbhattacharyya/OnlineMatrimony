import { ApiResponse } from '@/src/models/ApiResponse';
import { handleApiResponse } from '@/src/utils/handleApiResponse';
import { useHttpClient } from '../useHttpClient';
import { useAuth } from '@/src/context/AuthContext';
import { Match } from '@/src/models/match';

export function useMatchRepository() {
  const { token } = useAuth();
  const client = useHttpClient({}, token?.accessToken);

  const getSearches = async (
    queryParams?: Record<string, any>,
  ): Promise<ApiResponse<Match>> => {
    console.log('getSearches queryParams:', queryParams);
    return handleApiResponse(
      client.get('/matches/search', {
        params: queryParams,
      }),
    );
  };

  return {
    getSearches,
  };
}
