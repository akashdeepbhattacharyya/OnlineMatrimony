import { useEffect, useState } from 'react';
import {
  LoginRequest,
  LoginResponse,
  UserRegistrationRequest,
  VerifyOTPRequest,
} from '@/models/Authentication';
import { useAuthRepository } from '@/services/api/repositories/useAuthRepository';
import { useError } from '@/components/error';

export const useUserAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [data, setData] = useState<string | LoginResponse | undefined>();
  const authRepository = useAuthRepository();
  const { showError } = useError();

  useEffect(() => {
    if (error) {
      showError({ description: error });
    }
  }, [error, showError]);

  const register = async (
    payload: UserRegistrationRequest,
  ): Promise<string | null> => {
    setLoading(true);
    setError(undefined);
    setData(undefined);

    try {
      await authRepository.register(payload);
      const contact = payload.email || payload.phone || '';
      setData(contact);
      return contact;
    } catch (err: any) {
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
      setData(response);
      return response;
    } catch (err: any) {
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

      setData(response);
      return response;
    } catch (err: any) {
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

      setData(response);
      return response;
    } catch (err: any) {
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
