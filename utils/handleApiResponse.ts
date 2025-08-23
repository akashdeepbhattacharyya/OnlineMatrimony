export async function handleApiResponse<T>(promise: Promise<any>): Promise<T> {
  try {
    const response = await promise;
    console.log('API Response:', typeof response?.status);
    if (response?.status === false) {
      throw {
        errorCode: response.errorCode || 'API_ERROR',
        status: false,
        statusCode: response.statusCode || 500,
        message:
          response.message || 'An error occurred while processing the request',
      };
    }

    return response.data as T;
  } catch (error: any) {
    throw {
      errorCode: error.errorCode || 'API_ERROR',
      status: false,
      statusCode: error.statusCode || 500,
      message:
        error.message || 'An error occurred while processing the request',
    };
  }
}
