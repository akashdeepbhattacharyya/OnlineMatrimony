import {
  LoginRequest,
  LoginResponse,
  ResendOTPRequest,
  UserRegistrationRequest,
  VerifyOTPRequest,
} from '@/src/models/Authentication';
import { IApiService } from '@/src/api/IApiService';
import { ApiResponse } from '@/src/models/ApiResponse';
import { handleApiResponse } from '@/src/utils/handleApiResponse';

export class AuthRepository {
  constructor(private apiService: IApiService) {}

  async register(data: UserRegistrationRequest): Promise<ApiResponse<string>> {
    return handleApiResponse(this.apiService.registerUser(data));
  }
  async resendOtp(data: ResendOTPRequest): Promise<ApiResponse<string>> {
    return handleApiResponse(this.apiService.resendOTP(data));
  }

  async verifyOtp(data: VerifyOTPRequest): Promise<ApiResponse<string>> {
    return handleApiResponse(this.apiService.verifyOTP(data));
  }
  async login(data: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    return handleApiResponse(this.apiService.login(data));
  }
}
