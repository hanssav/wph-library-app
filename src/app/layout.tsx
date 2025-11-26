import { Outlet } from 'react-router-dom';
import { UserFooter, UserNavbar } from '@/components/pages/user';
import { useUser } from '@/hooks';

const Layout = () => {
  const { isUser } = useUser();

  return (
    <div className='flex min-h-screen flex-col'>
      <UserNavbar />
      <main className='flex-1 pt-[68px] md:pt-[84px] flex flex-col'>
        <Outlet />
      </main>
      {isUser && <UserFooter />}
    </div>
  );
};

export default Layout;
