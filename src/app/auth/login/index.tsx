import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { LoginRequestSchema, type LoginRequest } from '@/schema';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useBooks, useLogin } from '@/hooks';

const Login = () => {
  const login = useLogin();

  const { data } = useBooks();

  console.log(data, 'data');
  const form = useForm<LoginRequest>({
    resolver: zodResolver(LoginRequestSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<LoginRequest> = (val) => {
    login.mutate(val);
  };

  return (
    <>
      <h1 className='text-display-2xl-bold'> HAI</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-display-lg-extrabold text-primary-500'>
                  Username
                </FormLabel>
                <FormControl>
                  <Input placeholder='email' {...field} autoComplete='email' />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder='password' {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className='' type='submit'>
            Login
          </Button>
        </form>
      </Form>
    </>
  );
};

export default Login;
