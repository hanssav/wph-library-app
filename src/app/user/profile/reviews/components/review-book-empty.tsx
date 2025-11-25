import { MessageSquare } from 'lucide-react';

export const EmptyReviews = () => (
  <div className='flex flex-col flex-1 items-center justify-center py-12 text-center'>
    <div className='relative mb-6'>
      <div className='absolute inset-0 rounded-full bg-[#1C65DA] blur-xl opacity-20' />
      <div className='relative flex h-24 w-24 items-center justify-center rounded-full bg-[#1C65DA] bg-opacity-10'>
        <MessageSquare className='h-12 w-12 text-white' />
      </div>
    </div>

    <p className='text-lg-bold text-neutral-700'>No reviews yet</p>
    <p className='text-sm-medium text-neutral-500 mt-2 '>
      Be the first to share your thoughts about this book!
    </p>
  </div>
);
