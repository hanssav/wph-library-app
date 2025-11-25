import type { ApiResponse, Pagination } from './api.type';
import type { AuthUser } from './auth.type';
import type { Book } from './book.type';

export type LoanStats = {
  borrowed: number;
  late: number;
  returned: number;
  total: number;
};

export type MeResponseData = {
  profile: AuthUser;
  loanStats: LoanStats;
  reviewsCount: number;
};

export type MeApiResponse = ApiResponse<MeResponseData>;

export type UpdateProfileResponseData = {
  profile: AuthUser;
};

export type UpdateProfileRequest = {
  name: string;
};

export type UpdateProfileApiResponse = {
  success: true;
  message: 'Profile updated' | string;
  data: UpdateProfileResponseData;
};

export type LoanStatus = 'BORROWED' | 'LATE' | 'RETURNED'; // based on your description

export type Loan = {
  id: number;
  userId: number;
  bookId: number;
  status: LoanStatus; // you can extend this later
  borrowedAt: string; // ISO string
  dueAt: string; // ISO string
  returnedAt: string | null;
  Book: Book;
};

export type LoansData = {
  loans: Loan[];
  pagination: Pagination;
};

export type GetLoansParams = {
  /** Filter by status (optional) */
  status?: LoanStatus;
  /** Page number (1-based) */
  page?: number;
  /** Number of items per page */
  limit?: number;
};

// Final typed response
export type LoansApiResponse = ApiResponse<LoansData>;
