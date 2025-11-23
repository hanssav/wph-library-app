import { bookService } from '@/service';
import type {
  BookListResponse,
  BookRecomendationParams,
  BookRecomendationResponse,
  BookSearchParams,
} from '@/type';
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

export const bookKeys = {
  all: (params?: BookSearchParams) => ['books', params],
  recomend: (params?: BookRecomendationParams) => ['books', 'recomend', params],
  id: (id: number) => ['book', id],
};

export const useBooksInfinite = (params?: BookSearchParams) => {
  return useInfiniteQuery<BookListResponse>({
    queryKey: bookKeys.all(params),
    queryFn: async ({ pageParam = 1 }) => {
      const finalParams = {
        ...params,
        page: Number(pageParam),
      };
      const res = await bookService.getAll(finalParams);
      return res;
    },
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.data.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
    getPreviousPageParam: (lastPage) => {
      const { page } = lastPage.data.pagination;
      return page > 1 ? page - 1 : undefined;
    },
    initialPageParam: 1,
  });
};

export const useBooksRecomend = (params?: BookRecomendationParams) => {
  return useQuery<BookRecomendationResponse>({
    queryKey: bookKeys.recomend(params),
    queryFn: () => bookService.getRecomendation(params),
  });
};

export const usePrefetchBook = (id: number) => {
  const queryClient = useQueryClient();

  return () => {
    queryClient.prefetchQuery({
      queryKey: bookKeys.id(id),
      queryFn: () => bookService.getId(id),
    });
  };
};
