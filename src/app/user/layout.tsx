import { Outlet } from 'react-router-dom';
import { UserFooter, UserNavbar } from './components';

const UserLayout = () => {
  return (
    <div className='flex min-h-screen flex-col'>
      <UserNavbar />
      <main className='flex-1 pt-[68px] md:pt-[84px] flex flex-col'>
        <Outlet />
      </main>
      <UserFooter />
    </div>
  );
};

export default UserLayout;
