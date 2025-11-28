import { BookOpen, MessageSquare, type LucideIcon } from 'lucide-react';

export type EmptyStateType = {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
};

export const EMPTY_REVIEWS_DATA: EmptyStateType = {
  icon: MessageSquare,
  title: 'No reviews yet',
  subtitle: 'Be the first to share your thoughts about this book!',
};

export const EMPTY_LOANS_DATA: EmptyStateType = {
  icon: BookOpen,
  title: 'No loans found',
  subtitle: 'Try adjusting the filters or borrow a new book.',
};

export const EMPTY_BOOKS_DATA: EmptyStateType = {
  icon: BookOpen,
  title: 'No books found',
  subtitle: 'Try searching with different keywords or add a new book.',
};
