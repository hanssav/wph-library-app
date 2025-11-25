import { SectionWrapper } from '@/components/container';
import { useCart } from '@/hooks';
import { CartCard, CartCardItems } from './components';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import CartSummaryCard from './components/cart-summary-card';

const Cart = () => {
  const { data } = useCart();
  const carts = data?.items ?? [];

  const [selected, setSelected] = useState<number[]>([]);

  const isAllSelected =
    carts &&
    selected &&
    carts.length > 0 &&
    selected.length === data?.items.length;

  const onSelectAll = () => {
    if (selected?.length === carts.length) setSelected([]);
    else setSelected(carts.map((item) => item.id));
  };

  const toggleItem = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className='relative base-container'>
      <SectionWrapper title='My Cart' className='gap-10'>
        <div className='flex md:gap-10'>
          <CartCard className='flex-1 min-w-0'>
            <div className='flex gap-4'>
              <Checkbox checked={isAllSelected} onCheckedChange={onSelectAll} />
              <Label className='text-md-semibold'>Select All</Label>
            </div>
            {data?.items.map((cart) => (
              <CartCardItems
                cart={cart}
                key={cart.id}
                isSelected={selected.includes(cart.id)}
                onToggle={() => toggleItem(cart.id)}
              />
            ))}
          </CartCard>
          <CartSummaryCard selected={selected} />
        </div>
      </SectionWrapper>
    </div>
  );
};

export default Cart;
