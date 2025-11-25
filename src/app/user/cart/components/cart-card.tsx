import { type ComponentProps } from 'react';
import { cn } from '@/lib/utils';
import type { BaseComponentProps, CartItemList } from '@/type';
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
  cart: CartItemList;
  isSelected: boolean; // ← boolean pasti!
  onToggle: () => void;
};

const CartCardItems = ({ cart, onToggle, isSelected }: CartCardItemsProps) => (
  <Card
    className={cn(
      'flex-row shadow-none! ',
      'border-b border-neutral-300 rounded-none last:border-none last:pb-0'
    )}
  >
    <Checkbox
      className='size-5'
      onCheckedChange={onToggle}
      checked={isSelected}
    />
    <MainBookInfo book={cart.book} />
  </Card>
);

export { CartCard, CartCardItems };
