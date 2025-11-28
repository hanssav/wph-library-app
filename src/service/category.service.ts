import { apiService } from '@/api';
import type { GetCategoryApiResponse } from '@/type';

export const categoryService = {
  getAll: async () => apiService.get<GetCategoryApiResponse>('/categories'),
};
