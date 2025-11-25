import { cn, getImage } from '@/lib/utils';
import type { BaseComponentProps, Book } from '@/type';
import { type ComponentProps } from 'react';
import {
  Card,
  CardImageWrapper,
  CardImage,
  CardContent,
  CardTitle,
  CardDescription,
  CardRating,
} from '../ui/card';
import { usePrefetchBook } from '@/hooks';
import { useNavigate } from 'react-router-dom';
import { BOOK_PATH } from '@/lib/constants';
import { Badge } from '../ui/badge';

const BooksList = ({
  children,
  className,
  ...props
}: BaseComponentProps & ComponentProps<'div'>) => {
  return (
    <div
      className={cn(
        'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const BookCard = ({ book }: { book: Book }) => {
  const navigate = useNavigate();
  const prefetchBook = usePrefetchBook(book.id);

  const handleClick = () => {
    navigate(`${BOOK_PATH.INDEX}/${book.id}`);
  };

  return (
    <Card
      variant={'book'}
      key={book.id}
      onMouseEnter={prefetchBook}
      onClick={handleClick}
    >
      <CardImageWrapper>
        <CardImage src={getImage(book.coverImage)} alt={book.title} />
      </CardImageWrapper>
      <CardContent>
        <CardTitle>{book.title}</CardTitle>
        <CardDescription>{book.Author?.name}</CardDescription>
        <CardRating>{book.rating}</CardRating>
      </CardContent>
    </Card>
  );
};

const MainBookInfo = ({
  book,
  children,
}: {
  book: Book;
  children: React.ReactNode;
}) => {
  return (
    <div className='flex gap-4 '>
      <div className='w-[92px] relative overflow-hidden h-full'>
        <img
          src={getImage(book.coverImage)}
          alt={book.title}
          loading='lazy'
          className='object-cover'
        />
      </div>
      <div className='space-y-1'>
        <Badge variant={'outline'}>{book?.Category?.name ?? 'Category'}</Badge>
        <p className='text-md-bold lg:text-xl-bold'> {book.title}</p>
        <p className='text-sm-medium lg:text-md-medium text-neutral-700'>
          {book?.Author?.name ?? 'Author name'}
        </p>
        {children}
      </div>
    </div>
  );
};

export { BooksList, BookCard, MainBookInfo };
