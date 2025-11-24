import { Avatar, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';
import { getImage } from '@/lib/utils';
import type { ReviewBook } from '@/type';
import { Star } from 'lucide-react';

const ReviewItem = ({ review }: { review: ReviewBook }) => {
  return (
    <Card variant={'review'}>
      <div className='flex-start gap-3'>
        <Avatar className='size-[60px]'>
          {/* no image avatar from backend */}
          <AvatarImage
            src={getImage(review.User?.name, 'avatar')}
            alt={review.User?.name}
          />
        </Avatar>
        <CardContent>
          <CardTitle>{review.User?.name}</CardTitle>
          <CardDescription>{review.id} books</CardDescription>
        </CardContent>
      </div>

      <div className='space-y-2'>
        <div className='flex gap-0.5'>
          {Array.from({ length: review.star }).map((_, idx) => (
            <Star
              className='fill-[#FFAB0D] stroke-[#FFAB0D] size-4'
              key={idx}
            />
          ))}
        </div>
        <CardDescription>{review.comment}</CardDescription>
      </div>
    </Card>
  );
};

export default ReviewItem;
