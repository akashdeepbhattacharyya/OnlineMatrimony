export type Response<T> = {
  message?: string;
  statusCode: number;
  status: boolean;
  data: T;
  errorDescription?: string;
};
