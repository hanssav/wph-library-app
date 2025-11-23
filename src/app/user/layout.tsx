import { Outlet } from 'react-router-dom';
import { UserNavbar } from './components';

const UserLayout = () => {
  return (
    <div className='min-h-screen'>
      <UserNavbar />
      <Outlet />
    </div>
  );
};

export default UserLayout;
