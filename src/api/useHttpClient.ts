import { HttpClient } from '@/src/api/HttpClient';
import { Platform } from 'react-native';

export function useHttpClient(
  defaultHeaders: Record<string, string>,
  token?: string,
) {
  var apiBaseUrl = process.env.API_BASE_URL;
  if (Platform.OS === 'android') {
    // For Android, use the local IP address if running on an emulator
    if (apiBaseUrl?.includes('localhost')) {
      apiBaseUrl = apiBaseUrl.replace('localhost', '10.0.2.2');
    }
  }

  return new HttpClient(apiBaseUrl || '', defaultHeaders, token);
}
