import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Share2 } from 'lucide-react';
import type { ComponentProps } from 'react';

const ButtonActions = ({
  className,
  isMobile,
  children,
}: {
  className?: string;
  isMobile?: boolean;
  children: React.ReactNode;
}) => {
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
      {children}
      <Button variant={'outline'} size={'icon-sm'} className='size-10 p-2'>
        <Share2 className='size-full' />
      </Button>
    </div>
  );
};

type AddToCartBtnProps = { isPending: boolean } & ComponentProps<'button'>;

const AddToCartBtn = ({ isPending, children, ...props }: AddToCartBtnProps) => (
  <Button
    variant={'outline'}
    className='flex-1 md:min-w-[130px] lg:min-w-[200px]'
    {...props}
  >
    {children}
  </Button>
);

type BorrowBookBtnProps = ComponentProps<'button'>;

const BorrowBookBtn = ({ children, ...props }: BorrowBookBtnProps) => (
  <Button className='md:min-w-[130px] lg:min-w-[200px] flex-1' {...props}>
    {children}
  </Button>
);

export { ButtonActions, AddToCartBtn, BorrowBookBtn };
