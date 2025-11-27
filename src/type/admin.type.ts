import type { ApiResponse, Pagination } from './api.type';

export type User = {
  id: number;
  name: string;
  email: string;
  phoneNumber: string | null;
  role: 'USER' | 'ADMIN';
  createdAt: string;
};

export type GetAllUserParams = {
  page?: number;
  limit?: number;
};

export type UserListResponse = ApiResponse<{
  users: User[];
  pagination: Pagination;
}>;
