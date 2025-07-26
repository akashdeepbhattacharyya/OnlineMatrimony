import { ApiResponse } from '../models/ApiResponse';
import { UpdateUserProfileRequest } from '../models/User';
import { IApiService } from './IApiService';
import { IHttpClient } from './IHttpClient';
import {
  LoginRequest,
  ResendOTPRequest,
  UserRegistrationRequest,
  VerifyOTPRequest,
} from '@/src/models/Authentication';

export class ApiService implements IApiService {
  constructor(private httpClient: IHttpClient) {}

  login(data: LoginRequest): Promise<Response> {
    return this.httpClient.post<Response>('/auth/login', data);
  }

  verifyOTP(data: VerifyOTPRequest): Promise<Response> {
    return this.httpClient.post<Response>('/auth/verify-otp', data);
  }

  resendOTP(data: ResendOTPRequest): Promise<Response> {
    return this.httpClient.post<Response>(
      `/auth/resend-otp?${new URLSearchParams(
        data as ResendOTPRequest,
      ).toString()}`,
    );
  }

  registerUser(data: UserRegistrationRequest): Promise<Response> {
    return this.httpClient.post<Response>('/auth/register', data);
  }

  updateProfilePicture(data: FormData): Promise<Response> {
    return this.httpClient.post<Response>('/users/photos', data);
  }
  updateProfile(data: UpdateUserProfileRequest): Promise<Response> {
    return this.httpClient.post<Response>('/users/editProfile', data);
  }
  getProfile(): Promise<Response> {
    return this.httpClient.get<Response>('/users/profile');
  }
}
