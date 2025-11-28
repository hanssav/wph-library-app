import { apiInstance, apiService } from '@/api';
import type {
  AddCartApiResponse,
  AddCartReq,
  GetAllCartApiResponse,
} from '@/type';

export const cartService = {
  add: async (req: AddCartReq) =>
    apiInstance.post<AddCartApiResponse>('/cart/items', req),
  getAll: async () => apiInstance.get<GetAllCartApiResponse>('/cart'),
  removeId: async (id: number) => apiService.delete(`/cart/items/${id}`),
};
