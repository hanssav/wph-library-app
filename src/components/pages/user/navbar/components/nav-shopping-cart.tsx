import { CART_PATH } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Handbag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ShoppingCartProps {
  isLoggedIn: boolean;
  itemCount?: number;
}

export const ShoppingCart: React.FC<ShoppingCartProps> = ({
  isLoggedIn,
  itemCount = 1,
}) => {
  const navigate = useNavigate();
  return (
    <div
      className={cn('relative flex-center', !isLoggedIn && 'md:hidden')}
      onClick={() => navigate(CART_PATH)}
    >
      <div className='absolute size-5 -right-2 md:-right-1 -translate-y-1/2  bg-accent-red rounded-full text-white text-[12px] aspect-square flex-center'>
        {itemCount}
      </div>
      <Handbag className='size-6 md:size-8' />
    </div>
  );
};
