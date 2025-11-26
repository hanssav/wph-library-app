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
} from './components';
import { STATUS_OPTIONS } from './borrowed-list.constants';
import React from 'react';
import type { GetLoansParams, LoanStatus } from '@/type';
import { useLoans } from '@/hooks';
import { EmptyState } from '@/components/container/empty-state';
import { EMPTY_LOANS_DATA } from '@/constants';

const BorrowedList = () => {
  const [params, setParams] = React.useState<GetLoansParams>({
    limit: 10,
    page: 1,
    status: undefined,
  });

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useLoans(params);

  const loans = data?.pages.flatMap((page) => page.data.loans) ?? [];

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

export default BorrowedList;
