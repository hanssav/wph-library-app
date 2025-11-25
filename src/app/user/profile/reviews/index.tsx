import { QueryStateComp, SectionWrapper } from '@/components/container';
import {
  SearchInput,
  SearchInputWrapper,
} from '@/components/container/search-input';
import { ReviewBookCard, ReviewBookItem } from './components/review-book-card';
import { useReviews } from '@/hooks';
import { EmptyReviews } from './components/review-book-empty';
import { ReviewBookSkeleton } from './components/review-book-skeleton';
import type { GetReviewParams } from '@/type';
import React from 'react';

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
          fallback={<EmptyReviews />}
        >
          {(review) => <ReviewBookItem key={review.id} review={review} />}
        </QueryStateComp>
      </ReviewBookCard>
    </SectionWrapper>
  );
};

export default Reviews;
