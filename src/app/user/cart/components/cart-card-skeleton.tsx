import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

export const CartCardItemsSkeleton = () => {
  return (
    <Card
      className={cn(
        'flex-row shadow-none animate-pulse',
        'border-b border-neutral-300 rounded-none last:border-none last:pb-0'
      )}
    >
      <div className='flex items-center justify-center px-4'>
        <Skeleton className='size-5 rounded-md' />
      </div>

      <div className='flex gap-4 py-4 flex-1'>
        <Skeleton className='w-[92px] h-[130px] rounded-md shrink-0' />

        <div className='space-y-3 flex-1'>
          <Skeleton className='h-6 w-28 rounded-full' />
          <Skeleton className='h-7 w-56' />
          <Skeleton className='h-7 w-44' />
          <Skeleton className='h-5 w-36' />
        </div>
      </div>
    </Card>
  );
};
