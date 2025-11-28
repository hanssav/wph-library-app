import {
  LoadMoreButton,
  QueryStateComp,
  SectionWrapper,
} from '@/components/container';
import {
  SearchInput,
  SearchInputWrapper,
} from '@/components/container/search-input';
import {
  FilterBadge,
  FilterBadgeItem,
  LoansCard,
  LoansCardItem,
  LoansCardSkeleton,
} from '@/components/pages/borrowed';
import { STATUS_OPTIONS } from '@/components/pages/borrowed/borrowed-list.constants';
import React from 'react';
import type { GetLoansParams, LoanStatus } from '@/type';
import { EmptyState } from '@/components/container/empty-state';
import { EMPTY_LOANS_DATA } from '@/constants';
import { useLoansOverdue } from '@/hooks/use-admin';

const AdminBorrowedList = () => {
  const [params, setParams] = React.useState<GetLoansParams>({
    limit: 2,
    status: undefined,
  });
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useLoansOverdue(params);

  const loans = data?.pages.flatMap((page) => page.data.overdue) ?? [];

  return (
    <SectionWrapper title='Borrowed List' className='w-full'>
      <SearchInputWrapper className='w-profile'>
        <SearchInput placeholder='Search book' name='search-book' />
      </SearchInputWrapper>

      <FilterBadge>
        {STATUS_OPTIONS.map((status) => (
          <FilterBadgeItem
            key={status.id}
            data={status}
            active={
              status.id === 'all'
                ? params.status === undefined
                : params.status === status.value
            }
            onClick={() => {
              setParams((prev) => ({
                ...prev,
                page: 1,
                status:
                  status.id === 'all'
                    ? undefined
                    : (status.value as LoanStatus),
              }));
            }}
          >
            {status.label}
          </FilterBadgeItem>
        ))}
      </FilterBadge>

      <LoansCard>
        <QueryStateComp
          isLoading={isLoading}
          skeletonCount={params.limit}
          Skeleton={LoansCardSkeleton}
          data={loans}
          fallback={<EmptyState data={EMPTY_LOANS_DATA} />}
        >
          {(loan) => <LoansCardItem key={loan.id} loan={loan} />}
        </QueryStateComp>
      </LoansCard>
      {loans.length > 0 && (
        <LoadMoreButton
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      )}
    </SectionWrapper>
  );
};

export default AdminBorrowedList;
