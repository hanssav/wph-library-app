import type { ApiResponse } from './api.type';

export type Category = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type GetCategoryApiResponse = ApiResponse<{ categories: Category[] }>;
