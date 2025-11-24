import React from 'react';
import {
  BooksList,
  BookCard,
  BookCardSkeleton,
  LoadMoreButton,
  QueryStateComp,
} from '@/components/container';
import type { Book, BookSearchParams } from '@/type';
import { useBooksInfinite } from '@/hooks';

interface BookInfiniteListProps {
  params: BookSearchParams;
  renderBook?: (book: Book) => React.ReactNode;
  skeletonCount?: number;
  isInfinite?: boolean;
  className?: string;
}

export const BookInfiniteList: React.FC<BookInfiniteListProps> = ({
  params,
  renderBook,
  skeletonCount = 10,
  isInfinite = true,
  className,
}) => {
  const {
    data: booksData,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useBooksInfinite(params);

  const books = booksData?.pages.flatMap((page) => page.data.books) ?? [];

  const defaultRender = (book: Book) => <BookCard key={book.id} book={book} />;

  return (
    <>
      <BooksList className={className}>
        <QueryStateComp
          isLoading={isLoading}
          skeleton={
            <>
              {Array.from({ length: skeletonCount }).map((_, idx) => (
                <BookCardSkeleton key={idx} />
              ))}
            </>
          }
        >
          {books.map((book) =>
            renderBook ? renderBook(book) : defaultRender(book)
          )}
        </QueryStateComp>
      </BooksList>

      {isInfinite && (
        <LoadMoreButton
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      )}
    </>
  );
};
