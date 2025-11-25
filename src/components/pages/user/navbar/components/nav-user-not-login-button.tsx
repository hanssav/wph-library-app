import { Button } from '@/components/ui/button';
import { AUTH_PATH } from '@/lib/constants';
import { useNavigate } from 'react-router-dom';

export const UserNotLoginButton = () => {
  const navigate = useNavigate();
  return (
    <>
      <Button
        variant={'outline'}
        size={'sm'}
        className='flex-1 rounded-full p-2 md:min-w-[163px]'
        onClick={() => navigate(AUTH_PATH.LOGIN)}
      >
        Login
      </Button>
      <Button
        size={'sm'}
        className='flex-1 rounded-full md:min-w-[163px]'
        onClick={() => navigate(AUTH_PATH.REGISTER)}
      >
        Register
      </Button>
    </>
  );
};
