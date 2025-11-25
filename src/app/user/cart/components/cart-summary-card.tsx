import { Button } from '@/components/ui/button';
import { Card, CardTitle } from '@/components/ui/card';

export type CartSummaryProps = {
  selected: number[];
};

const CartSummaryCard = ({ selected }: CartSummaryProps) => {
  const itemCount = selected.length;

  return (
    <>
      {/* Desktop */}
      <Card className='hidden md:block w-full md:w-80 lg:w-96 shrink-0 space-y-6 p-6'>
        <CardTitle className='text-xl-bold'>Loan Summary</CardTitle>

        <div className='flex-between'>
          <p className='text-sm-medium md:text-md-medium'>Total Book</p>
          <h2 className='text-sm-bold md:text-md-bold'>{itemCount} items</h2>
        </div>

        <Button className='w-full h-12 mt-6'>Borrow Book</Button>
      </Card>

      {/* Mobile - Fixed Bottom */}
      <div className='md:hidden fixed bottom-0 left-0 right-0 shadow-card bg-white z-50'>
        <div className='flex-between p-4 gap-3'>
          <div className='flex-1'>
            <p className='text-sm-medium'>Total Book</p>
            <p className='text-sm-bold'>{itemCount} items</p>
          </div>
          <Button className='min-w-[150px] h-12'>Borrow Book</Button>
        </div>
      </div>

      <div className='h-32 md:hidden' aria-hidden='true' />
    </>
  );
};

export default CartSummaryCard;
