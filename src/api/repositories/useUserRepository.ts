import { ApiResponse } from '@/src/models/ApiResponse';
import { handleApiResponse } from '@/src/utils/handleApiResponse';
import { UpdateUserProfileRequest, User } from '@/src/models/User';
import { useHttpClient } from '../useHttpClient';
import { useAuth } from '@/src/context/AuthContext';

export function useUserRepository() {
  const { token } = useAuth();
  const client = useHttpClient({}, token?.accessToken);

  const updateProfilePicture = async (
    data: string,
  ): Promise<ApiResponse<string>> => {
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
  ): Promise<ApiResponse<User>> => {
    return handleApiResponse(client.put('/users/editProfile', data));
  };

  const getProfile = async (): Promise<ApiResponse<User>> => {
    return handleApiResponse(client.get('/users/profile'));
  };

  return {
    updateProfilePicture,
    updateProfile,
    getProfile,
  };
}
