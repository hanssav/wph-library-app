import type { ApiResponse } from './api.type';
import type { Book } from './book.type';

// ========== REQUEST ==========
export type CreateReviewRequest = {
  bookId: number;
  star: number; // 1 sampai 5
  comment: string;
};

// ========== RESPONSE ==========

// type ReviewBook = {
//   id: number;
//   title: string;
//   coverImage: string;
// };

export type Review = {
  id: number;
  star: number;
  comment: string;
  userId: number;
  bookId: number;
  createdAt: string;
  Book: Book;
};

export type BookStats = {
  rating: number;
  reviewCount: number;
};

export type CreateReviewResponseData = {
  review: Review;
  bookStats: BookStats;
};

export type CreateReviewResponse = ApiResponse<CreateReviewRequest>;
