import {
  EmptyState,
  QueryStateComp,
  SectionWrapper,
} from '@/components/container';
import { useCart } from '@/hooks';
import { CartCard, CartCardItems, CartCardItemsSkeleton } from './components';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import CartSummaryCard from './components/cart-summary-card';
import { toast } from 'sonner';
import { useAppDispatch } from '@/store';
import { setBookLoansItems } from '@/store/slices';
import { useNavigate } from 'react-router-dom';
import { CHECKOUT_PATH, EMPTY_CART_DATA } from '@/constants';

const Cart = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading } = useCart();
  const carts = data?.items ?? [];
  const navigate = useNavigate();

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

  const onBookLoans = () => {
    if (selected.length === 0) return toast.error('please select book');

    const bookLoans =
      data?.items?.filter((book) => selected.includes(book.id)) ?? [];
    dispatch(setBookLoansItems({ datas: bookLoans, duration: null }));

    navigate(CHECKOUT_PATH);
  };

  return (
    <div className='relative base-container'>
      <SectionWrapper title='My Cart' className='gap-10'>
        <div className='flex md:gap-10'>
          <CartCard className='flex-1 min-w-0'>
            {data && data?.items.length > 0 && (
              <div className='flex gap-4'>
                <Checkbox
                  checked={isAllSelected}
                  onCheckedChange={onSelectAll}
                />
                <Label className='text-md-semibold'>Select All</Label>
              </div>
            )}
            <QueryStateComp
              isLoading={isLoading}
              skeletonCount={4}
              data={data?.items}
              Skeleton={CartCardItemsSkeleton}
              fallback={<EmptyState data={EMPTY_CART_DATA} />}
            >
              {(cart) => (
                <CartCardItems
                  cart={cart}
                  key={cart.id}
                  isSelected={selected.includes(cart.id)}
                  onToggle={() => toggleItem(cart.id)}
                  useCheckbook
                />
              )}
            </QueryStateComp>
          </CartCard>
          <CartSummaryCard selected={selected} onLoans={onBookLoans} />
        </div>
      </SectionWrapper>
    </div>
  );
};

export default Cart;
