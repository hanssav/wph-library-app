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
  author: Author;
  category: BookCategory;
};

export type BookPagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type BookListResponse = {
  success: boolean;
  message: string;
  data: {
    books: Book[];
    pagination: BookPagination;
  };
};

export type BookRecomendationData = {
  mode: 'rating' | 'popular';
  books: Book[];
};

export type BookRecomendationResponse = {
  success: boolean;
  message: string;
  data: BookRecomendationData;
};
