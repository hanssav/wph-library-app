import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';
import { Hr } from '@/components/ui/hr';
import SectionWrapper from '@/components/container/section-wrapper';

const DetailInfoLoading = () => {
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

const ReviewItemSkeleton = () => {
  return (
    <Card variant={'review'}>
      <div className='flex-start gap-3'>
        <Skeleton className='size-[60px] rounded-full' />
        <div className='space-y-2'>
          <Skeleton className='h-5 w-32' />
          <Skeleton className='h-4 w-20' />
        </div>
      </div>
      <div className='space-y-2'>
        <div className='flex gap-0.5'>
          {Array.from({ length: 5 }).map((_, idx) => (
            <Skeleton key={idx} className='h-4 w-4 rounded-sm' />
          ))}
        </div>
        <div className='space-y-1'>
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-3/4' />
        </div>
      </div>
    </Card>
  );
};

const ReviewListSkeleton = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-[18px] md:gap-5'>
      {Array.from({ length: 4 }).map((_, idx) => (
        <ReviewItemSkeleton key={idx} />
      ))}
    </div>
  );
};

const DetailPageLoading = () => {
  return (
    <div className='base-container'>
      <section className='flex-col-start gap-4 md:gap-6 w-full'>
        <Skeleton className='h-5 w-64 rounded-md' />
        <DetailInfoLoading />
      </section>

      <Hr />

      <SectionWrapper
        title='Review'
        subTitle={
          <div className='flex gap-0.5 items-center'>
            <Skeleton className='h-4 w-4 rounded-sm' />
            <Skeleton className='h-5 w-24 ml-1' />
          </div>
        }
      >
        <ReviewListSkeleton />
        <div className='w-full flex-center'>
          <Skeleton className='h-10 w-32 rounded-lg' />
        </div>
      </SectionWrapper>

      <Hr />

      <SectionWrapper title='Related Books'>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5'>
          {Array.from({ length: 5 }).map((_, idx) => (
            <Skeleton key={idx} className='aspect-2/3 rounded-lg' />
          ))}
        </div>
      </SectionWrapper>
    </div>
  );
};

export default DetailPageLoading;
