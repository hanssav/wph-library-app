import { Button } from '@/components/ui/button';

const ButtonUserNotLogin = () => {
  return (
    <>
      <Button
        variant={'outline'}
        size={'sm'}
        className='flex-1 rounded-full p-2 md:min-w-[163px]'
      >
        Login
      </Button>
      <Button size={'sm'} className='flex-1 rounded-full md:min-w-[163px]'>
        Register
      </Button>
    </>
  );
};

export default ButtonUserNotLogin;
