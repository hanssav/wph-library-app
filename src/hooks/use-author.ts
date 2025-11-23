import { authorService } from '@/service/author.service';
import { useQuery } from '@tanstack/react-query';

export const authorKeys = {
  getAll: ['author', 'all'],
};

export const useAuthors = () =>
  useQuery({
    queryKey: authorKeys.getAll,
    queryFn: authorService.getAll,
  });
