import { IHttpClient, RequestConfig } from './IHttpClient';

export class HttpClient implements IHttpClient {
  constructor(
    private baseUrl: string,
    private defaultHeaders: Record<string, string> = {},
  ) {}

  private makeUrl(url: string, params?: Record<string, any>) {
    if (!params) return `${this.baseUrl}${url}`;
    const qs = new URLSearchParams(params as any).toString();
    return `${this.baseUrl}${url}?${qs}`;
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
