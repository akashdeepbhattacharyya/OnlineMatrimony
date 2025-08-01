import { ApiResponse } from '../models/ApiResponse';
import { LoginResponse, Token } from '../models/Authentication';
import { IHttpClient, RequestConfig } from './IHttpClient';
import { useAuthRepository } from './repositories/useAuthRepository';
import { useAppSelector } from '../services/store/hook';
// import { useAuth } from '../context/AuthContext';

export class HttpClient implements IHttpClient {
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

    // if (!this.refreshAuthToken) {
    //   throw new Error('No refreshAuthToken function provided');
    // }
    // try {
    //   const newToken = await this.refreshAuthToken();
    //   if (this.saveToken) {
    //     this.saveToken({ accessToken: newToken });
    //   }
    //   this.authToken = newToken;
    //   return newToken;
    // } catch (error) {
    //   console.error('Error refreshing auth token:', error);
    //   throw error;
    // }
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
