export type ApiSuccess<T> = {
  statusCode: number;
  status: true;
  data: T;
};

export type ApiError = {
  errorCode: string;
  message: string;
  statusCode: number;
  status: false;
};

export type ApiResponse<T> = ApiSuccess<T> | ApiError;
