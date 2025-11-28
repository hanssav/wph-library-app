import type { ApiResponse } from './api.type';
import type { Book } from './book.type';

export type Author = {
  id: number;
  name: string;
  bio: string;
  createdAt: string;
  updatedAt: string;
};

export type AuthorWithBooks = Author & {
  books: Book[];
};

export type AuthorDetailResponse = ApiResponse<{
  author: AuthorWithBooks;
  books: Book[];
}>;

export type AuthorsResponse = ApiResponse<{
  authors: Author[];
}>;
