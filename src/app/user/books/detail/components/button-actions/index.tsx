import { Button } from '@/components/ui/button';
import { useAddToCart } from '@/hooks';
import { cn } from '@/lib/utils';
import { Share2 } from 'lucide-react';
import { useParams } from 'react-router-dom';

const ButtonActions = ({
  className,
  isMobile,
}: {
  className?: string;
  isMobile?: boolean;
}) => {
  const addCart = useAddToCart();
  const { id } = useParams();
  const bookId = Number(id);

  const handleAddToCart = () => {
    addCart.mutate({
      bookId,
      qty: 1,
    });
  };

  return (
    <div
      className={cn(
        'flex gap-3',
        isMobile && 'fixed bottom-0 inset-x-0 bg-white p-4 shadow-card z-50',
        isMobile && 'md:hidden',
        !isMobile && 'lg:max-w-[70.65%]',
        className
      )}
    >
      <Button
        variant={'outline'}
        className='flex-1 md:min-w-[130px] lg:min-w-[200px]'
        onClick={handleAddToCart}
        disabled={addCart.isPending}
      >
        {addCart.isPending ? 'Adding...' : 'Add To Cart'}
      </Button>
      <Button className='md:min-w-[130px] lg:min-w-[200px] flex-1'>
        Borrow Book
      </Button>
      <Button variant={'outline'} size={'icon-sm'} className='size-10 p-2'>
        <Share2 className='size-full' />
      </Button>
    </div>
  );
};

export default ButtonActions;
