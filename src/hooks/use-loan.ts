import { CHECKOUT_PATH } from '@/constants';
import { cartService } from '@/service';
import { loanService } from '@/service/loan.service';
import type { LoanBookRequest, LoanBookResponse } from '@/type';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const useLoanBooks = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (payload: {
      requests: LoanBookRequest[];
      cartItemIds: number[];
    }) => {
      const { requests, cartItemIds } = payload;

      const results: LoanBookResponse[] = [];
      for (const req of requests) {
        const res = await loanService.post(req);
        results.push(res);
      }

      await Promise.all(cartItemIds.map((id) => cartService.removeId(id)));

      return results;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      queryClient.invalidateQueries({ queryKey: ['me'] });
      navigate(`${CHECKOUT_PATH}/success`);
    },

    onError: (error: any) => {
      toast.error(error?.message || 'Gagal meminjam buku');
    },
  });
};
