import { handleApiResponse } from '@/utils/handleApiResponse';
import { SearchUser } from '@/models/User';
import { useHttpClient } from '../useHttpClient';
import { useAuth } from '@/context/AuthContext';

export function useSearchUserRepository() {
  const { token, saveToken } = useAuth();
  const client = useHttpClient({}, token, saveToken);

  const getSearchUser = async (data: string): Promise<SearchUser[]> => {
    return handleApiResponse(client.post(`/matches/findSearch/${data}`));
  };

  return {
    getSearchUser,
  };
}
