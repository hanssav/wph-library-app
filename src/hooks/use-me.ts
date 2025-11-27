import { meService } from '@/service';
import type {
  GetLoansParams,
  GetReviewParams,
  LoansApiResponse,
  MeApiResponse,
} from '@/type';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { toast } from 'sonner';

export const meKeys = {
  get: ['me'],
  loans: (params: GetLoansParams) => ['me', 'loans', params],
  review: (params?: GetReviewParams) => ['me', 'reviews', params],
};

export const useMe = () =>
  useQuery({ queryKey: meKeys.get, queryFn: meService.me });

export const useUpdateMe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newName: string) => meService.update({ name: newName }),

    //DEV NOTE::
    // OPTIMISTIC UPDATE — UI langsung berubah sebelum server respon
    onMutate: async (newName) => {
      await queryClient.cancelQueries({ queryKey: meKeys.get });

      const previousData = queryClient.getQueryData<MeApiResponse>(meKeys.get);

      // Update cache dulu → UI langsung berubah!
      queryClient.setQueryData<MeApiResponse>(meKeys.get, (old) => {
        if (!old) return old;
        return {
          ...old,
          data: {
            ...old.data,
            profile: {
              ...old.data.profile,
              // ← langsung keliatan di UI
              name: newName,
            },
          },
        };
      });

      // Return buat rollback
      return { previousData };
    },

    onError: (_err, _newName, context) => {
      queryClient.setQueryData(['me'], context?.previousData);
    },

    onSuccess: (response) => {
      queryClient.setQueryData(['me'], response);

      queryClient.invalidateQueries({ queryKey: ['me'] });
      queryClient.invalidateQueries({
        queryKey: ['users'],
      });
      queryClient.invalidateQueries({
        predicate: (query) =>
          query.queryKey[0] === 'me' ||
          query.queryKey.includes('user') ||
          query.queryKey.includes('profile') ||
          query.queryKey.includes('admin') ||
          query.queryKey.includes('auth'),
      });

      toast.success('Name updated successfully!');
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: meKeys.get });
    },
  });
};

export const useLoans = (params: GetLoansParams) =>
  useInfiniteQuery<LoansApiResponse>({
    queryKey: meKeys.loans(params),
    queryFn: async ({ pageParam = 1 }) => {
      const finalParams = {
        ...params,
        page: Number(pageParam),
      };
      const res = await meService.loans(finalParams);
      return res;
    },
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.data.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
    getPreviousPageParam: (lastPage) => {
      const { page } = lastPage.data.pagination;
      return page > 1 ? page - 1 : undefined;
    },
    initialPageParam: 1,
  });

export const useReviews = (params?: GetReviewParams) =>
  useQuery({
    queryKey: meKeys.review(params),
    queryFn: () => meService.reviews(params).then((res) => res.data),
  });
