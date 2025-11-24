import { cn, getImage } from '@/lib/utils';
import type { Author, BaseComponentProps, Book } from '@/type';
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
import { Button } from '../ui/button';
import { usePrefetchBook } from '@/hooks';
import { useNavigate } from 'react-router-dom';
import { BOOK_PATH } from '@/lib/constants';

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

type LoadMoreButtonProps = {
  author?: Author[] | null;
  isFetchingNextPage?: boolean;
  hasNextPage?: boolean;
  fetchNextPage?: () => void;
};

const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({
  author,
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
}) => {
  if (!author) return null;

  return (
    <div className='w-full flex-center'>
      <Button
        className='w-[14vw] min-w-[150px]'
        variant='outline'
        disabled={isFetchingNextPage || !hasNextPage}
        onClick={fetchNextPage}
      >
        {isFetchingNextPage ? 'Loading...' : 'Load More'}
      </Button>
    </div>
  );
};

export { BooksList, BookCard, LoadMoreButton };
