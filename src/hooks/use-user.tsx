import { useAppSelector } from '@/store';

export const useUser = () => {
  const { user, token } = useAppSelector((state) => state.auth);
  const isUser = user?.role === 'USER';
  const isAdmin = user?.role === 'ADMIN';

  return { isUser, isAdmin, user, token };
};
