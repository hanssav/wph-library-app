import { CHECKOUT_PATH } from '@/constants';
import { cartService } from '@/service';
import { loanService } from '@/service/loan.service';
import type { RootState } from '@/store';
import type { LoanBookRequest, LoanBookResponse } from '@/type';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const useLoanBooks = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const book = useSelector((state: RootState) => state.bookLoans.datas);

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

      if ('book' in book) {
        await Promise.all(cartItemIds.map((id) => cartService.removeId(id)));
      }

      return results;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      queryClient.invalidateQueries({ queryKey: ['me'] });
      navigate(`${CHECKOUT_PATH}/success`);
    },
  });
};
