import { HttpClient } from '@/src/api/HttpClient';

export function useHttpClient(defaultHeaders: Record<string, string>, token?: string) {
  return new HttpClient(
    process.env.API_BASE_URL || '',
    defaultHeaders,
    token,
  );
}
