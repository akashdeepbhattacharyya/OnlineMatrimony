import { ApiResponse } from '@/src/models/ApiResponse';
import { handleApiResponse } from '@/src/utils/handleApiResponse';
import { SearchUser, SearchUserPreferences } from '@/src/models/User';
import { useHttpClient } from '../useHttpClient';
import { useAuth } from '@/src/context/AuthContext';

export function useSearchUserRepository() {
  const { token, saveToken } = useAuth();
  const client = useHttpClient({}, token, saveToken);

  const getSearchUser = async (
    data?: SearchUserPreferences | {},
  ): Promise<ApiResponse<SearchUser>> => {
    return handleApiResponse(client.post('/matches/findSearch', data));
  };

  return {
    getSearchUser,
  };
}
