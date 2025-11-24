import { apiService } from '@/api';
import type {
  MeApiResponse,
  UpdateProfileApiResponse,
  UpdateProfileRequest,
} from '@/type';

export const meService = {
  me: async () => apiService.get<MeApiResponse>('/me'),
  update: async (data: UpdateProfileRequest) =>
    apiService.patch<UpdateProfileApiResponse>('/me', data),
};
