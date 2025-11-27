import { categoryService } from '@/service';
import { useQuery } from '@tanstack/react-query';

export const categoryKeys = {
  getAll: ['categories'],
};
export const useCategories = () =>
  useQuery({
    queryKey: categoryKeys.getAll,
    queryFn: categoryService.getAll,
  });
