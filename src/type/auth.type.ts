import type { ApiResponse } from './api.type';

export type UserRole = 'ADMIN' | 'USER';

export type AuthUser = {
  id: number;
  name: string;
  email: string;
  role: UserRole;
};

// ======================
// REGISTER RESPONSE
// ======================

export type RegisterSuccessResponse = ApiResponse<AuthUser>;

// ======================
// LOGIN RESPONSE
// ======================

export type LoginSuccessResponse = ApiResponse<{
  token: string;
  user: AuthUser;
}>;

// ======================
// ERROR RESPONSE
// ======================

export type AuthErrorResponse = {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
};

// ======================
// FINAL RESPONSE UNIONS
// ======================

export type RegisterResponse = RegisterSuccessResponse | AuthErrorResponse;
export type LoginResponse = LoginSuccessResponse | AuthErrorResponse;

// ======================
// ME TYPE
// ======================

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
