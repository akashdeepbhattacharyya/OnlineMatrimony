import { HttpClient } from './HttpClient';
import { ApiService } from './ApiService';
import { AuthRepository } from '@/src/services/repositories/AuthRepository';

// Create shared instances
const httpClient = new HttpClient('https://matrimony-api-wgvt.onrender.com/api/v1');
const apiService = new ApiService(httpClient);

export const authRepository = new AuthRepository(apiService);
