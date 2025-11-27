import { apiService } from '@/api';
import type { GetAllUserParams, UserListResponse } from '@/type';

export const adminService = {
  getUsers: async (params?: GetAllUserParams) => {
    return await apiService.get<UserListResponse>('/admin/users', {
      params,
    });
  },
};
