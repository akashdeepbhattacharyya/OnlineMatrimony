import { IS_LOCAL } from '@/app.config';
import { HttpClient } from '@/src/api/HttpClient';
import Constants from 'expo-constants';

export function useHttpClient(
  defaultHeaders: Record<string, string>,
  token?: string,
) {
  return new HttpClient(process.env.API_BASE_URL || '', defaultHeaders, token);
}
