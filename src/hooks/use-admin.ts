import type { GetAllUserParams, UserListResponse } from '@/type';

export const adminKeys = {
  users: (params?: GetAllUserParams) => ['admin', 'users', params] as const,
  user: (id: number) => ['admin', 'user', id] as const,
};

import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { adminService } from '@/service';

export const useUsersInfinite = (params?: GetAllUserParams) => {
  return useInfiniteQuery<UserListResponse>({
    queryKey: adminKeys.users(params),
    queryFn: async ({ pageParam = 1 }) => {
      const finalParams: GetAllUserParams = {
        ...params,
        page: Number(pageParam),
      };
      const response = await adminService.getUsers(finalParams);
      return response;
    },
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.data.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
    getPreviousPageParam: (firstPage) => {
      const { page } = firstPage.data.pagination;
      return page > 1 ? page - 1 : undefined;
    },
    initialPageParam: 1,
  });
};

export const useUsers = (params?: GetAllUserParams) => {
  return useQuery<UserListResponse>({
    queryKey: adminKeys.users(params),
    queryFn: () => adminService.getUsers(params),
    placeholderData: (previousData) => previousData,
  });
};
