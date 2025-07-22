import { ApiResponse } from '@/src/models/ApiResponse';

export async function handleApiResponse<T>(
  promise: Promise<Response>,
): Promise<ApiResponse<T>> {
  try {
    const response = await promise;
    const jsonData = await response.json();

    if (jsonData.status === false) {
      return {
        errorCode: jsonData.errorCode,
        status: false,
        statusCode: jsonData.statusCode,
        message: jsonData.message,
      };
    }

    return {
      status: true,
      data: jsonData,
      statusCode: jsonData.statusCode || response.status,
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
