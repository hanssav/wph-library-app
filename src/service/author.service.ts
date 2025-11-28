import { apiService } from '@/api';
import type { AuthorDetailResponse, AuthorsResponse } from '@/type';

export const authorService = {
  getAll: async () => apiService.get<AuthorsResponse>('/authors'),
  getId: async (id: number) =>
    apiService.get<AuthorDetailResponse>(`/authors/${id}/books`),
};
