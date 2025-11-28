import { apiService } from '@/api';
import type { CreateReviewRequest } from '@/type';

export const reviewService = {
  add: async (req: CreateReviewRequest) =>
    apiService.post<CreateReviewRequest>(`/reviews`, req),
};
