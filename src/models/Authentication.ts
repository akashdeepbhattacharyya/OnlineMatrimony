import { User } from './User';

/**
 * Represents the payload required for user registration.
 *
 * @property fullName - The full name of the user.
 * @property email - The email address of the user.
 * @property password - The password chosen by the user.
 * @property phone - The user's phone number.
 * @property dateOfBirth - The user's date of birth in ISO format (YYYY-MM-DD).
 * @property gender - The gender of the user.
 */
export type UserRegistrationRequest = {
  fullName: string;
  email: string;
  password: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
};

/**
 * Represents a request to verify a One-Time Password (OTP) for a specific purpose.
 *
 * @property email - The email address associated with the OTP verification.
 * @property otp - The one-time password to be verified.
 * @property purpose - The purpose for which the OTP is being verified (e.g., account verification, password reset).
 */
export type VerifyOTPRequest = {
  email: string;
  otp: string;
  purpose: string;
};

/**
 * Represents a request to resend a One-Time Password (OTP).
 *
 * @property contact - The contact information (e.g., phone number or email) to which the OTP should be sent.
 * @property purpose - The purpose for which the OTP is being requested (e.g., "login", "registration").
 */
export type ResendOTPRequest = {
  contact: string;
  purpose: string;
};

/**
 * Represents the payload required for a login request.
 *
 * @property emailOrPhone - The user's email address or phone number used for authentication.
 * @property password - The user's password.
 * @property rememberMe - Indicates whether the user's session should be persistent.
 */
export type LoginRequest = {
  emailOrPhone: string;
  password: string;
  rememberMe: boolean;
};

export type LoginResponse = {
  user: User;
} & Token;

export type Token = {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
};
