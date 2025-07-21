import { HttpClient } from './HttpClient';
import { ApiService } from './ApiService';
import { UserRepository } from '@/src/services/repositories/UserRepository';

// Create shared instances
const httpClient = new HttpClient('https://matrimony-api-wgvt.onrender.com/api/v1');
const apiService = new ApiService(httpClient);

export const userRepository = new UserRepository(apiService);
