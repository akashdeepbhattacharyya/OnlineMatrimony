import { ApiResponse } from '@/src/models/ApiResponse';

export async function handleApiResponse<T>(
  promise: Promise<any>,
): Promise<ApiResponse<T>> {
  try {
    const response = await promise;
    console.log('API Response:', response);
    if (response?.status === false) {
      return {
        errorCode: response.errorCode,
        status: false,
        statusCode: response.statusCode,
        message: response.message,
      };
    }

    return {
      status: true,
      data: response.data,
      statusCode: response.statusCode,
    };
  } catch (error: any) {
    return {
      errorCode: error.errorCode || 'NETWORK_ERROR',
      status: false,
      statusCode: error.status || 500,
      message: error.message || 'An unknown error occurred',
    };
  }
}
