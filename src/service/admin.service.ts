import { apiService } from '@/api';
import type {
  GetAllUserParams,
  GetOverdueLoansResponse,
  Pagination,
  UserListResponse,
} from '@/type';

export const adminService = {
  getUsers: async (params?: GetAllUserParams) => {
    return await apiService.get<UserListResponse>('/admin/users', {
      params,
    });
  },
  geLoansOverdue: async (params?: Partial<Pagination>) =>
    await apiService.get<GetOverdueLoansResponse>('/admin/loans/overdue', {
      params,
    }),
};
