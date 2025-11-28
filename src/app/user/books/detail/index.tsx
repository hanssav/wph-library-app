import { useBook, useBooksInfinite } from '@/hooks';
import { useParams } from 'react-router-dom';
import {
  BookDetails,
  BreadcrumbsDetail,
} from '@/components/pages/book/book-detail';
import { Hr } from '@/components/ui/hr';
import {
  BookCard,
  BookCardSkeleton,
  BooksList,
  EmptyState,
  QueryStateComp,
  SectionWrapper,
  StarrRating,
} from '@/components/container';
import { ReviewItem, ReviewList } from './components/review';
import { Button } from '@/components/ui/button';
import type { BookSearchParams } from '@/type';
import React from 'react';
import ButtonActions from './components/button-actions';
import DetailInfoLoading from './components/loading/detail-info-skeleton';
import { EMPTY_BOOKS_DATA, EMPTY_REVIEWS_DATA } from '@/constants';

const BooksDetail = () => {
  const { id } = useParams();
  const { data, isLoading: isBookLoading } = useBook(Number(id));
  const [params] = React.useState<BookSearchParams>({ limit: 5 });
  const { data: booksData, isLoading: isBooksLoading } =
    useBooksInfinite(params);

  const book = data?.data;
  const books = booksData?.pages.flatMap((res) => res.data.books);

  if (isBookLoading) {
    return <DetailInfoLoading />;
  }

  if (!book) {
    return (
      <div className='base-container'>
        <p>Book not found</p>
      </div>
    );
  }

  const { title, rating, Review } = book;

  return (
    <div className='base-container'>
      <section className='flex-col-start gap-4 md:gap-6 w-full'>
        <BreadcrumbsDetail book={title} />
        <BookDetails book={book}>
          <ButtonActions />
        </BookDetails>
      </section>
      <Hr />
      <SectionWrapper
        title='Review'
        subTitle={
          <StarrRating>
            {rating} ({book.reviewCount} Ulasan)
          </StarrRating>
        }
      >
        {!Review.length && Review.length === 0 ? (
          <EmptyState data={EMPTY_REVIEWS_DATA} />
        ) : (
          <div className='flex flex-col gap-10'>
            <ReviewList>
              {Review?.map((review) => (
                <ReviewItem key={review.id} review={review} />
              ))}
            </ReviewList>
            <Button className='self-center' variant={'outline'}>
              Load More
            </Button>
          </div>
        )}
        <div className='w-full flex-center'></div>
      </SectionWrapper>
      <Hr />
      <SectionWrapper title='Related Books'>
        <BooksList>
          <QueryStateComp
            isLoading={isBooksLoading}
            skeleton={
              <>
                {Array.from({ length: params.limit ?? 5 }).map((_, idx) => (
                  <BookCardSkeleton key={idx} />
                ))}
              </>
            }
            fallback={<EmptyState data={EMPTY_BOOKS_DATA} />}
          >
            {books?.map((book) => (
              <BookCard book={book} key={book.id} />
            ))}
          </QueryStateComp>
        </BooksList>
      </SectionWrapper>

      <ButtonActions isMobile />
    </div>
  );
};

export default BooksDetail;
