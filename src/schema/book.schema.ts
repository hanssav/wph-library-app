import { z } from 'zod';

export const BookFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  isbn: z.string().min(1, 'Isbn is required'),
  authorId: z.string().min(1, 'Author is required'),
  categoryId: z.string().min(1, 'Category is required'),
  totalCopies: z.string().min(1, 'Total copies is required'),
  description: z.string().optional(),
  coverImage: z.string().url('Cover image must be a valid URL'),
});

export type BookFormReq = z.infer<typeof BookFormSchema>;

export type BookReq = {
  title: string;
  isbn: string;
  authorId: number;
  categoryId: number;
  totalCopies: number;
  description?: string;
  coverImage: string;
};
