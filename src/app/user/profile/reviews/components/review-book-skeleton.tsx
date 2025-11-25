import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Hr } from '@/components/ui/hr';
import { Star } from 'lucide-react';

export const ReviewBookSkeleton = () => {
  return (
    <Card variant='review' className='space-y-4 p-4'>
      <Skeleton className='h-5 w-48' />
      <Hr />
      <div className='flex gap-4'>
        <Skeleton className='w-[92px] h-[138px] rounded-lg shrink-0' />
        <div className='space-y-3 flex-1'>
          <Skeleton className='h-6 w-24 rounded-full' />
          <Skeleton className='h-6 w-56' />
          <Skeleton className='h-5 w-40' />
        </div>
      </div>
      <Hr />
      <div className='space-y-3'>
        <div className='flex gap-1'>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className='size-6 fill-muted stroke-0' />
          ))}
        </div>
        <div className='space-y-2'>
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-11/12' />
          <Skeleton className='h-4 w-9/12' />
        </div>
      </div>
    </Card>
  );
};
