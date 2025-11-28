export type LoanBookRequest = {
  bookId: number;
  qty: number;
};

export type LoanStatus = 'BORROWED' | 'RETURNED' | 'OVERDUE' | 'LATE';

export type Loan = {
  id: number;
  userId: number;
  bookId: number;
  status: LoanStatus;
  borrowedAt: string;
  dueAt: string;
  returnedAt: string | null;
};

export type LoanBookResponse = {
  success: boolean;
  message: string;
  data?: {
    loan: Loan;
  };
};
