import { apiService } from '@/api';
import type { LoginRequest, RegisterRequest } from '@/schema';
import type { LoginSuccessResponse, RegisterSuccessResponse } from '@/type';

export const authService = {
  login: async (body: LoginRequest) =>
    apiService.post<LoginSuccessResponse>('/auth/login', body),
  register: async (body: RegisterRequest) =>
    apiService.post<RegisterSuccessResponse>('/auth/register', body),
};
