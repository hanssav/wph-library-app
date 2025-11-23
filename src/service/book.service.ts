import { apiService } from '@/api';
import type {
  BookListResponse,
  BookRecomendationParams,
  BookRecomendationResponse,
  BookSearchParams,
} from '@/type';

export const bookService = {
  getAll: async (params?: BookSearchParams) =>
    apiService.get<BookListResponse>('/books', { params }),
  getRecomendation: async (params?: BookRecomendationParams) =>
    apiService.get<BookRecomendationResponse>('/books/recomend', { params }),
};
