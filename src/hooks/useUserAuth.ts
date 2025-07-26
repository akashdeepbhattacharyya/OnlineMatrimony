import { useState } from 'react';
import { authRepository } from '@/src/api';
import {
  LoginRequest,
  LoginResponse,
  UserRegistrationRequest,
  VerifyOTPRequest,
} from '@/src/models/Authentication';

export const useUserAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [data, setData] = useState<string | LoginResponse | undefined>();

  const register = async (
    payload: UserRegistrationRequest,
  ): Promise<string | null> => {
    setLoading(true);
    setError(undefined);
    setData(undefined);

    try {
      const response = await authRepository.register(payload);
      console.log('Register response:', response);

      if (response.status) {
        const contact = payload.email || payload.phone || '';
        setData(contact);
        return contact;
      } else {
        setError(response.message || 'Registration failed');
        return null;
      }
    } catch (err: any) {
      console.error('Registration error:', err);
      setError(err.message || 'Registration failed');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async (
    contact: string,
    purpose: string = 'REGISTRATION',
  ): Promise<string | null> => {
    setLoading(true);
    setError(undefined);
    setData(undefined);

    try {
      const response = await authRepository.resendOtp({ contact, purpose });
      console.log('Resend OTP response:', response);

      if (response.status) {
        const result = response.data;
        setData(result);
        return result;
      } else {
        setError(response.message || 'Failed to resend OTP');
        return null;
      }
    } catch (err: any) {
      console.error('Resend OTP error:', err);
      setError(err.message || 'Resend OTP failed');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const submitOtp = async (
    otpPayload: VerifyOTPRequest,
  ): Promise<string | null> => {
    setLoading(true);
    setError(undefined);
    setData(undefined);

    try {
      const response = await authRepository.verifyOtp(otpPayload);
      console.log('Verify OTP response:', response);

      if (response.status) {
        const result = response.data;
        setData(result);
        return result;
      } else {
        setError(response.message || 'OTP verification failed');
        return null;
      }
    } catch (err: any) {
      console.error('Submit OTP error:', err);
      setError(err.message || 'OTP verification failed');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const login = async (
    payload: LoginRequest,
  ): Promise<LoginResponse | null> => {
    setLoading(true);
    setError(undefined);
    setData(undefined);

    try {
      const response = await authRepository.login(payload);
      console.log('Login response:', response);

      if (response.status) {
        const result = response.data;
        setData(result);
        return result;
      } else {
        setError(response.message || 'Login failed');
        return null;
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'Login failed');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    data,
    register,
    resendOtp,
    submitOtp,
    login,
  };
};
