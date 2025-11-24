import { useBook, useBooksInfinite } from '@/hooks';
import { useParams } from 'react-router-dom';
import {
  BookDesc,
  BookImage,
  BookInfo,
  BookStats,
  BreadcrumbsDetail,
} from './components/book-detail';
import Hr from '@/components/ui/hr';
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

  const { description, title, coverImage, Category, Author, rating, Review } =
    book;

  return (
    <div className='base-container'>
      <section className='flex-col-start gap-4 md:gap-6 w-full'>
        <BreadcrumbsDetail book={title} />
        <div className='flex flex-col md:flex-row md:mx-0 gap-8'>
          <div className='flex-center'>
            <BookImage coverImage={coverImage} />
          </div>
          <div className='flex-col-start flex-1 gap-4 md:gap-5'>
            <div className='space-y-3 md:space-y-[22px]'>
              <BookInfo
                author={Author?.name || 'Unknown'}
                categoryName={Category.name}
                bookTitle={title}
                rating={rating}
              />
              <BookStats book={book} />
              <BookDesc desc={description} />
            </div>
            <ButtonActions />
          </div>
        </div>
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
