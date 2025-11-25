import { BookOpen } from 'lucide-react';

export const EmptyLoans = () => (
  <div className='flex flex-col items-center justify-center py-12 text-center flex-1'>
    <div className='mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#1C65DA]'>
      <BookOpen className='h-12 w-12 text-white' />
    </div>

    <p className='text-lg-bold text-neutral-700'>No loans found</p>
    <p className='text-sm-medium text-neutral-500 mt-2'>
      Try adjusting the filters or borrow a new book.
    </p>
  </div>
);
