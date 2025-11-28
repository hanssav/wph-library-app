import type { ApiResponse, Pagination } from './api.type';
import type { LoanStatus } from './loan.type';

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
  search?: string;
};

export type UserListResponse = ApiResponse<{
  users: User[];
  pagination: Pagination;
}>;

export type OverdueLoan = {
  id: number;
  userId: number;
  bookId: number;
  status: LoanStatus;
  borrowedAt: string;
  dueAt: string;
  returnedAt: string | null;
  User: {
    id: number;
    name: string;
    email: string;
  };
  Book: {
    coverImage: string;
    id: number;
    title: string;
    Author: {
      id: number;
      name: string;
    };
  };
};

export type GetOverdueLoansResponse = ApiResponse<{
  overdue: OverdueLoan[];
  pagination: Pagination;
}>;
