import { Badge, badgeVariants } from '@/components/ui/badge';
import { type VariantProps } from 'class-variance-authority';
import { Card } from '@/components/ui/card';
import { cn, formatDate } from '@/lib/utils';
import type { BaseComponentProps, CreateReviewRequest, Loan } from '@/type';
import React, { type ComponentProps } from 'react';
import dayjs from 'dayjs';
import { Hr } from '@/components/ui/hr';
import { Button } from '@/components/ui/button';
import { Dot, Star } from 'lucide-react';
import { MainBookInfo } from '@/components/container/books';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
  DialogTitle,
  DialogHeader,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useAddReview } from '@/hooks/use-review';
import { toast } from 'sonner';

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
  const [datas, setDatas] = React.useState<CreateReviewRequest>({
    star: 0,
    bookId: loan.bookId,
    comment: '',
  });
  const [error, setError] = React.useState<Partial<CreateReviewRequest>>({
    comment: '',
    star: 0,
  });

  const [openDialog, setOpenDialog] = React.useState<boolean>(false);

  const dueAtFormat = formatDate(loan.dueAt);
  const startFormat = formatDate(loan.borrowedAt);

  const durationDays = dayjs(loan.dueAt).diff(dayjs(loan.borrowedAt), 'day');

  const addReview = useAddReview();

  console.log(datas, 'datas');
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
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button className='w-full md:max-w-[182px]'>Give Review</Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px] md:min-w-[438px] space-y-4'>
            <DialogHeader>
              <DialogTitle>Give Review</DialogTitle>
            </DialogHeader>
            <div className='flex-col-center gap-3'>
              <DialogDescription className='text-md-bold'>
                Give Rating
              </DialogDescription>
              <div className='flex gap-1'>
                {Array.from({ length: 5 }).map((_, idx) => {
                  return (
                    <Star
                      onClick={() =>
                        setDatas((prev) => ({ ...prev, star: idx + 1 }))
                      }
                      className={cn(
                        'cursor-pointer',
                        'size-7 md:size-8 stroke-0 fill-[#A4A7AE]',
                        datas.star > idx && ' fill-[#FDB022]'
                      )}
                      key={idx}
                    />
                  );
                })}
              </div>
            </div>
            <div className='space-y-2'>
              <Textarea
                className='w-full min-h-[235px]'
                placeholder='Please share your thoughts about this book'
                onChange={(e) => {
                  setDatas((prev) => ({ ...prev, comment: e.target.value }));
                  setError((prev) => ({ ...prev, comment: '' }));
                }}
              />
              {error && error.comment && (
                <p className='text-sm text-destructive'>{error.comment}</p>
              )}
            </div>
            <Button
              onClick={() => {
                if (!datas.comment)
                  return setError((prev) => ({
                    ...prev,
                    comment: 'comment is required',
                  }));

                if (!datas.star) return toast.error('star rating is required');

                addReview.mutate(datas, {
                  onSuccess: () => {
                    setOpenDialog(false);
                    toast.success('Review added successfully!');
                  },
                });
              }}
              className='h-10 md:h-12'
            >
              {addReview.isPending ? 'Sending Review...' : 'Send'}
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </Card>
  );
};

export { LoansCard, LoansCardItem };
