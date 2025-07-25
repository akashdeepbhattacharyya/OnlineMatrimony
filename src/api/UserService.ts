import { UserRegistrationFormType } from '../resources/form';
import { useTokenCallBack } from '../store/hook';
import { HttpClient } from './HttpClient';

const httpClient = new HttpClient(process.env.API_BASE_URL!); // or hardcode

export const updateProfileImg = async (data: FormData): Promise<Response> => {
  const token = await useTokenCallBack();

  return httpClient.post<Response>('/users/photos', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateProfile = async (
  data: UserRegistrationFormType,
): Promise<Response> => {
  const token = await useTokenCallBack();

  return httpClient.put<Response>('/users/editProfile', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getProfile = async (): Promise<Response> => {
  const token = await useTokenCallBack();

  return httpClient.get<Response>('/users/profile', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
