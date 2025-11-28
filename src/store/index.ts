import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth-slice';

import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from 'react-redux';
import bookLoansReducer from './slices/book-loans-slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    bookLoans: bookLoansReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  // devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
