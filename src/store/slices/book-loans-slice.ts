import type { CartItemList } from '@/type';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type BookLoansState = {
  datas: CartItemList[];
  duration: number | null;
};

const initialState: BookLoansState = {
  datas:
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('book-loans') || '[]')
      : [],
  duration: null,
};

export const bookLoansSlice = createSlice({
  name: 'book-loans',
  initialState,
  reducers: {
    addBook: (state, action: PayloadAction<CartItemList>) => {
      state.datas.push(action.payload);
      saveToLocalStorage(state.datas);
    },

    clearBookLoans: (state) => {
      state.datas = [];
      if (typeof window !== 'undefined') {
        localStorage.removeItem('book-loans');
      }
    },

    setBookLoansItems: (
      state,
      action: PayloadAction<{ datas: CartItemList[]; duration: number | null }>
    ) => {
      state.datas = action.payload.datas;
      state.duration = action.payload.duration;
      saveToLocalStorage(state.datas);
    },
  },
});

const saveToLocalStorage = (books: CartItemList[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('book-loans', JSON.stringify(books));
  }
};

export const { addBook, clearBookLoans, setBookLoansItems } =
  bookLoansSlice.actions;

const bookLoansReducer = bookLoansSlice.reducer;
export default bookLoansReducer;
