import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export const ProfileCardSkeleton = () => {
  return (
    <Card className='p-6 space-y-8 rounded-[12px] w-full md:w-[60vw] lg:w-[39vw]'>
      <div className='flex flex-col space-y-4'>
        <Skeleton className='size-24 rounded-full' />
      </div>
      <div className='space-y-5'>
        {[...Array(4)].map((_, i) => (
          <div key={i} className='flex justify-between items-center'>
            <Skeleton className='h-5 w-28 rounded' />
            <Skeleton className='h-6 w-48 rounded' />
          </div>
        ))}
      </div>
      <Skeleton className='h-10 w-full mx-auto rounded-md' />
    </Card>
  );
};
