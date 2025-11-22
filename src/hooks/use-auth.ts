import type { LoginRequest } from '@/schema';
import { authService } from '@/service/auth.service';
import { useAppDispatch } from '@/store';
import { setCredentials } from '@/store/slices';
import type { LoginSuccessResponse } from '@/type';
import { useMutation } from '@tanstack/react-query';

export const authKeys = {
  login: (data: LoginRequest) => ['auth', 'login', data],
};

export const useLogin = () => {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (req: LoginRequest) => authService.login(req),
    onSuccess: (res: LoginSuccessResponse) =>
      dispatch(setCredentials({ token: res.data.token, user: res.data.user })),
  });
};
