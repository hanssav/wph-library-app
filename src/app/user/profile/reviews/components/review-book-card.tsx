import { MainBookInfo } from '@/components/container/books';
import { Card } from '@/components/ui/card';
import { Hr } from '@/components/ui/hr';
import { cn } from '@/lib/utils';
import type { BaseComponentProps, Review } from '@/type';
import dayjs from 'dayjs';
import { Star } from 'lucide-react';
import type { ComponentProps } from 'react';

type ReviewBookCardProps = BaseComponentProps & ComponentProps<'div'>;

const ReviewBookCard = ({
  children,
  className,
  ...props
}: ReviewBookCardProps) => {
  return (
    <div className={cn('grid grid-cols-1 gap-4', className)} {...props}>
      {children}
    </div>
  );
};

type ReviewBookItemProps = { review: Review };

const ReviewBookItem = ({ review }: ReviewBookItemProps) => {
  const createdAtFormated = dayjs(review.createdAt).format(
    'D MMMM YYYY, HH:mm'
  );

  return (
    <Card variant={'review'}>
      <p className='text-sm-semibold md:text-md-semibold'>
        {createdAtFormated}
      </p>
      <Hr />
      <MainBookInfo book={review.Book} />
      <Hr />
      <div className='space-y-2'>
        <div className='flex-start gap-2'>
          {Array.from({ length: review.star }).map((_, idx) => (
            <Star key={idx} className='size-6 fill-[#FDB022] stroke-0' />
          ))}
        </div>
        <p className='text-sm-semibold md:text-md-semibold'>{review.comment}</p>
      </div>
    </Card>
  );
};

export { ReviewBookCard, ReviewBookItem };
