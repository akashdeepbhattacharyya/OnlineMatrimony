import { ApiResponse } from '../models/ApiResponse';
import { LoginResponse, Token } from '../models/Authentication';
import { IHttpClient, RequestConfig } from './IHttpClient';
import { useAuthRepository } from './repositories/useAuthRepository';
import { useAppSelector } from '../services/store/hook';
// import { useAuth } from '../context/AuthContext';

/*export class HttpClient implements IHttpClient {
  constructor(
    private baseUrl: string,
    private defaultHeaders: Record<string, string> = {},
    private token?: Token,
    private saveToken?: (token: Token) => void,
  ) {}

  private makeUrl(url: string, params?: Record<string, any>) {
    if (!params) return `${this.baseUrl}${url}`;
    const qs = new URLSearchParams(params as any).toString();
    return `${this.baseUrl}${url}?${qs}`;
  }

  // Remove hook usage from class. Use injected refreshAuthToken and saveToken instead.
  private async handleRefreshAuthToken() {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token.accessToken}`;
      const rest = await fetch(this.makeUrl('/auth/refresh-token'), {
        method: 'POST',
        headers,
        body: JSON.stringify({ refreshToken: this.token.refreshToken }),
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
        // this.token = newToken;
        // // Save the new token using injected saveToken function
        if (this.saveToken) this.saveToken(newToken);
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
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token.accessToken}`;
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
      console.log('Unauthorized access - attempting token refresh');
      // Handle unauthorized access, possibly refresh token
      try {
        const newToken = await this.handleRefreshAuthToken();
        console.log('New token obtained:', newToken);
        // Update the token in the client
        this.token = newToken;
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
*/

import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from 'axios';
import { refreshAccessToken } from './refreshAccessToken';

export class HttpClient implements IHttpClient {
  private axiosInstance: AxiosInstance;
  private isRefreshing: boolean = false;
  private failedQueue: any[] = [];
  private token?: Token;
  private saveToken?: (token: Token) => void;

  constructor(
    baseURL: string,
    token?: Token,
    saveToken?: (token: Token) => void,
  ) {
    this.axiosInstance = axios.create({
      baseURL,
      headers: { 'Content-Type': 'application/json' },
    });
    this.token = token;
    this.saveToken = saveToken;

    this.axiosInstance.interceptors.request.use(async config => {
      if (this.token) {
        config.headers.Authorization = `Bearer ${this.token.accessToken}`;
      }
      return config;
    });

    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & {
          _retry?: boolean;
        };

        if (error.response?.status === 401 && !originalRequest._retry) {
          if (this.isRefreshing) {
            return new Promise((resolve, reject) => {
              this.failedQueue.push({
                resolve: (token: Token) => {
                  originalRequest.headers = {
                    ...originalRequest.headers,
                    Authorization: `Bearer ${token.accessToken}`,
                  };
                  resolve(this.axiosInstance(originalRequest));
                },
                reject: (err: any) => reject(err),
              });
            });
          }

          originalRequest._retry = true;
          this.isRefreshing = true;

          try {
            if (this.token) {
              const response = await refreshAccessToken(
                this.token.refreshToken || '',
              );
              if (!response.status) {
                throw new Error('Failed to refresh token');
              }
              const newToken: Token = {
                accessToken: response.data.accessToken,
                refreshToken: response.data.refreshToken,
                tokenType: response.data.tokenType,
                expiresIn: response.data.expiresIn,
              };
              this.token = newToken;
              this.saveToken?.(newToken);

              this.failedQueue.forEach(prom => prom.resolve(response));
              this.failedQueue = [];

              originalRequest.headers = {
                ...originalRequest.headers,
                Authorization: `Bearer ${newToken.accessToken}`,
              };
              return this.axiosInstance(originalRequest);
            } else {
              throw new Error('No token available for refresh');
            }
          } catch (err) {
            this.failedQueue.forEach(prom => prom.reject(err));
            this.failedQueue = [];
            return Promise.reject(err);
          } finally {
            this.isRefreshing = false;
          }
        }

        return Promise.reject(error);
      },
    );
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.get<T>(url, config);
    return response.data;
  }

  async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await this.axiosInstance.post<T>(url, data, config);
    return response.data;
  }

  async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await this.axiosInstance.put<T>(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.delete<T>(url, config);
    return response.data;
  }
}
