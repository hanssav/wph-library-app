import type { Book } from '@/type';

const BookDesc = ({ desc }: { desc: Book['description'] }) => {
  return (
    <div className='space-y-1'>
      <h1 className='text-xl-bold'>Description</h1>
      <p className='text-desc'>{desc}</p>
    </div>
  );
};

export default BookDesc;
