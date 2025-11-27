import { apiService } from '@/api';
import type { BookReq } from '@/schema/book.schema';
import type {
  BookDetailApiResponse,
  BookListResponse,
  BookRecomendationParams,
  BookRecomendationResponse,
  BookSearchParams,
  CreateBookApiResponse,
} from '@/type';

export const bookService = {
  getAll: async (params?: BookSearchParams) =>
    apiService.get<BookListResponse>('/books', { params }),
  getRecomendation: async (params?: BookRecomendationParams) =>
    apiService.get<BookRecomendationResponse>('/books/recomend', { params }),
  getId: async (id: number) =>
    apiService.get<BookDetailApiResponse>(`/books/${id}`),
  post: async (req: BookReq) =>
    apiService.post<CreateBookApiResponse>('/books', req),
  update: async (id: number, req: BookReq) =>
    apiService.put(`/books/${id}`, req),
};
