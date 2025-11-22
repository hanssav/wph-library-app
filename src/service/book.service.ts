import { apiService } from '@/api';
import type { BookListResponse, BookSearchParams } from '@/type';

export const bookService = {
  getAll: async (params?: BookSearchParams) =>
    apiService.get<BookListResponse>('/books', { params }),
};
