import { Skeleton } from '@/components/ui/skeleton';

export const DetailInfoSkeleton = () => {
  return (
    <div className='flex flex-col md:flex-row md:mx-0 gap-8'>
      <div className='flex-center'>
        <Skeleton className='w-full max-w-[212px] md:min-w-[321px] aspect-321/482 md:aspect-2/3 relative overflow-hidden border-4 border-neutral-300' />
      </div>
      <div className='flex-col-start flex-1 gap-4 md:gap-5'>
        <div className='space-y-3 md:space-y-6'>
          <div className='space-y-0.5 md:space-y-1'>
            <Skeleton className='badge h-6 w-20 rounded-sm' />
            <Skeleton className='h-8 md:h-10 w-3/4 rounded-md' />
            <Skeleton className='h-5 w-1/2 rounded-md' />
            <div className='flex items-center gap-1 pt-1'>
              <Skeleton className='h-5 w-5 rounded-full' />
              <Skeleton className='ml-2 h-4 w-12 rounded-md' />
            </div>
          </div>
          {/* Book Stats  */}
          <div className='flex-between gap-5 border-b border-neutral-300 pb-5'>
            <div className='flex-1 space-y-1'>
              <Skeleton className='h-7 w-16' />
              <Skeleton className='h-4 w-12' />
            </div>
            <div className='flex-1 space-y-1 border-x border-neutral-300 px-5'>
              <Skeleton className='h-7 w-20' />
              <Skeleton className='h-4 w-16' />
            </div>
            <div className='flex-1 space-y-1'>
              <Skeleton className='h-7 w-20' />
              <Skeleton className='h-4 w-20' />
            </div>
          </div>
          {/* Desc */}
          <div className='space-y-3'>
            <Skeleton className='h-7 w-32' />
            <div className='space-y-2'>
              <Skeleton className='h-4 w-full' />
              <Skeleton className='h-4 w-full' />
              <Skeleton className='h-4 w-11/12' />
              <Skeleton className='h-4 w-10/12' />
            </div>
          </div>
        </div>
        <div className='gap-3 p-4 hidden md:flex'>
          <Skeleton className='h-12 flex-1 rounded-lg' />
          <Skeleton className='h-12 flex-1 rounded-lg' />
          <Skeleton className='h-10 w-10 rounded-lg' />
        </div>
      </div>
    </div>
  );
};
