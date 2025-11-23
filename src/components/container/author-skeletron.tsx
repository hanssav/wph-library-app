import React from 'react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

const AuthorCardSkeleton: React.FC<{ className?: string }> = ({
  className,
}) => {
  return (
    <div
      className={cn(
        'flex flex-row items-center gap-3 p-3 rounded-[12px] shadow-card bg-white',
        className
      )}
    >
      <Skeleton className='size-[60px] rounded-full shrink-0' />

      <div className='space-y-0.5 flex-1 min-w-0'>
        <Skeleton className='h-6 w-4/5 rounded-md' />

        <div className='flex items-center gap-1.5 flex-wrap'>
          <Skeleton className='size-5 rounded-sm' />

          <Skeleton className='h-4 w-20 rounded-md' />
        </div>
      </div>
    </div>
  );
};

export default AuthorCardSkeleton;
