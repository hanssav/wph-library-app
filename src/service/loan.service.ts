import { apiService } from '@/api';
import type { LoanBookRequest, LoanBookResponse } from '@/type';

export const loanService = {
  post: async (req: LoanBookRequest) =>
    apiService.post<LoanBookResponse>('/loans', req),
};
