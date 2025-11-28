import type { ApiResponse, Pagination } from './api.type';
import type { Author } from './author.type';

export type BookRecomendationParams = {
  by?: 'rating' | 'popular'; // default: rating
  categoryId?: number;
  limit?: number; // default: 10
};

export type BookSearchParams = {
  /** Search by title or keyword */
  q?: string;

  /** Filter by category ID */
  categoryId?: number;

  /** Filter by author ID */
  authorId?: number;

  /** Page number (1-based) */
  page?: number;

  /** Number of items per page */
  limit?: number;
};

export type BookCategory = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type Book = {
  id: number;
  title: string;
  description: string;
  isbn: string;
  publishedYear: number;
  coverImage: string | null;
  rating: number;
  reviewCount: number;
  totalCopies: number;
  availableCopies: number;
  borrowCount: number;
  authorId: number;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
  Author: Author;
  Category: BookCategory;
};

export type BookListResponse = ApiResponse<{
  books: Book[];
  pagination: Pagination;
}>;

export type BookRecomendationData = {
  mode: 'rating' | 'popular';
  books: Book[];
};

export type BookRecomendationResponse = {
  success: boolean;
  message: string;
  data: BookRecomendationData;
};

export type ReviewBook = {
  id: number;
  star: number;
  comment: string;
  createdAt: string;
  User: {
    id: number;
    name: string;
  };
};

export type BookDetail = Book & {
  Review: Array<ReviewBook>;
};

export type BookDetailApiResponse = ApiResponse<BookDetail>;
export type CreateBookApiResponse = ApiResponse<Book>;
export type UpdateBookApiResponse = ApiResponse<Book>;
