import { handleApiResponse } from '@/utils/handleApiResponse';
import {
  UpdatePartnerPreferencesRequest,
  UpdateUserProfileRequest,
  User,
} from '@/models/User';
import { useHttpClient } from '../useHttpClient';
import { useAuth } from '@/context/AuthContext';

export function useUserRepository() {
  const { token, saveToken } = useAuth();
  const client = useHttpClient({}, token, saveToken);

  const updateProfilePicture = async (data: string): Promise<string> => {
    const name = data.split('/').pop() || 'profile.jpg';
    const type = 'image/jpeg';

    const formData = new FormData();
    formData.append('photo', {
      uri: data,
      name,
      type,
    } as any);
    formData.append('isPrimary', 'true');
    return handleApiResponse(client.post('/users/photos', formData));
  };
  /*
{
    "fullName": "Shinchan Nohara",
    "dateOfBirth": "1998-11-22",
    "height": 165,
    "weight": 72,
    "maritalStatus": "NEVER_MARRIED",
    "religion": "Hindu",
    "caste": "General",
    "motherTongue": "Hindi",
    "education": "C.Tech",
    "occupation": "Software Engineer",
    "annualIncome": 800000,
    "aboutMe": "I am a simple and caring person looking for a life partner.",
    "familyType": "NUCLEAR",
    "familyValues": "MODERATE",
    "city": "Mumbai",
    "state": "Maharashtra",
    "country": "India",
    "pincode": "400001"
}
    */
  const updateProfile = async (
    data: UpdateUserProfileRequest,
  ): Promise<User> => {
    return handleApiResponse(client.put('/users/editProfile', data));
  };

  const getProfile = async (): Promise<User> => {
    return handleApiResponse(client.get('/users/profile'));
  };

  const updatePartnerPreferences = async (
    data: UpdatePartnerPreferencesRequest,
  ): Promise<User> => {
    return handleApiResponse(client.put('/users/editPreferences', data));
  };

  const getPartnerPreferences = async (): Promise<User> => {
    return handleApiResponse(client.get('/users/getPreferences'));
  };

  return {
    updateProfilePicture,
    updateProfile,
    getProfile,
    getPartnerPreferences,
    updatePartnerPreferences,
  };
}
