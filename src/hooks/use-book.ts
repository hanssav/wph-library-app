import { bookService } from '@/service';
import type { BookListResponse, BookSearchParams } from '@/type';
import { useQuery } from '@tanstack/react-query';

export const bookKeys = {
  all: (params?: BookSearchParams) => ['books', params],
};

export const useBooks = (params?: BookSearchParams) => {
  return useQuery<BookListResponse>({
    queryKey: bookKeys.all(params),
    queryFn: () => bookService.getAll(params),
  });
};
