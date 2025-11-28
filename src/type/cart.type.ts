import type { ApiResponse } from './api.type';

export type AddCartReq = {
  qty: number;
  bookId: number;
};

export type CartItem = {
  id: number;
  cartId: number;
  bookId: number;
  qty: number;
  priceSnapshot: number;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
};

export type AddCartApiResponse = ApiResponse<CartItem>;

// ==================================

export type CartItemBook = {
  id: number;
  title: string;
  price: number;
  coverImage: string;
  isActive: boolean;
  stock: number;
  isbn: string;
};

export type CartItemList = {
  id: number;
  bookId: number;
  qty: number;
  priceSnapshot: number;
  subtotal: number;
  book: CartItemBook;
};

export type CartData = {
  cartId: number;
  items: CartItemList[];
  grandTotal: number;
};

export type GetAllCartApiResponse = ApiResponse<CartData>;
