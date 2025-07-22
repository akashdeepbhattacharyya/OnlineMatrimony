import { UserRegistrationRequest } from '@/src/models/Authentication';
import { IApiService } from '@/src/api/IApiService';
import { ApiResponse } from '@/src/models/ApiResponse';
import { handleApiResponse } from '@/src/utils/handleApiResponse';

export class AuthRepository {
  constructor(private apiService: IApiService) {}

  async register(data: UserRegistrationRequest): Promise<ApiResponse<string>> {
    return handleApiResponse(this.apiService.registerUser(data));
  }
}
