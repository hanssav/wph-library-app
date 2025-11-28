import { Button } from '@/components/ui/button';
import { BORROWED_LIST_PATH } from '@/constants';
import { formatDate } from '@/lib/utils';
import type { RootState } from '@/store';
import { Check } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CheckoutSuccess = () => {
  const duration = useSelector((state: RootState) => state.bookLoans.duration);
  const navigate = useNavigate();
  const title = 'Borrowing Successful!';
  const subtitle =
    'Your book has been successfully borrowed. Please return it ';
  const Icon = Check;

  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + Number(duration));

  return (
    <div className='h-full flex-1 flex-center px-4'>
      <div className='flex flex-col flex-1 items-center justify-center text-center gap-8'>
        <div className='relative'>
          <div className='absolute inset-0 rounded-full bg-[#1C65DA] blur-xl opacity-20' />
          <div className='relative flex h-24 w-24 items-center justify-center rounded-full bg-[#1C65DA] bg-opacity-10'>
            <Icon className='h-12 w-12 text-white' />
          </div>
        </div>

        <div className='space-y-0.5'>
          <p className='text-lg-bold md:text-display-xs-bold text-neutral-700'>
            {title}
          </p>

          {subtitle && (
            <p className='text-md-smibold text-neutral-500 mt-2'>
              {subtitle}{' '}
              <span className='text-accent-red'>{formatDate(dueDate)}</span>
            </p>
          )}
        </div>
        <Button
          onClick={() => navigate(`/profile/${BORROWED_LIST_PATH}`)}
          className='w-full md:w-fit md:px-16'
        >
          See Borrowed List
        </Button>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
