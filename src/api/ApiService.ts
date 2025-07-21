import { Response } from '../models/Response';
import { IApiService } from './IApiService';
import { IHttpClient } from './IHttpClient';
import { User, UserRegistrationRequest } from '@/src/models/User';

export class ApiService implements IApiService {
  constructor(private httpClient: IHttpClient) {}

  registerUser(data: UserRegistrationRequest): Promise<Response<string>> {
    return this.httpClient.post<Response<string>>('/auth/register', data);
  }
}
