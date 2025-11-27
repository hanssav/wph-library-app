import type { LoanStatus } from '@/type';

type StatusOption = {
  id: string;
  label: string;
  value: string;
};

export const STATUS_OPTIONS: StatusOption[] = [
  { label: 'All', value: 'all' as const, id: 'all' },
  { label: 'Borrowed', value: 'BORROWED' as LoanStatus, id: 'BORROWED' },
  { label: 'Late', value: 'LATE' as LoanStatus, id: 'LATE' },
  { label: 'Returned', value: 'RETURNED' as LoanStatus, id: 'RETURNED' },
];
