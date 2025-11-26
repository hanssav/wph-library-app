import { StarrRating } from '@/components/container';
import { MainBookInfo } from '@/components/container/books';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { BaseComponentProps, Book } from '@/type';
import type { ComponentProps } from 'react';
import { BOOK_ACTIONS } from './book.constants';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

type AdminBookCardProps = BaseComponentProps & ComponentProps<'div'>;

const AdminBookCard = ({
  children,
  className,
  ...props
}: AdminBookCardProps) => {
  return (
    <div className={cn('grid grid-cols-1 gap-4', className)} {...props}>
      {children}
    </div>
  );
};

const AdminBookCardItem = ({ book }: { book: Book }) => {
  const navigate = useNavigate();
  return (
    <Card>
      <div className='md:flex-between w-full'>
        <MainBookInfo book={book}>
          <StarrRating>{book.rating}</StarrRating>
        </MainBookInfo>
        <div className='md:flex-center md:gap-[13px] hidden'>
          {BOOK_ACTIONS.map((act) => (
            <Button
              key={act.id}
              variant={'outline'}
              className={cn('px-4 py-1', act.className)}
              onClick={() => act.onClick(book.id, navigate)}
            >
              {act.label}
            </Button>
          ))}
        </div>
      </div>
    </Card>
  );
};

export { AdminBookCard, AdminBookCardItem };
