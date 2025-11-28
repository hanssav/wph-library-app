import { cn, getImage } from '@/lib/utils';
import type { BaseComponentProps, Book } from '@/type';
import { type ComponentProps, type ReactNode } from 'react';
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
import { BOOK_PATH } from '@/constants/base.constants';
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

type BookLike = {
  title: string;
  coverImage: string | null;
  price?: number;
  isbn?: string;
  Category?: { name: string } | null;
  Author?: { name: string } | null;
};

type MainBookInfoProps<T extends BookLike> = {
  book: T;
  children?: ReactNode;
};

const MainBookInfo = <T extends BookLike>({
  book,
  children,
}: MainBookInfoProps<T>) => {
  return (
    <div className='flex gap-4'>
      <div className='w-[92px] h-[130px] shrink-0'>
        <img
          src={getImage(book.coverImage)}
          alt={book.title}
          loading='lazy'
          className='w-full h-full object-cover rounded-md'
        />
      </div>

      <div className='space-y-1 flex-1'>
        <Badge variant='outline'>{book.Category?.name ?? 'Category'}</Badge>
        <h3 className='font-bold text-lg line-clamp-2'>{book.title}</h3>
        <p className='text-sm text-neutral-700'>
          {book.Author?.name ?? 'Unknown Author'}
        </p>
        {children}
      </div>
    </div>
  );
};

export { BooksList, BookCard, MainBookInfo };
