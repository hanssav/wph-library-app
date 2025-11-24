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
import { useNavigate } from 'react-router-dom';
import { HOME_PATH } from '@/lib/constants';

const Login = () => {
  const login = useLogin();
  const navigate = useNavigate();

  const form = useForm<LoginRequest>({
    resolver: zodResolver(LoginRequestSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<LoginRequest> = (val) => {
    login.mutate(val, { onSuccess: () => navigate(HOME_PATH) });
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
