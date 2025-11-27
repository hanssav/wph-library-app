import { useAppSelector } from '@/store';

export const useUser = () => {
  const { user, token, isHydrated } = useAppSelector((state) => state.auth);
  const isUser = user?.role === 'USER';
  const isAdmin = user?.role === 'ADMIN';
  const isLoading = !isHydrated;

  return { isUser, isAdmin, user, token, isLoading };
};
