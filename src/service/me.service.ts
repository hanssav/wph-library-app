import { apiService } from '@/api';
import type {
  GetLoansParams,
  GetReviewParams,
  LoansApiResponse,
  MeApiResponse,
  ReviewsApiResponse,
  UpdateProfileApiResponse,
  UpdateProfileRequest,
} from '@/type';

export const meService = {
  me: async () => apiService.get<MeApiResponse>('/me'),
  update: async (data: UpdateProfileRequest) =>
    apiService.patch<UpdateProfileApiResponse>('/me', data),
  loans: async (params: GetLoansParams) =>
    apiService.get<LoansApiResponse>('/me/loans', { params }),
  reviews: async (params?: GetReviewParams) =>
    apiService.get<ReviewsApiResponse>('/me/reviews', { params }),
};
