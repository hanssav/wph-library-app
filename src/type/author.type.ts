import type { ApiResponse } from './api.type';

export type Author = {
  id: number;
  name: string;
  bio: string;
  createdAt: string;
  updatedAt: string;
};

export type AuthorsResponse = ApiResponse<{
  authors: Author[];
}>;
