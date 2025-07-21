import { Response } from '../models/Response';
import { User, UserRegistrationRequest } from '../models/User';

export interface IApiService {
  registerUser(data: UserRegistrationRequest): Promise<Response<string>>;
}
