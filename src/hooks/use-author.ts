import { authorService } from '@/service/author.service';
import type { AuthorDetailResponse } from '@/type';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export const authorKeys = {
  getAll: ['author', 'all'],
  getId: (id: number) => ['author', id],
};

export const useAuthors = () =>
  useQuery({
    queryKey: authorKeys.getAll,
    queryFn: authorService.getAll,
  });

export const usePrefetchAuthor = (id: number) => {
  const queryClient = useQueryClient();

  return () => {
    queryClient.prefetchQuery({
      queryKey: authorKeys.getId(id),
      queryFn: () => authorService.getId(id),
    });
  };
};

export const useAuthor = (id: number) =>
  useQuery<AuthorDetailResponse>({
    queryKey: authorKeys.getId(id),
    queryFn: () => authorService.getId(id),
  });
