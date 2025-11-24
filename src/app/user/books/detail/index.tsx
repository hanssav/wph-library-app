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

const BooksDetail = () => {
  const { id } = useParams();
  const { data } = useBook(Number(id));

  let limit = 5;
  const [params] = React.useState<BookSearchParams>({ limit });
  const { data: booksData, isLoading: booksLoading } = useBooksInfinite(params);

  const book = data?.data;
  if (!book) return null; // add loading state in this conditon
  const { description, title, coverImage, Category, Author, rating, Review } =
    book;

  const books = booksData?.pages.flatMap((res) => res.data.books);

  return (
    <div className='base-container'>
      <section className='flex-col-start gap-4 md:gap-6 w-full'>
        <BreadcrumbsDetail book={title} />

        <div id='detail' className='flex flex-col md:flex-row md:mx-0 gap-8'>
          <div className='flex-center'>
            <BookImage coverImage={coverImage} />
          </div>
          <div className='flex-col-start flex-1 gap-4 md:gap-5'>
            <div className='space-y-3 md:space-y-[22px]'>
              <BookInfo
                author={Author?.name}
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
          {Review &&
            Review.length > 0 &&
            Review.map((review) => (
              <ReviewItem key={review.id} review={review} />
            ))}
        </ReviewList>
        <div className='w-full flex-center'>
          <Button variant={'outline'}>Load More</Button>
        </div>
        {/* <LoadMoreButton /> */}
      </SectionWrapper>
      <Hr />
      <SectionWrapper title='Related Books'>
        <BooksList>
          <QueryStateComp
            isLoading={booksLoading}
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
