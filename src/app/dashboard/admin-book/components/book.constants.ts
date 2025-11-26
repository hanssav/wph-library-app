type BookStatus = {
  id: string;
  value: string;
  label: string;
};

export const BOOK_STATUS_TABS: BookStatus[] = [
  { id: 'all', value: 'ALL', label: 'All' },
  { id: 'available', value: 'AVAILABLE', label: 'Available' },
  { id: 'borrowed', value: 'BORROWED', label: 'Borrowed' },
  { id: 'returned', value: 'RETURNED', label: 'Returned' },
  { id: 'damaged', value: 'DAMAGED', label: 'Damaged' },
];

import { DASHBOARD_PATH } from '@/constants/base.constants';
import type { NavigateFunction } from 'react-router-dom';

export type BookAction = {
  id: string;
  label: string;
  className?: string;
  onClick: (bookId: number, navigate: NavigateFunction) => void | Promise<void>;
};

export const BOOK_ACTIONS: BookAction[] = [
  {
    id: 'preview',
    label: 'Preview',
    className: 'text-neutral-950',
    onClick: (bookId, navigate) => {
      console.log(bookId, 'haai');
      navigate(`${DASHBOARD_PATH.BOOK_LIST}/${bookId}`);
    },
  },
  {
    id: 'edit',
    label: 'Edit',
    className: 'text-neutral-950',
    onClick: (bookId, navigate) => {
      navigate(`${DASHBOARD_PATH.BOOK_LIST}/${bookId}/edit`);
    },
  },
  {
    id: 'delete',
    label: 'Delete',
    className: 'text-red-600 hover:text-red-800 font-medium',
    onClick: async (bookId, navigate) => {
      if (confirm('Yakin hapus buku ini?')) {
        await fetch(`/api/books/${bookId}`, { method: 'DELETE' });
        // Opsional: kembali ke list atau refresh data
        navigate('/dashboard/book-list', { replace: true });
        // atau navigate(0) untuk refresh halaman
        // atau pakai query client invalidate kalau pake React Query
      }
    },
  },
];
