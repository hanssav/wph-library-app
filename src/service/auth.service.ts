import { apiService } from '@/api';
import type { LoginRequest } from '@/schema';
import type { LoginSuccessResponse } from '@/type';

export const authService = {
  login: async (body: LoginRequest) =>
    apiService.post<LoginSuccessResponse>('/auth/login', body),
};
