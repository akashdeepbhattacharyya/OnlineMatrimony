import {
  LoginRequest,
  LoginResponse,
  ResendOTPRequest,
  UserRegistrationRequest,
  VerifyOTPRequest,
} from '@/src/models/Authentication';
import { ApiResponse } from '@/src/models/ApiResponse';
import { handleApiResponse } from '@/src/utils/handleApiResponse';
import { useHttpClient } from '../useHttpClient';

export function useAuthRepository() {
  const client = useHttpClient({});

  const register = async (
    data: UserRegistrationRequest,
  ): Promise<ApiResponse<string>> => {
    return handleApiResponse(client.post('/auth/register', data));
  };
  const resendOtp = async (
    data: ResendOTPRequest,
  ): Promise<ApiResponse<string>> => {
    return handleApiResponse(client.post('/auth/resend-otp', data));
  };

  const verifyOtp = async (
    data: VerifyOTPRequest,
  ): Promise<ApiResponse<string>> => {
    return handleApiResponse(client.post('/auth/verify-otp', data));
  };

  const login = async (
    data: LoginRequest,
  ): Promise<ApiResponse<LoginResponse>> => {
    return handleApiResponse(client.post('/auth/login', data));
  };

  return {
    register,
    resendOtp,
    verifyOtp,
    login,
  };
}
