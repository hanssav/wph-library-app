import { reviewService } from '@/service';
import type { CreateReviewRequest } from '@/type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { bookKeys } from './use-book';
import { meKeys } from './use-me';

export const useAddReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateReviewRequest) => reviewService.add(data),
    onSuccess: (_, variable: CreateReviewRequest) => {
      queryClient.invalidateQueries({
        queryKey: bookKeys.id(variable.bookId),
        exact: false,
      });
      queryClient.invalidateQueries({
        queryKey: meKeys.review(),
        exact: false,
      });
    },
  });
};
