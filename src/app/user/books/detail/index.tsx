import { useAddToCart, useBook, useBooksInfinite } from '@/hooks';
import { useNavigate, useParams } from 'react-router-dom';
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
import {
  AddToCartBtn,
  BorrowBookBtn,
  ButtonActions,
} from './components/button-actions';
import DetailInfoLoading from './components/loading/detail-info-skeleton';
import {
  CHECKOUT_PATH,
  EMPTY_BOOKS_DATA,
  EMPTY_REVIEWS_DATA,
} from '@/constants';
import BookDetailNotFound from './components/not-found';
import { useAppDispatch } from '@/store';
import { setBookLoansItems } from '@/store/slices';

const BooksDetail = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { data, isLoading: isBookLoading } = useBook(Number(id));
  const [params] = React.useState<BookSearchParams>({ limit: 5 });
  const { data: booksData, isLoading: isBooksLoading } =
    useBooksInfinite(params);

  const book = data?.data;
  const books = booksData?.pages.flatMap((res) => res.data.books);

  const addCart = useAddToCart();
  const req = { bookId: Number(id), qty: 1 };
  const handleAddToCart = () => addCart.mutate(req);

  if (isBookLoading) return <DetailInfoLoading />;
  if (!book) return <BookDetailNotFound />;
  const { title, rating, Review } = book;

  const onBorrowClick = () => {
    dispatch(setBookLoansItems({ datas: [book], duration: null }));
    navigate(CHECKOUT_PATH);
  };
  return (
    <div className='base-container'>
      <section className='flex-col-start gap-4 md:gap-6 w-full'>
        <BreadcrumbsDetail book={title} />
        <BookDetails book={book}>
          <ButtonActions className='hidden md:flex'>
            <AddToCartBtn
              isPending={addCart.isPending}
              onClick={handleAddToCart}
              disabled={addCart.isPending}
            >
              {addCart.isPending ? 'Adding...' : 'Add To Cart'}
            </AddToCartBtn>
            <BorrowBookBtn onClick={onBorrowClick}>Borrow Book</BorrowBookBtn>
          </ButtonActions>
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

      <ButtonActions isMobile>
        <AddToCartBtn
          isPending={addCart.isPending}
          onClick={handleAddToCart}
          disabled={addCart.isPending}
        >
          {addCart.isPending ? 'Adding...' : 'Add To Cart'}
        </AddToCartBtn>
        <BorrowBookBtn onClick={onBorrowClick}>Borrow Book</BorrowBookBtn>
      </ButtonActions>
    </div>
  );
};

export default BooksDetail;
