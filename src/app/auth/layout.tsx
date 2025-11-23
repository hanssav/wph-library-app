import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className='container-x min-h-screen flex-center'>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
