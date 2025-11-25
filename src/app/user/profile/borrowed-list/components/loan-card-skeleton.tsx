import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Hr } from '@/components/ui/hr';
import { Dot } from 'lucide-react';
import { MainBookSkeletonInfo } from '@/components/container/book-skeleton';

export const LoansCardSkeleton = () => {
  return (
    <Card variant='review' className='animate-pulse'>
      <div className='flex-between'>
        <div className='flex items-center gap-2'>
          <Skeleton className='h-5 w-16 rounded-full' />
          <Skeleton className='h-8 w-24 rounded-full' />
        </div>
        <div className='flex items-center gap-2'>
          <Skeleton className='h-5 w-20' />
          <Skeleton className='h-8 w-28 rounded-full' />
        </div>
      </div>

      <Hr />

      <div className='flex-col-start md:flex-row md:justify-between md:items-center gap-6'>
        <MainBookSkeletonInfo />

        <div className='space-y-4 w-full md:w-auto'>
          <div className='flex items-center gap-2 text-sm-bold lg:text-md-bold'>
            <Skeleton className='h-5 w-32' />
            <Dot className='text-neutral-400' />
            <Skeleton className='h-5 w-32' />
          </div>

          <Skeleton className='h-10 w-full md:w-[182px] rounded-lg' />
        </div>
      </div>
    </Card>
  );
};
