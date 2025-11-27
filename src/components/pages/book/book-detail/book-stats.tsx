import type { Book } from '@/type';

const StatItem = ({ num, title }: { num: string | number; title: string }) => (
  <div className='flex-1'>
    <h1 className='text-lg-bold md:text-display-xs-bold'>{num}</h1>
    <p className='text-[#0A0D12] text-sm-medium md:text-md-medium'>{title}</p>
  </div>
);
const BookStats = ({ book }: { book: Book }) => {
  return (
    <div className='flex-between gap-5 [&>:not(:last-child)]:border-r [&>:not(:last-child)]:border-neutral-300 border-b border-neutral-300 pb-5'>
      {/* No Data Page */}
      <StatItem title='page' num={book.totalCopies} />
      <StatItem title='Rating' num={book.rating} />
      <StatItem title='Review' num={book.reviewCount} />
    </div>
  );
};

export default BookStats;
