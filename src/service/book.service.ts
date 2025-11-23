import { apiService } from '@/api';
import type {
  BookDetailApiResponse,
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
  getId: async (id: number) =>
    apiService.get<BookDetailApiResponse>(`/books/${id}`),
};
