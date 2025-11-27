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

const BooksDetail = () => {
  const { id } = useParams();
  const { data, isLoading: isBookLoading } = useBook(Number(id));
  const limit = 5;
  const [params] = React.useState<BookSearchParams>({ limit });
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
        <ReviewList>
          {Review?.map((review) => (
            <ReviewItem key={review.id} review={review} />
          ))}
        </ReviewList>
        <div className='w-full flex-center'>
          <Button variant={'outline'}>Load More</Button>
        </div>
      </SectionWrapper>
      <Hr />
      <SectionWrapper title='Related Books'>
        <BooksList>
          <QueryStateComp
            isLoading={isBooksLoading}
            skeleton={
              <>
                {Array.from({ length: limit }).map((_, idx) => (
                  <BookCardSkeleton key={idx} />
                ))}
              </>
            }
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
