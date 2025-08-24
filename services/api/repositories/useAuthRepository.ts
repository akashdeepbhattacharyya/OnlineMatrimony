import {
  LoginRequest,
  LoginResponse,
  ResendOTPRequest,
  UserRegistrationRequest,
  VerifyOTPRequest,
} from '@/models/Authentication';
import { handleApiResponse } from '@/utils/handleApiResponse';
import { apiClient } from '../HttpClient';

export function useAuthRepository() {

  const register = async (data: UserRegistrationRequest): Promise<string> => {
    return handleApiResponse(apiClient.post('/auth/register', data));
  };
  const resendOtp = async (data: ResendOTPRequest): Promise<string> => {
    return handleApiResponse(apiClient.post('/auth/resend-otp', data));
  };

  const verifyOtp = async (data: VerifyOTPRequest): Promise<string> => {
    return handleApiResponse(apiClient.post('/auth/verify-otp', data));
  };

  const login = async (data: LoginRequest): Promise<LoginResponse> => {
    return handleApiResponse(apiClient.post('/auth/login', data));
  };

  return {
    register,
    resendOtp,
    verifyOtp,
    login,
  };
}
