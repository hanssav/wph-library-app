import { Button } from '@/components/ui/button';
import { Card, CardTitle } from '@/components/ui/card';
import { CHECKOUT_PATH } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

export type CartSummaryProps = {
  selected: number[];
};

const CartSummaryCard = ({ selected }: CartSummaryProps) => {
  const itemCount = selected.length;
  const navigate = useNavigate();

  const SummaryContent = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className={cn('space-y-6', isMobile ? 'flex-between gap-3' : '')}>
      {!isMobile && (
        <CardTitle className='text-xl-bold'>Loan Summary</CardTitle>
      )}

      <div
        className={cn(
          'flex-between',
          isMobile && 'flex-1 flex-col items-start'
        )}
      >
        <p className={cn('text-sm-medium', !isMobile && 'md:text-md-medium')}>
          Total Book
        </p>
        <p className={cn('text-sm-bold', !isMobile && 'md:text-md-bold')}>
          {itemCount} items
        </p>
      </div>

      <Button
        onClick={() => navigate(CHECKOUT_PATH)}
        className={cn('h-12', isMobile ? 'min-w-[150px]' : 'w-full mt-6')}
      >
        Borrow Book
      </Button>
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <Card className='hidden md:block w-full md:w-80 lg:w-96 shrink-0 p-6'>
        <SummaryContent />
      </Card>

      {/* Mobile */}
      <div className='md:hidden fixed bottom-0 left-0 right-0 shadow-card bg-white z-50 p-4'>
        <SummaryContent isMobile />
      </div>

      <div className='h-32 md:hidden' aria-hidden='true' />
    </>
  );
};

export default CartSummaryCard;
