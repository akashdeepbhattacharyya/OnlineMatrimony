import { ApiResponse } from '@/models/ApiResponse';
import { LoginResponse, Token } from '@/models/Authentication';
import { IHttpClient, RequestConfig } from './IHttpClient';
import * as Storage from "@/services/local-storage";
import { Platform } from 'react-native';
import { config } from '@/api.config';

export class HttpClient implements IHttpClient {
  constructor(
    private baseUrl: string,
    private defaultHeaders: Record<string, string> = {},
  ) { }

  private makeUrl(url: string, params?: Record<string, any>) {
    if (!params) return `${this.baseUrl}/api/v1${url}`;
    const qs = new URLSearchParams(params as any).toString();
    return `${this.baseUrl}/api/v1${url}?${qs}`;
  }

  // Remove hook usage from class. Use injected refreshAuthToken and saveToken instead.
  private async handleRefreshAuthToken() {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    const refreshToken: string | null = await Storage.getItem("REFRESH_TOKEN");
    if (refreshToken) {
      const rest = await fetch(this.makeUrl('/auth/refresh-token'), {
        method: 'POST',
        headers,
        body: JSON.stringify({ refreshToken }),
      });
      if (!rest.ok) {
        const errorText = await rest.text().catch(() => '');
        throw new Error(`HTTP ${rest.status}: ${errorText}`);
      }
      const data: ApiResponse<LoginResponse> = await rest.json();
      if (data.status) {
        const newToken: Token = {
          accessToken: data.data.accessToken,
          refreshToken: data.data.refreshToken,
          tokenType: data.data.tokenType,
          expiresIn: data.data.expiresIn,
        };
        await Storage.setToken(newToken);
        return newToken;
      }
    } else {
      throw new Error('No token available for refresh');
    }
  }

  private async request<T>(
    method: string,
    endpoint: string,
    body?: any,
    config: RequestConfig = {},
  ): Promise<T> {
    const isFormData =
      typeof FormData !== 'undefined' && body instanceof FormData;

    const headers: Record<string, string> = {
      ...this.defaultHeaders,
      ...config.headers,
    };
    const accessToken: string | null = await Storage.getItem("ACCESS_TOKEN");
    console.log('Requesting:', method, endpoint);
    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`;
    }

    // Only set JSON content-type if it's NOT FormData and not already provided
    if (!isFormData && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json';
    }

    const res = await fetch(this.makeUrl(endpoint, config.params), {
      method,
      headers,
      body: body
        ? isFormData
          ? body // don't stringify FormData
          : JSON.stringify(body)
        : undefined,
    });

    if (res.status === 401) {
      // Handle unauthorized access, possibly refresh token
      try {
        await this.handleRefreshAuthToken();
        // Retry the request with the new token
        return this.request<T>(method, endpoint, body, config);
      } catch (error) {
        throw error;
      }
    }

    if (!res.ok) {
      const errorText = await res.text().catch(() => '');
      throw new Error(`HTTP ${res.status}: ${errorText}`);
    }

    if (config.rawResponse) {
      // @ts-expect-error caller said they want raw Response
      return res;
    }

    // handle 204 / no content
    if (res.status === 204) {
      // @ts-expect-error caller expects void/unknown
      return undefined;
    }

    return (await res.json()) as T;
  }

  get<T>(url: string, config?: RequestConfig): Promise<T> {
    return this.request<T>('GET', url, undefined, config);
  }

  post<T>(url: string, body?: any, config?: RequestConfig): Promise<T> {
    return this.request<T>('POST', url, body, config);
  }

  put<T>(url: string, body?: any, config?: RequestConfig): Promise<T> {
    return this.request<T>('PUT', url, body, config);
  }

  delete<T>(url: string, config?: RequestConfig): Promise<T> {
    return this.request<T>('DELETE', url, undefined, config);
  }
}

export const baseUrl = () => {
  let apiBaseUrl = config.apiUrl;

  if (Platform.OS === 'android') {
    // For Android, use the local IP address if running on an emulator
    if (apiBaseUrl?.includes('localhost')) {
      apiBaseUrl = apiBaseUrl.replace('localhost', '10.0.2.2');
    }
  }
  return apiBaseUrl;
}

export const apiClient = new HttpClient(baseUrl() || '', {
  'Content-Type': 'application/json',
});
