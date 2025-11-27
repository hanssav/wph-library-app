import { useDeleteBook } from '@/hooks';
import React from 'react';

export const useDeleteAdminBook = () => {
  const deleteBook = useDeleteBook();

  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [selectedBookId, setSelectedBookId] = React.useState<number | null>(
    null
  );
  const [selectedBookTitle, setSelectedBookTitle] = React.useState<string>('');

  const handleDeleteClick = (bookId: number, bookTitle: string) => {
    setSelectedBookId(bookId);
    setSelectedBookTitle(bookTitle);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedBookId) {
      deleteBook.mutate(selectedBookId, {
        onSuccess: () => {
          setDeleteDialogOpen(false);
          setSelectedBookId(null);
        },
        onError: () => {
          setDeleteDialogOpen(false);
        },
      });
    }
  };

  return {
    deleteDialogOpen,
    setDeleteDialogOpen,
    selectedBookTitle,
    handleDeleteClick,
    handleDeleteConfirm,
    deleteBook,
  };
};
