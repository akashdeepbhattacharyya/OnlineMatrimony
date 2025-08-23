import { HttpClient } from '../api/HttpClient';
import { Platform } from 'react-native';
import Constants from 'expo-constants';
import { Token } from '@/models/Authentication';
import { IS_DEVELOPMENT, IS_LOCAL } from '@/app.config';

export function useHttpClient(
  defaultHeaders: Record<string, string>,
  token?: Token,
  saveToken?: (token: Token) => void,
) {
  // var apiBaseUrl = IS_LOCAL
  //   ? Constants.expoConfig?.extra?.keys.local.apiBaseUrl
  //   : IS_DEVELOPMENT
  //   ? Constants.expoConfig?.extra?.keys.dev.apiBaseUrl
  //   : Constants.expoConfig?.extra?.keys.prod.apiBaseUrl;
  var apiBaseUrl = Constants.expoConfig?.extra?.keys.API_BASE_URL;

  if (Platform.OS === 'android') {
    // For Android, use the local IP address if running on an emulator
    if (apiBaseUrl?.includes('localhost')) {
      apiBaseUrl = apiBaseUrl.replace('localhost', '10.0.2.2');
    }
  }

  console.log('API_BASE_URL:', apiBaseUrl);

  return new HttpClient(apiBaseUrl || '', defaultHeaders, token, saveToken);
}
