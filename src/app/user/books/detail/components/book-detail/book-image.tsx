import { getImage } from '@/lib/utils';
import type { Book } from '@/type';

const BookImage = ({ coverImage }: { coverImage: Book['coverImage'] }) => {
  return (
    <div className='w-full max-w-[212px] md:min-w-[321px] aspect-321/482 md:aspect-2/3 relative overflow-hidden border-4 border-neutral-300'>
      <img src={getImage(coverImage)} className='object-cover h-full' />
    </div>
  );
};

export default BookImage;
