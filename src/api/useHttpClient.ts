import { HttpClient } from '@/src/api/HttpClient';
import { Token } from '../models/Authentication';
import { apiBaseUrl } from '../utils/utils';

export function useHttpClient(
  token?: Token,
  saveToken?: (token: Token) => void,
) {
  return new HttpClient(apiBaseUrl(), token, saveToken);
}
