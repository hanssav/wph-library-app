import { useBook, useCreateBooks, useUpdateBook } from '@/hooks';
import {
  type BookFormReq,
  BookFormSchema,
  type BookReq,
} from '@/schema/book.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';

export const useBookForm = (id: string | undefined, isCreate: boolean) => {
  const updateBook = useUpdateBook();
  const createBook = useCreateBooks();
  const isLoading = createBook.isPending || updateBook.isPending;

  const { data: bookData } = useBook(Number(id), {
    enabled: !isCreate && !!id,
  });

  const form = useForm<BookFormReq>({
    resolver: zodResolver(BookFormSchema),
    defaultValues: {
      authorId: '',
      categoryId: '',
      coverImage: '',
      description: '',
      title: '',
      isbn: '',
      totalCopies: '',
    },
  });

  React.useEffect(() => {
    if (bookData?.data && !isLoading) {
      const book = bookData.data;
      form.reset({
        title: book.title,
        isbn: book.isbn,
        authorId: String(book.authorId),
        categoryId: String(book.categoryId),
        totalCopies: String(book.totalCopies),
        description: book.description || '',
        coverImage: book.coverImage || '',
      });
    }
  }, [bookData, form]);

  const onSubmit: SubmitHandler<BookFormReq> = (values) => {
    const payload: BookReq = {
      ...values,
      authorId: Number(values.authorId),
      categoryId: Number(values.categoryId),
      totalCopies: Number(values.totalCopies),
      coverImage: values.coverImage || '',
    };

    if (isCreate) {
      createBook.mutate(payload);
    } else {
      updateBook.mutate({ id: Number(id), data: payload });
    }
  };

  return { form, onSubmit, mutationLoading: isLoading };
};
