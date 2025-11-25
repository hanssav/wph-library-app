// ========== REQUEST ==========
export type CreateReviewRequest = {
  bookId: number;
  star: number; // 1 sampai 5
  comment: string;
};

// ========== RESPONSE ==========
export type Review = {
  id: number;
  star: number;
  comment: string;
  userId: number;
  bookId: number;
  createdAt: string;
};

export type BookStats = {
  rating: number;
  reviewCount: number;
};

export type CreateReviewResponseData = {
  review: Review;
  bookStats: BookStats;
};

export type CreateReviewResponse = {
  success: boolean;
  message: string;
  data: CreateReviewResponseData;
};
