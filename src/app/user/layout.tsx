import { Outlet } from 'react-router-dom';

const UserLayout = () => {
  return (
    <div className='flex min-h-screen items-center justify-center'>
      <Outlet />
    </div>
  );
};

export default UserLayout;
