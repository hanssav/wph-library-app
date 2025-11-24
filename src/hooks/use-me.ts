import { meService } from '@/service';
import { useQuery } from '@tanstack/react-query';

const meKeys = {
  get: ['me'],
};

export const useMe = () =>
  useQuery({ queryKey: meKeys.get, queryFn: meService.me });
