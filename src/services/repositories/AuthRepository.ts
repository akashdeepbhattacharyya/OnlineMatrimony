import {
  LoginRequest,
  loginResponse,
  Response,
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
  async resendOtp(
    contact: string,
    purpose: string,
  ): Promise<ApiResponse<string>> {
    return handleApiResponse(this.apiService.resendOTP({ contact, purpose }));
  }

  async verifyOtp(data: VerifyOTPRequest): Promise<ApiResponse<string>> {
    return handleApiResponse(this.apiService.verifyOTP(data));
  }
  async login(data: LoginRequest): Promise<ApiResponse<loginResponse>> {
    return handleApiResponse(this.apiService.login(data));
  }
}
