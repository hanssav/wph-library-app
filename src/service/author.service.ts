import { apiService } from '@/api';
import type { AuthorsResponse } from '@/type';

export const authorService = {
  getAll: async () => apiService.get<AuthorsResponse>('/authors'),
};
