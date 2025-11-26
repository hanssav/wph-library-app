import {
  FilterBadge,
  FilterBadgeItem,
} from '@/app/user/profile/borrowed-list/components';
import {
  EmptyState,
  LoadMoreButton,
  QueryStateComp,
  SectionWrapper,
} from '@/components/container';
import {
  SearchInputWrapper,
  SearchInput,
} from '@/components/container/search-input';
import { useBooksInfinite, useDebounce } from '@/hooks';
import { BOOK_STATUS_TABS } from './components/book.constants';
import React from 'react';
import {
  AdminBookCard,
  AdminBookCardItem,
  AdminBookCardItemSkeleton,
} from './components';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { DASHBOARD_PATH } from '@/constants/base.constants';
import type { BookSearchParams } from '@/type';
import { EMPTY_BOOKS_DATA } from '@/constants';

const AdminBookList = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = React.useState<string>('all');
  const [params, setParams] = React.useState<BookSearchParams>({
    q: '',
    limit: 10,
  });

  const debounceParams = useDebounce(params);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useBooksInfinite(debounceParams);
  const books = data?.pages.flatMap((page) => page.data.books) ?? [];

  return (
    <SectionWrapper title='Book List' className='w-full'>
      <Button
        onClick={() => navigate(`${DASHBOARD_PATH.BOOK_LIST}/new`)}
        className='px-4 w-full md:max-w-60'
      >
        Add Book
      </Button>
      <SearchInputWrapper className='w-profile'>
        <SearchInput
          placeholder='Search book'
          name='search-book'
          onChange={(e) =>
            setParams((prev) => ({ ...prev, q: e.target.value }))
          }
        />
      </SearchInputWrapper>

      <FilterBadge className='overflow-x-auto py-2'>
        {BOOK_STATUS_TABS.map((status) => (
          <FilterBadgeItem
            key={status.id}
            data={status}
            active={filter === status.id}
            onClick={() => setFilter(status.id)}
          >
            {status.label}
          </FilterBadgeItem>
        ))}
      </FilterBadge>
      <AdminBookCard>
        <QueryStateComp
          isLoading={isLoading}
          skeletonCount={params.limit}
          data={books}
          Skeleton={AdminBookCardItemSkeleton}
          fallback={<EmptyState data={EMPTY_BOOKS_DATA} />}
        >
          {(book) => <AdminBookCardItem book={book} key={book.id} />}
        </QueryStateComp>
      </AdminBookCard>
      {books.length > 0 && (
        <LoadMoreButton
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      )}
    </SectionWrapper>
  );
};

export default AdminBookList;
