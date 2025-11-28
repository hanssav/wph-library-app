import type { BookDetail } from '@/type';
import BookDesc from './book-desc';
import BookInfo from './book-info';
import BookStats from './book-stats';
import BookImage from './book-image';

type BookDetailCardProps = {
  book: BookDetail;
  children?: React.ReactNode;
};

export const BookDetails = ({ book, children }: BookDetailCardProps) => {
  const {
    title,
    coverImage,
    description,
    rating,
    Author,
    Category,
    //
  } = book;

  const authorName = Author?.name || 'Unknown Author';
  const categoryName = Category?.name || 'Uncategorized';

  return (
    <div className='flex flex-col md:flex-row gap-8 md:gap-12'>
      <div className='flex-center'>
        <BookImage coverImage={coverImage} />
      </div>

      <div className='flex-1 flex flex-col gap-6 md:gap-8'>
        <div className='space-y-5 md:space-y-7'>
          <BookInfo
            author={authorName}
            categoryName={categoryName}
            bookTitle={title}
            rating={rating ?? 0}
          />
          <BookStats book={book} />
          <BookDesc desc={description || 'No description available.'} />
        </div>

        {children && <>{children}</>}
      </div>
    </div>
  );
};
