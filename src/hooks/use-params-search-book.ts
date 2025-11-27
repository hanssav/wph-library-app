import { useSearchParams } from 'react-router-dom';
import { useDebounce } from './use-debounce';
import type { BookSearchParams } from '@/type';
import React from 'react';

export const useParamsSearchBooks = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') ?? '';
  const debouncedQuery = useDebounce(query);

  const limit = 10;
  const [params, setParams] = React.useState<BookSearchParams>({
    limit,
    q: debouncedQuery,
  });

  React.useEffect(() => {
    setParams((prev) => ({ ...prev, q: debouncedQuery }));
  }, [debouncedQuery]);

  return { params };
};
