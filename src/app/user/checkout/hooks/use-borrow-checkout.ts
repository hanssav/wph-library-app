// src/hooks/useBorrowCheckout.ts
import { useLoanBooks } from '@/hooks';
import { useAppDispatch } from '@/store';
import { setBookLoansItems } from '@/store/slices/book-loans-slice';
import { toast } from 'sonner';

export const useBorrowCheckout = (loansData: any[]) => {
  const dispatch = useAppDispatch();
  const { mutate, isPending } = useLoanBooks();

  const onCheckout = (selectedDuration: string) => {
    if (loansData.length === 0) {
      toast.error('Keranjang pinjaman kosong');
      return;
    }

    const days = Number(selectedDuration);
    if (!selectedDuration || isNaN(days) || days <= 0) {
      toast.error('Pilih durasi pinjaman');
      return;
    }

    const requests = loansData.map((item) => ({
      bookId: item.bookId || item.id,
      qty: item.qty,
    }));

    const cartItemIds = loansData
      .map((item) => item.id)
      .filter((id): id is number => typeof id === 'number');

    dispatch(
      setBookLoansItems({
        datas: loansData,
        duration: days,
      })
    );

    mutate({ requests, cartItemIds });
  };

  return { onCheckout, isPending };
};
