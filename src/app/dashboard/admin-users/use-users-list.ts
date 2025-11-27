import { useState, type ChangeEvent, useMemo } from 'react';
import { useDebounce } from '@/hooks/use-debounce';
import type { GetAllUserParams } from '@/type';
import { useUsers } from '@/hooks/use-admin';

export const useUserList = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const debouncedSearch = useDebounce(search, 500);

  const params: GetAllUserParams = useMemo(
    () => ({
      page,
      search: debouncedSearch,
      limit: 10,
    }),
    [page, debouncedSearch]
  );

  const { data, isLoading, isFetching, isPlaceholderData } = useUsers(params);

  const users = data?.data.users ?? [];
  const pagination = data?.data.pagination;

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleNextPage = () => {
    if (pagination && pagination.page < pagination.totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (pagination && pagination.page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const showLoading = isLoading;
  const isLoadingPagination = isFetching || isPlaceholderData;

  return {
    page,
    search,
    users,
    pagination,
    showLoading,
    isLoadingPagination,

    handleSearch,
    handlePageChange,
    handleNextPage,
    handlePrevPage,
  };
};
