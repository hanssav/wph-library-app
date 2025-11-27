import { StarrRating } from '@/components/container';

type BookInfoProps = {
  categoryName: string;
  bookTitle: string;
  author: string;
  rating: number;
};
const BookInfo = ({
  categoryName,
  bookTitle,
  author,
  rating,
}: BookInfoProps) => {
  return (
    <div className='space-y-0.5 md:space-y-1'>
      <div className='badge border border-neutral-300 px-2 rounded-sm text-neutral-950 text-sm-bold w-fit'>
        {categoryName}
      </div>
      <h1 className='text-display-xs-bold lg:text-display-sm'>{bookTitle}</h1>
      <p className='text-sm-semibold md:text-md-semibold text-neutral-700'>
        {author}
      </p>
      <StarrRating>{rating}</StarrRating>
    </div>
  );
};

export default BookInfo;
