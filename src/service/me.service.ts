import { apiService } from '@/api';
import type { MeApiResponse } from '@/type';

export const meService = {
  me: async () => apiService.get<MeApiResponse>('/me'),
};
