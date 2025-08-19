export type ApiSuccess<T> = {
  statusCode: number;
  status: true;
  data: T;
  content?: T[];
};

export type ApiError = {
  errorCode: string;
  message: string;
  statusCode: number;
  status: false;
  data?: undefined;
  content?: undefined;
};

export type ApiResponse<T> = ApiSuccess<T> | ApiError;

export type PagedResponse<T> = {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  empty: boolean;
};
