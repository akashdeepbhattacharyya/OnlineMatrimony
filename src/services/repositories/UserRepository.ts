import { User, UserRegistrationRequest } from '@/src/models/User';
import { IApiService } from '@/src/api/IApiService';
import { Response } from '@/src/models/Response';

export class UserRepository {
  constructor(private apiService: IApiService) {}

  async register(data: UserRegistrationRequest): Promise<Response<string>> {
    return await this.apiService.registerUser(data);
  }
}
