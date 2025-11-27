import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginRequestSchema, type LoginRequest } from '@/schema';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useLogin } from '@/hooks';
import { FormFields } from '@/components/container';
import {
  AuthContainer,
  AuthContainerButtonFooter,
  TextLoading,
} from '@/components/pages/auth';
import { loginSection, loginFields } from '../auth.constants';
import { useNavigate, useLocation } from 'react-router-dom';
import { getDefaultRouteForRole } from '@/routes/protected-route';

const Login = () => {
  console.log('login page');
  const login = useLogin();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || null;

  const form = useForm<LoginRequest>({
    resolver: zodResolver(LoginRequestSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<LoginRequest> = (val) => {
    login.mutate(val, {
      onSuccess: (data) => {
        const userRole = data.data.user.role;

        if (from && from !== '/auth/login' && from !== '/auth/register') {
          navigate(from, { replace: true });
        } else {
          const defaultRoute = getDefaultRouteForRole(userRole);
          navigate(defaultRoute, { replace: true });
        }
      },
    });
  };

  return (
    <AuthContainer {...loginSection}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          {loginFields.map((item) => (
            <FormFields key={item.name} control={form.control} config={item} />
          ))}
          <Button type='submit' widthFull>
            {login.isPending ? (
              <TextLoading> Logging in...</TextLoading>
            ) : (
              loginSection.title
            )}
          </Button>
          <AuthContainerButtonFooter footer={loginSection.footer} />
        </form>
      </Form>
    </AuthContainer>
  );
};

export default Login;
