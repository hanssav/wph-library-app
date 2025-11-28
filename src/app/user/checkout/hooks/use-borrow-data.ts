import { useMe } from '@/hooks';
import type { RootState } from '@/store';
import { useSelector } from 'react-redux';

export const useBorrowData = () => {
  const { data: user } = useMe();
  if (!user) throw new Error('user not found');

  const loansData = useSelector((state: RootState) => state.bookLoans.datas);
  const profile = user?.data.profile;

  return { user, profile, loansData };
};
