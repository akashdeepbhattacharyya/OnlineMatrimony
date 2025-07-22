import { useState } from 'react';
import { authRepository } from '@/src/api';
import { UserRegistrationRequest } from '@/src/models/Authentication';

export function useUserRegistration() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [data, setData] = useState<string | undefined>(undefined);

  const register = async (data: UserRegistrationRequest) => {
    try {
      setLoading(true);
      setError(undefined);
      const response = await authRepository.register(data);
      if (response.status) {
        setData(response.data);
      } else {
        setError(response.message);
      }
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error, data };
}
