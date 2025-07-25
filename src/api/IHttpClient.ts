/**
 * Interface representing an HTTP client for making network requests.
 *
 * @template T The type of the response data.
 */
export type RequestConfig = {
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean>;
  signal?: AbortSignal;
  rawResponse?: boolean;
};
export interface IHttpClient {
  /**
   * Sends a GET request to the specified URL with optional query parameters.
   *
   * @param url The endpoint URL.
   * @param params Optional query parameters as a key-value map.
   * @returns A promise resolving to the response data of type T.
   */
  get<T>(
    url: string,
    params?: Record<string, any>,
    config?: RequestConfig,
  ): Promise<T>;

  /**
   * Sends a POST request to the specified URL with an optional request body.
   *
   * @param url The endpoint URL.
   * @param body Optional request payload.
   * @returns A promise resolving to the response data of type T.
   */
  post<T>(url: string, body?: any, config?: RequestConfig): Promise<T>;

  /**
   * Sends a PUT request to the specified URL with an optional request body.
   *
   * @param url The endpoint URL.
   * @param body Optional request payload.
   * @returns A promise resolving to the response data of type T.
   */
  put<T>(url: string, body?: any): Promise<T>;

  /**
   * Sends a DELETE request to the specified URL.
   *
   * @param url The endpoint URL.
   * @returns A promise resolving to the response data of type T.
   */
  delete<T>(url: string): Promise<T>;
}
