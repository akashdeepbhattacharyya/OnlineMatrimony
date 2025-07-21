import { useState } from 'react';
import { userRepository } from '@/src/api';
import { User, UserRegistrationRequest } from '@/src/models/User';
import { Response } from '../models/Response';

export function useRegister() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [response, setResponse] = useState<Response<string> | null>(null);

  const register = async (data: UserRegistrationRequest) => {
    try {
      setLoading(true);
      setError(undefined);
      const response = await userRepository.register(data);
      if (!response.status) {
        setError(response.message);
        throw Error(response.message);
      } else {
        setResponse(response);
        return response;
      }
    } catch (err: any) {
      setError(err.message || 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error, response };
}
