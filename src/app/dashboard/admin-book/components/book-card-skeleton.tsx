import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export const AdminBookCardItemSkeleton = () => {
  return (
    <Card className='animate-pulse'>
      <div className='md:flex-between w-full'>
        <div className='flex gap-4'>
          <Skeleton className='w-[92px] h-[130px] rounded-md shrink-0' />

          <div className='space-y-2 flex-1'>
            <Skeleton className='h-5 w-24 rounded-full' />

            <Skeleton className='h-6 w-40' />
            <Skeleton className='h-6 w-32' />

            <Skeleton className='h-4 w-28' />

            <div className='flex items-center gap-1'>
              <Skeleton className='h-4 w-4 rounded-full' />
              <Skeleton className='h-4 w-10' />
            </div>
          </div>
        </div>

        <div className='hidden md:flex-center md:gap-[13px]'>
          <Skeleton className='h-8 w-20 rounded-lg' />
          <Skeleton className='h-8 w-20 rounded-lg' />
        </div>
      </div>
    </Card>
  );
};
