import { IHttpClient } from './IHttpClient';

export class HttpClient implements IHttpClient {
  private baseUrl: string;
  private defaultHeaders: Record<string, string>;

  constructor(baseUrl: string, defaultHeaders: Record<string, string> = {}) {
    this.baseUrl = baseUrl;
    this.defaultHeaders = defaultHeaders;
  }

  private async request<T>(
    method: string,
    endpoint: string,
    body?: any
  ): Promise<T> {
    const headers = {
      'Content-Type': 'application/json',
      ...this.defaultHeaders,
    };

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    return (await response.json()) as T;
  }

  get<T>(url: string, params?: Record<string, any>): Promise<T> {
    const queryString = params
      ? `?${new URLSearchParams(params as any).toString()}`
      : '';
    return this.request<T>('GET', `${url}${queryString}`);
  }

  post<T>(url: string, body?: any): Promise<T> {
    return this.request<T>('POST', url, body);
  }

  put<T>(url: string, body?: any): Promise<T> {
    return this.request<T>('PUT', url, body);
  }

  delete<T>(url: string): Promise<T> {
    return this.request<T>('DELETE', url);
  }
}
