import React from 'react';
import { cn } from '@/lib/utils';
import { Skeleton } from '../ui/skeleton';

const BookCardSkeleton: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      className={cn(
        'flex flex-col rounded-[12px] w-full shadow-card',
        className
      )}
    >
      <div className='p-0 m-0'>
        <Skeleton className='w-full aspect-3/4 rounded-t-[12px]' />
      </div>

      <div className='p-3 space-y-0.5 lg:p-4 lg:space-y-1'>
        <Skeleton className='h-5 w-11/12 rounded-md' />
        <Skeleton className='h-5 w-4/5 rounded-md' />

        <Skeleton className='h-4 w-3/5 rounded-md mt-2' />

        <div className='flex items-center gap-1.5 pt-1'>
          <Skeleton className='w-4 h-4 rounded-sm' />
          <Skeleton className='h-4 w-12 rounded-md' />
        </div>
      </div>
    </div>
  );
};

export default BookCardSkeleton;
