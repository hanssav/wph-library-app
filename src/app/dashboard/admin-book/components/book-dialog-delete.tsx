import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

type DeleteBookDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isLoading?: boolean;
  bookTitle?: string;
};

export const DeleteBookDialog = ({
  open,
  onOpenChange,
  onConfirm,
  isLoading = false,
  bookTitle,
}: DeleteBookDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='w-full max-w-[450px]! space-y-2 md:space-y-4 '>
        <DialogHeader className='space-y-2'>
          <DialogTitle>Delete Data</DialogTitle>
          <DialogDescription>
            Once deleted, you won't be able to recover this data
            {bookTitle && (
              <>
                <span className='font-semibold'> "{bookTitle}"</span>
              </>
            )}
            .
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className='m-0'>
          <Button
            type='button'
            variant='outline'
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type='button'
            variant='destructive'
            onClick={onConfirm}
            disabled={isLoading}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
