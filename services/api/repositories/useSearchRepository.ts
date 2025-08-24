import { handleApiResponse } from '@/utils/handleApiResponse';
import { SearchUser } from '@/models/User';
import { apiClient } from '../HttpClient';

export function useSearchUserRepository() {

  const getSearchUser = async (data: string): Promise<SearchUser[]> => {
    return handleApiResponse(apiClient.post(`/matches/findSearch/${data}`));
  };

  return {
    getSearchUser,
  };
}
