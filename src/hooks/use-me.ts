import { meService } from '@/service';
import type { MeApiResponse } from '@/type';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const meKeys = {
  get: ['me'],
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
      await queryClient.cancelQueries({ queryKey: ['me'] });

      const previousData = queryClient.getQueryData<MeApiResponse>(['me']);

      // Update cache dulu → UI langsung berubah!
      queryClient.setQueryData<MeApiResponse>(['me'], (old) => {
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
      toast.success('Name updated successfully!');
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['me'] });
    },
  });
};
