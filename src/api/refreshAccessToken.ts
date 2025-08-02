import axios from 'axios';
import { apiBaseUrl } from '../utils/utils';
import { ApiResponse } from '../models/ApiResponse';
import { LoginResponse } from '../models/Authentication';

export const refreshAccessToken = async (
  refreshToken: string,
): Promise<ApiResponse<LoginResponse>> => {
  const response = await axios.post(`${apiBaseUrl()}/auth/refresh-token`, {
    refreshToken,
  });
  return response.data;
};
