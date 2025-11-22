import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterRequestSchema, type RegisterRequest } from '@/schema';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useRegister } from '@/hooks';
import { FormFields } from '@/components/container';
import {
  AuthContainer,
  AuthContainerButtonFooter,
  TextLoading,
} from '../partials';
import { registerSection, registerFields } from '../auth.constants';
import { useNavigate } from 'react-router-dom';
import { AUTH_PATH } from '@/lib/constants';

const Register = () => {
  const register = useRegister();
  const navigate = useNavigate();

  const form = useForm<RegisterRequest>({
    resolver: zodResolver(RegisterRequestSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },
  });

  const onSubmit: SubmitHandler<RegisterRequest> = (val) => {
    register.mutate(val, { onSuccess: () => navigate(AUTH_PATH.LOGIN) });
  };

  return (
    <AuthContainer {...registerSection}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          {registerFields.map((item) => (
            <FormFields key={item.name} control={form.control} config={item} />
          ))}

          <Button type='submit' widthFull>
            {register.isPending ? (
              <TextLoading>Registering...</TextLoading>
            ) : (
              registerSection.title
            )}
          </Button>
          <AuthContainerButtonFooter footer={registerSection.footer} />
        </form>
      </Form>
    </AuthContainer>
  );
};

export default Register;
