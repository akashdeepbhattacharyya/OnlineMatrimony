import { ApiResponse } from '../models/ApiResponse';
import {
  LoginRequest,
  ResendOTPRequest,
  UserRegistrationRequest,
  VerifyOTPRequest,
} from '../models/Authentication';
import { UpdateUserProfileRequest } from '../models/User';

/**
 * Interface representing the API service for user authentication and registration.
 */
export interface IApiService {
  /**
   * Registers a new user with the provided registration data.
   * @param data - The user registration request payload.
   * @returns A promise resolving to a response containing a string message or token.
   */
  registerUser(data: UserRegistrationRequest): Promise<Response>;

  /**
   * Verifies the OTP (One-Time Password) sent to the user.
   * @param data - The OTP verification request payload.
   * @returns A promise resolving to a response containing a string message or token.
   */
  verifyOTP(data: VerifyOTPRequest): Promise<Response>;

  /**
   * Resends the OTP to the user.
   * @param data - The resend OTP request payload.
   * @returns A promise resolving to a response containing a string message or token.
   */
  resendOTP(data: ResendOTPRequest): Promise<Response>;

  /**
   * Logs in a user with the provided credentials.
   * @param data - The login request payload.
   * @returns A promise resolving to a response containing a string message or token.
   */
  login(data: LoginRequest): Promise<Response>;

  updateProfilePicture(data: FormData): Promise<Response>;

  updateProfile(data: UpdateUserProfileRequest): Promise<Response>;

  getProfile(): Promise<Response>;
}
