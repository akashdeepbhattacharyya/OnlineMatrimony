import { IApiService } from '@/src/api/IApiService';
import { ApiResponse } from '@/src/models/ApiResponse';
import { handleApiResponse } from '@/src/utils/handleApiResponse';
import { UpdateUserProfileRequest, User } from '@/src/models/User';

export class UserRepository {
  constructor(private apiService: IApiService) {}

  async updateProfilePicture(data: string): Promise<ApiResponse<string>> {
    const name = data.split('/').pop() || 'profile.jpg';
    const type = 'image/jpeg';

    const formData = new FormData();
    formData.append('photo', {
      uri: data,
      name,
      type,
    } as any);
    formData.append('isPrimary', 'true');
    return handleApiResponse(this.apiService.updateProfilePicture(formData));
  }

  async updateProfile(
    data: UpdateUserProfileRequest,
  ): Promise<ApiResponse<string>> {
    return handleApiResponse(this.apiService.updateProfile(data));
  }

  async getProfile(): Promise<ApiResponse<User>> {
    return handleApiResponse(this.apiService.getProfile());
  }
}
