export interface IHttpClient {
  get<T>(url: string, params?: Record<string, any>): Promise<T>;
  post<T>(url: string, body?: any): Promise<T>;
  put<T>(url: string, body?: any): Promise<T>;
  delete<T>(url: string): Promise<T>;
}
