import { ApiResponse } from '../models/ApiResponse';
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
}
