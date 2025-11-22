import type { AuthUser } from '@/type';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
  token: string | null;
  user: AuthUser | null;
};

const initialState: AuthState = {
  token: null,
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ token: string; user: AuthUser }>
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    clearAuth: (state) => {
      state.token = null;
      state.user = null;
    },
  },
});

export const { setCredentials, setToken, clearAuth } = authSlice.actions;

const authReducer = authSlice.reducer;
export default authReducer;
