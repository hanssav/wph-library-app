import { type ComponentProps } from 'react';
import { cn } from '@/lib/utils';
import type { BaseComponentProps, BookDetail, CartItemList } from '@/type';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { MainBookInfo } from '@/components/container/books';

type CartCardProps = BaseComponentProps & ComponentProps<'div'>;

const CartCard = ({ children, className, ...props }: CartCardProps) => {
  return (
    <div className={cn('space-y-6', className)} {...props}>
      {children}
    </div>
  );
};

type CartCardItemsProps = {
  cart: CartItemList | BookDetail;
  isSelected?: boolean;
  onToggle?: () => void;
  useCheckbook?: boolean;
};

const CartCardItems = ({
  cart,
  onToggle,
  isSelected,
  useCheckbook = false,
}: CartCardItemsProps) => {
  const book = 'book' in cart ? cart.book : cart;

  return (
    <Card
      className={cn(
        'flex-row shadow-none! ',
        'border-b border-neutral-300 rounded-none last:border-none last:pb-0',
        !useCheckbook && 'p-0'
      )}
    >
      {useCheckbook && (
        <Checkbox
          className='size-5'
          onCheckedChange={onToggle}
          checked={isSelected}
        />
      )}
      <MainBookInfo book={book} />
    </Card>
  );
};

export { CartCard, CartCardItems };
