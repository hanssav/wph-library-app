import { useAuthors } from '@/hooks';
import { useCategories } from '@/hooks/use-categories';
import React from 'react';
import { bookFields } from '../components/form.constants';

export const useBookFields = () => {
  const { data: categories } = useCategories();
  const { data: authors } = useAuthors();

  console.log(categories, 'categories');

  const fields = React.useMemo(() => {
    return bookFields.map((f) => {
      if (f.name === 'authorId') {
        return {
          ...f,
          options:
            authors?.data?.authors?.map((a) => ({
              label: a.name,
              value: a.id,
            })) ?? [],
        };
      }

      if (f.name === 'categoryId') {
        return {
          ...f,
          options:
            categories?.data?.categories?.map((c) => ({
              label: c.name,
              value: c.id,
            })) ?? [],
        };
      }

      return f;
    });
  }, [authors, categories]);

  return { fields };
};
