import { QueryStateComp, SectionWrapper } from '@/components/container';
import {
  SearchInput,
  SearchInputWrapper,
} from '@/components/container/search-input';
import { ReviewBookCard, ReviewBookItem } from './components/review-book-card';
import { useReviews } from '@/hooks';
import { ReviewBookSkeleton } from './components/review-book-skeleton';
import type { GetReviewParams } from '@/type';
import React from 'react';
import { EmptyState } from '@/components/container/empty-state';
import { EMPTY_REVIEWS_DATA } from '@/constants';

const Reviews = () => {
  const [params] = React.useState<GetReviewParams>({ page: 1, limit: 10 });
  const { data, isLoading } = useReviews();

  return (
    <SectionWrapper title='Borrowed List' className='w-full'>
      <SearchInputWrapper className='w-profile'>
        <SearchInput placeholder='Search Reviews' name='review' />
      </SearchInputWrapper>
      <ReviewBookCard>
        <QueryStateComp
          isLoading={isLoading}
          skeletonCount={params.limit ?? 10}
          Skeleton={ReviewBookSkeleton}
          data={data?.reviews ?? []}
          fallback={<EmptyState data={EMPTY_REVIEWS_DATA} />}
        >
          {(review) => <ReviewBookItem key={review.id} review={review} />}
        </QueryStateComp>
      </ReviewBookCard>
    </SectionWrapper>
  );
};

export default Reviews;
