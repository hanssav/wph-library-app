export type BorrowDuration = {
  id: string;
  value: number;
  label: string;
};

export const BORROW_DURATIONS: BorrowDuration[] = [
  {
    id: 'duration-3',
    value: 3,
    label: '3 Days',
  },
  {
    id: 'duration-5',
    value: 5,
    label: '5 Days',
  },
  {
    id: 'duration-10',
    value: 10,
    label: '10 Days',
  },
];

export type BorrowTerm = {
  id: string;
  label: string;
  required?: boolean;
};

export const BORROW_TERMS: BorrowTerm[] = [
  {
    id: 'term-1',
    label: 'I agree to return the book(s) before the due date.',
    required: true,
  },
  {
    id: 'term-2',
    label: 'I accept the library borrowing policy.',
    required: true,
  },
];
