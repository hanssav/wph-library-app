import type { ApiResponse, Pagination } from './api.type';
import type { AuthUser } from './auth.type';
import type { Book } from './book.type';
import type { Loan, LoanStatus } from './loan.type';
import type { Review } from './review.type';

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

export type MeLoan = {
  Book: Book;
} & Loan;

export type LoansData = {
  loans: MeLoan[];
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

export type LoansApiResponse = ApiResponse<LoansData>;

export type ReviewsResponseData = {
  reviews: Review[];
  pagination: Pagination;
};

export type GetReviewParams = Pick<Pagination, 'page' | 'limit'>;

// 5. Full API Response
export type ReviewsApiResponse = ApiResponse<ReviewsResponseData>;
