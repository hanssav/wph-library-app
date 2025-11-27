import { Badge, badgeVariants } from '@/components/ui/badge';
import { type VariantProps } from 'class-variance-authority';
import { Card } from '@/components/ui/card';
import { cn, formatDate } from '@/lib/utils';
import type { BaseComponentProps, Loan } from '@/type';
import { type ComponentProps } from 'react';
import dayjs from 'dayjs';
import { Hr } from '@/components/ui/hr';
import { Button } from '@/components/ui/button';
import { Dot } from 'lucide-react';
import { MainBookInfo } from '@/components/container/books';
import { ReviewDialog } from './add-review-dialog';

type LoansCardProps = BaseComponentProps & ComponentProps<'div'>;

const LoansCard = ({ children, className, ...props }: LoansCardProps) => {
  return (
    <div className={cn('grid grid-cols-1 gap-4', className)} {...props}>
      {children}
    </div>
  );
};

const LabelBadge = ({
  label,
  value,
  variant = 'default',
}: {
  label: string;
  value: string;
  variant?: VariantProps<typeof badgeVariants>['variant'];
}) => {
  return (
    <div className='flex-start gap-0.5 lg:gap-3'>
      <p className='text-sm-bold lg:text-md-bold'>{label}</p>
      <Badge variant={variant} className='text-sm-bold lg:text-md-bold'>
        {value}
      </Badge>
    </div>
  );
};

type LoansCardItemProps = { loan: Loan };

const LoansCardItem = ({ loan }: LoansCardItemProps) => {
  const dueAtFormat = formatDate(loan.dueAt);
  const startFormat = formatDate(loan.borrowedAt);

  const durationDays = dayjs(loan.dueAt).diff(dayjs(loan.borrowedAt), 'day');

  return (
    <Card variant={'review'}>
      <div className='flex-between'>
        <LabelBadge label='Status' value={loan.status} variant={'success'} />
        <LabelBadge
          label='Due Date'
          value={dueAtFormat}
          variant={'destructive'}
        />
      </div>
      <Hr />
      <div className='flex-col-start md:flex-row md:justify-between md:items-center gap-6'>
        <MainBookInfo book={loan.Book}>
          <div className='flex-start text-sm-bold lg:text-md-bold'>
            {startFormat} <Dot /> Duration {durationDays} Days
          </div>
        </MainBookInfo>

        <ReviewDialog
          bookId={loan.bookId}
          trigger={
            <Button className='w-full md:max-w-[182px]'>Give Review</Button>
          }
        />
      </div>
    </Card>
  );
};

export { LoansCard, LoansCardItem };
