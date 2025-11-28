import { cartService } from '@/service';
import type { RootState } from '@/store';
import type { AddCartReq, ApiResponse, CartData, CartItem } from '@/type';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';

export const cartKeys = {
  getAll: ['cart', 'all'] as const,
};

export const useCart = () => {
  const token = useSelector((state: RootState) => state.auth.token);

  return useQuery<CartData>({
    queryKey: cartKeys.getAll,
    queryFn: async () => {
      const response = await cartService.getAll();
      return response.data.data;
    },
    enabled: !!token,
    placeholderData: {
      cartId: 0,
      items: [],
      grandTotal: 0,
    },
    refetchOnWindowFocus: false,
  });
};

export const useCartCount = () => {
  const { data, isLoading } = useCart();

  const count = data?.items.reduce((total, item) => total + item.qty, 0) ?? 0;
  return { count, isLoading };
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AddCartReq) => cartService.add(data),

    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey: cartKeys.getAll });

      const prevData = queryClient.getQueryData<ApiResponse<CartItem[]>>(
        cartKeys.getAll
      );

      queryClient.setQueryData<ApiResponse<CartItem[]>>(
        cartKeys.getAll,
        (old) => {
          if (!old?.data) return old;

          const existing = old.data.find(
            (item) => item.bookId === newData.bookId
          );

          if (existing) {
            return {
              ...old,
              data: old.data.map((item) =>
                item.bookId === newData.bookId
                  ? { ...item, qty: item.qty + newData.qty }
                  : item
              ),
            };
          }

          return {
            ...old,
            data: [
              ...old.data,
              {
                id: -Date.now(),
                cartId: 0,
                bookId: newData.bookId,
                qty: newData.qty,
                priceSnapshot: 0,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              } as CartItem,
            ],
          };
        }
      );

      return { prevData };
    },

    onError: (_, __, context) => {
      if (context?.prevData) {
        queryClient.setQueryData(cartKeys.getAll, context.prevData);
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.getAll });
      toast.success('added to cart');
    },
  });
};
