import { BookOpen } from 'lucide-react';

export const EmptyLoans = () => (
  <div className='flex flex-col items-center justify-center py-12 text-center'>
    <BookOpen className='w-16 h-16 text-neutral-400 mb-4' />
    <p className='text-lg-bold text-neutral-700'>No loans found</p>
    <p className='text-sm-medium text-neutral-500 mt-2'>
      Try adjusting the filters or borrow a new book.
    </p>
  </div>
);
