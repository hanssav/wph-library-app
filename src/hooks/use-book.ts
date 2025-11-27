import { DASHBOARD_PATH } from '@/constants';
import type { BookReq } from '@/schema/book.schema';
import { bookService } from '@/service';
import type {
  BookListResponse,
  BookRecomendationParams,
  BookRecomendationResponse,
  BookSearchParams,
} from '@/type';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
  type InfiniteData,
} from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

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

export const useBook = (id: number, options?: { enabled?: boolean }) =>
  useQuery({
    queryKey: bookKeys.id(id),
    queryFn: () => bookService.getId(id),
    ...options,
  });

export const useCreateBooks = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (req: BookReq) => bookService.post(req),
    onSuccess: () => {
      toast.success('book successfully added');
      navigate(DASHBOARD_PATH.BOOK_LIST);
      queryClient.invalidateQueries({
        queryKey: ['books'],
        refetchType: 'all', // refetch all pages
      });
    },
  });
};

export const useUpdateBook = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: BookReq }) =>
      bookService.update(id, data),
    onSuccess: (data, variables) => {
      const { id } = variables;

      queryClient.invalidateQueries({ queryKey: bookKeys.id(id) });
      queryClient.setQueryData(bookKeys.id(id), data);

      queryClient.invalidateQueries({
        queryKey: bookKeys.all(),
      });

      toast.success('Book successfully updated');
      navigate(DASHBOARD_PATH.BOOK_LIST);
    },
  });
};

export const useDeleteBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => bookService.detele(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: bookKeys.all() });

      const prevData = queryClient.getQueriesData({ queryKey: bookKeys.all() });

      // Update infinite query
      queryClient.setQueriesData<InfiniteData<BookListResponse>>(
        { queryKey: ['books'] },
        (old) => {
          if (!old) return old;

          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              data: {
                ...page.data,
                books: page.data.books.filter((book) => book.id !== id),
                pagination: {
                  ...page.data.pagination,
                  total: page.data.pagination.total - 1,
                },
              },
            })),
          };
        }
      );

      return { prevData };
    },

    onSuccess: () => {
      toast.success('Book deleted successfully');
      queryClient.invalidateQueries({ queryKey: bookKeys.all() });
    },

    onError: (_, __, context) => {
      // Restore previous data
      if (context?.prevData) {
        context.prevData.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
    },
  });
};
