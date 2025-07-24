import { HttpClient } from './HttpClient';
import { ApiService } from './ApiService';
import { AuthRepository } from '@/src/services/repositories/AuthRepository';

// Create shared instances
const httpClient = new HttpClient(process.env.API_BASE_URL || '');
const apiService = new ApiService(httpClient);

export const authRepository = new AuthRepository(apiService);
