import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import React from 'react';
import { toast } from 'sonner';
import { useAddReview } from '@/hooks/use-review';
import type { CreateReviewRequest } from '@/type';

type ReviewDialogProps = {
  bookId: number;
  trigger: React.ReactNode;
};

export const ReviewDialog = ({ bookId, trigger }: ReviewDialogProps) => {
  const [open, setOpen] = React.useState(false);
  const [datas, setDatas] = React.useState<CreateReviewRequest>({
    bookId,
    star: 0,
    comment: '',
  });
  const [error, setError] = React.useState<{ comment?: string }>({});

  const addReview = useAddReview();

  const handleSubmit = () => {
    setError({});

    if (!datas.comment.trim()) {
      setError({ comment: 'Please write your review' });
      return;
    }
    if (datas.star === 0) {
      toast.error('Please give a star rating');
      return;
    }

    addReview.mutate(datas, {
      onSuccess: () => {
        toast.success('Thank you! Your review has been submitted.');
        setOpen(false);
        setDatas({ bookId, star: 0, comment: '' });
      },
      onError: () => {
        toast.error('Failed to submit review. Try again.');
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className='sm:max-w-[425px] md:min-w-[438px] space-y-6'>
        <DialogHeader className='px-0'>
          <DialogTitle>Give Review</DialogTitle>
        </DialogHeader>

        <div className='flex flex-col items-center gap-3'>
          <DialogDescription className='text-md-bold'>
            Give Rating
          </DialogDescription>
          <div className='flex gap-1'>
            {Array.from({ length: 5 }).map((_, idx) => (
              <Star
                key={idx}
                onClick={() => setDatas((prev) => ({ ...prev, star: idx + 1 }))}
                className={cn(
                  'cursor-pointer size-7 md:size-8 stroke-0 transition-all',
                  datas.star > idx ? 'fill-[#FDB022]' : 'fill-[#A4A7AE]'
                )}
              />
            ))}
          </div>
        </div>

        {/* Textarea */}
        <div className='space-y-2'>
          <Textarea
            value={datas.comment}
            onChange={(e) => {
              setDatas((prev) => ({ ...prev, comment: e.target.value }));
              setError({});
            }}
            placeholder='Please share your thoughts about this book'
            className='w-full min-h-[200px] max-h-96 resize-none overflow-y-auto'
          />
          {error.comment && (
            <p className='text-sm text-destructive'>{error.comment}</p>
          )}
        </div>

        <Button
          onClick={handleSubmit}
          disabled={addReview.isPending}
          className='w-full h-10 md:h-12'
        >
          {addReview.isPending ? 'Sending...' : 'Send Review'}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
