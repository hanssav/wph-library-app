import type { LoginRequest, RegisterRequest } from '@/schema';
import { authService } from '@/service/auth.service';
import { useAppDispatch } from '@/store';
import { setCredentials } from '@/store/slices';
import type { LoginSuccessResponse } from '@/type';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export const authKeys = {
  login: (data: LoginRequest) => ['auth', 'login', data],
};

export const useLogin = () => {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: async (req: LoginRequest) => {
      const res = await authService.login(req);
      if (!res.success) {
        throw new Error(res.message || 'Login failed');
      }

      return res;
    },
    onSuccess: (res: LoginSuccessResponse) => {
      const user = { token: res.data.token, user: res.data.user };

      dispatch(setCredentials(user));

      localStorage.setItem('token', user.token);
      localStorage.setItem('user', JSON.stringify(user));

      toast.success('Login successful!');
    },
  });
};

export const useRegister = () =>
  useMutation({
    mutationFn: (req: RegisterRequest) => authService.register(req),
    onSuccess: () => toast.info('Registration successful! Please log in.'),
  });
